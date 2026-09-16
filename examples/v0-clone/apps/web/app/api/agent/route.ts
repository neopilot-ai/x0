import { createUIMessageStreamResponse, toUIMessageStream, type UIMessage } from 'ai'
import { agentRequestSchema, createCoordinatorAgent } from '@/lib/agent-server'
import { extractiveAnswer, retrieve, sourcesFrom } from '@/lib/assistant'

export const maxDuration = 30

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: UIMessage[]
      prompt?: string
      roles?: string[]
      planOnly?: boolean
    }
    const parsed = agentRequestSchema.safeParse({
      prompt:
        body.prompt ??
        body.messages
          ?.at(-1)
          ?.parts?.filter((part) => part.type === 'text')
          .map((part) => part.text)
          .join(' ') ??
        '',
      roles: body.roles,
      planOnly: body.planOnly,
    })
    if (!parsed.success) return Response.json({ error: 'Invalid request.' }, { status: 400 })

    const prompt = `${parsed.data.planOnly ? 'Return a plan only. Do not imply that changes were applied.' : ''}\nRequested specialist roles: ${parsed.data.roles.join(', ')}.\n\n${parsed.data.prompt}`
    if (!process.env.AI_GATEWAY_API_KEY) {
      const hits = retrieve(parsed.data.prompt, 6)
      const fallback = extractiveAnswer(parsed.data.prompt, hits).join('\n')
      return Response.json({
        mode: 'indexed-fallback',
        sources: sourcesFrom(hits),
        text: `Indexed fallback (the AI Gateway is unavailable):\n\n${fallback}`,
      })
    }

    const agent = createCoordinatorAgent()
    const result = await agent.stream({ prompt })
    return createUIMessageStreamResponse({ stream: result.toUIMessageStream() })
  } catch {
    return Response.json({ error: 'The agent is temporarily unavailable.' }, { status: 503 })
  }
}
