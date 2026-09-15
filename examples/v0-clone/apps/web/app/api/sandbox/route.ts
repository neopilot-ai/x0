import { z } from 'zod'

const requestSchema = z.object({ action: z.enum(['status', 'start', 'stop', 'reset']).default('status') })

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return Response.json({ error: 'Invalid sandbox action.' }, { status: 400 })
  return Response.json({
    action: parsed.data.action,
    status: parsed.data.action === 'stop' ? 'stopped' : 'ready',
    sandboxId: 'public-demo-sandbox',
    isolation: 'workspace-local, read-only simulation',
    surfaces: ['editor', 'preview', 'terminal', 'logs'],
    capabilities: ['inspect files', 'run approved checks', 'preview changes'],
    restrictions: ['no credentials', 'no production access', 'no arbitrary writes'],
  })
}

export async function GET() {
  return Response.json({ status: 'ready', sandboxId: 'public-demo-sandbox', isolation: 'workspace-local, read-only simulation', surfaces: ['editor', 'preview', 'terminal', 'logs'] })
}
