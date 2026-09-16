import type { PermissionMode, PermissionRule } from './types'

const BUILTIN_ALLOW: string[] = [
  'npm install',
  'npm run',
  'npx',
  'pnpm install',
  'pnpm run',
  'yarn install',
  'yarn run',
  'bun install',
  'bun run',
  'git status',
  'git log',
  'git diff',
  'git branch',
  'git checkout',
  'ls',
  'cat',
  'echo',
  'mkdir',
  'cp',
  'mv',
  'head',
  'tail',
  'find',
  'grep',
  'curl',
  'wget',
]

const BUILTIN_DENY: string[] = ['rm -rf', 'sudo', 'shutdown', 'reboot', 'format', 'mkfs']

const DEFAULT_RULES: PermissionRule[] = [
  ...BUILTIN_ALLOW.map((pattern) => ({
    pattern,
    type: 'allow' as const,
    scope: 'user' as const,
    createdAt: new Date(),
  })),
  ...BUILTIN_DENY.map((pattern) => ({
    pattern,
    type: 'deny' as const,
    scope: 'user' as const,
    createdAt: new Date(),
  })),
]

export async function executeCommand(
  command: string,
  options?: { timeout?: number; permissionMode?: PermissionMode },
): Promise<{ output: string; exitCode: number | null }> {
  const permissionMode = options?.permissionMode ?? 'ask'
  const evaluation = evaluateCommand(command, permissionMode)
  if (!evaluation) {
    return { output: `Command denied: ${command}`, exitCode: 1 }
  }
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), options?.timeout ?? 30000)
    const response = await fetch(`/api/sandbox/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command }),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    const result = await response.json()
    return { output: result.output ?? '', exitCode: result.exitCode ?? 0 }
  } catch (error) {
    return { output: error instanceof Error ? error.message : String(error), exitCode: 1 }
  }
}

export async function getCommandHistory(): Promise<
  Array<{ command: string; output: string; exitCode: number | null }>
> {
  try {
    const response = await fetch('/api/sandbox/commands')
    return await response.json()
  } catch {
    return []
  }
}

export async function setPermissionMode(mode: PermissionMode): Promise<void> {
  await fetch('/api/sandbox/permissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode }),
  })
}

export async function addRule(rule: PermissionRule): Promise<void> {
  await fetch('/api/sandbox/rules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rule),
  })
}

export async function removeRule(pattern: string): Promise<void> {
  await fetch(`/api/sandbox/rules?pattern=${encodeURIComponent(pattern)}`, { method: 'DELETE' })
}

export async function evaluateCommand(command: string, mode: PermissionMode): Promise<boolean> {
  if (mode === 'full') return true
  for (const denyPattern of BUILTIN_DENY) {
    if (command.includes(denyPattern)) return false
  }
  if (mode === 'auto') {
    return BUILTIN_ALLOW.some((pattern) => command.includes(pattern))
  }
  return true
}

export function getBuiltinAllow(): string[] {
  return [...BUILTIN_ALLOW]
}
export function getBuiltinDeny(): string[] {
  return [...BUILTIN_DENY]
}
export function getDefaultRules(): PermissionRule[] {
  return [...DEFAULT_RULES]
}
