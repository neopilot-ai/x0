import { z } from 'zod'

const schema = z.object({
  command: z.string().trim().min(1).max(240),
  mode: z.enum(['ask', 'auto', 'full']).default('ask'),
})

const allowed = /^(pwd|ls(?:\s+-[alh]+)?|find\s+[^;&|]+|git\s+(status|diff|log)(?:\s+[^;&|]+)?|bun\s+(run\s+)?(test|typecheck|lint|format)(?:\s+[^;&|]+)?|npm\s+(test|run\s+(lint|typecheck|build))(?:\s+[^;&|]+)?)$/i
const denied = /(rm\s+-rf|sudo|curl|wget|chmod|chown|\.env|secret|token|deploy|git\s+(push|reset|checkout)|>|\||;|&&)/i

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => ({})))
  if (!parsed.success) return Response.json({ error: 'Enter a command under 240 characters.' }, { status: 400 })
  const { command, mode } = parsed.data
  const decision = denied.test(command) ? 'denied' : !allowed.test(command) ? 'approval-required' : mode === 'ask' ? 'approval-required' : 'allowed'
  if (decision !== 'allowed') return Response.json({ decision, command, mode, output: decision === 'denied' ? 'Command blocked by the public demo safety policy.' : 'This command requires approval in the current permission mode.' }, { status: decision === 'denied' ? 403 : 202 })
  return Response.json({ decision, command, mode, simulated: true, output: `$ ${command}\n\n[public demo] Command approved. Execution is simulated and cannot access the host, secrets, or production services.` })
}
