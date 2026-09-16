import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import {
  buildContext,
  extractiveAnswer,
  hasLlmProvider,
  retrieve,
  sourcesFrom,
} from '@/lib/assistant'

export const runtime = 'nodejs'
export const maxDuration = 60

const encoder = new TextEncoder()

type StreamMode = 'llm' | 'index'

function streamBody(
  mode: StreamMode,
  meta: Record<string, unknown>,
  produceContent: () => AsyncIterable<string>,
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(
          encoder.encode(JSON.stringify({ id: meta.id, mode, sources: meta.sources }) + '\n'),
        )
        for await (const chunk of produceContent()) {
          controller.enqueue(encoder.encode(chunk))
        }
      } catch (error) {
        controller.enqueue(
          encoder.encode(
            `\n> Generation failed: ${error instanceof Error ? error.message : 'unknown error'}`,
          ),
        )
      } finally {
        controller.close()
      }
    },
  })
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { question?: unknown } | null
  const question = typeof body?.question === 'string' ? body.question.trim().slice(0, 2000) : ''

  if (!question) {
    return Response.json({ error: 'Ask a question about the v0 documentation.' }, { status: 400 })
  }

  const hits = retrieve(question, 6)
  const sources = sourcesFrom(hits)
  const useLlm = hasLlmProvider() && Boolean(process.env.OPENAI_API_KEY)
  const mode: StreamMode = useLlm ? 'llm' : 'index'
  const meta = {
    id: crypto.randomUUID(),
    mode,
    sources,
  }

  const content = async function* () {
    if (useLlm) {
      const prompt =
        `You are a helpful assistant that answers questions strictly from the provided v0 documentation ` +
        `sources. Answer the user question using only the sources. If the sources do not cover the ` +
        `question, say so. Cite sources inline as [1], [2] etc. End with a short "Sources" list.` +
        `\n\nSOURCES:\n${buildContext(hits)}\n\nQUESTION: ${question}`
      const result = streamText({
        model: openai('gpt-4o-mini'),
        prompt,
        temperature: 0.2,
      })
      for await (const text of result.textStream) {
        yield text
      }
      yield ''
      yield ''
      yield '---'
      yield ''
      yield 'Sources:'
      for (const hit of hits) {
        yield `${hits.indexOf(hit) + 1}. [${hit.doc.title}](${hit.doc.sourceUrl}) — ${hit.doc.section}`
      }
      return
    }
    for (const line of extractiveAnswer(question, hits)) {
      yield `${line}\n`
    }
  }

  return new Response(streamBody(mode, meta, content), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Assistant-Mode': mode,
    },
  })
}
