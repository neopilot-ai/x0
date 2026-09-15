export type PermissionMode = 'ask' | 'auto' | 'full'

export interface PermissionRule {
  pattern: string
  type: 'allow' | 'deny' | 'ask'
  scope: 'user' | 'team'
  createdAt: Date
}

let currentMode: PermissionMode = 'ask'
let rules: PermissionRule[] = []

export function getPermissionMode(): PermissionMode {
  return currentMode
}

export async function setPermissionMode(mode: PermissionMode): Promise<void> {
  currentMode = mode
  await fetch('/api/sandbox/permissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode }),
  })
}

export async function addRule(rule: PermissionRule): Promise<void> {
  rules.push(rule)
  await fetch('/api/sandbox/rules', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rule),
  })
}

export async function removeRule(pattern: string): Promise<void> {
  rules = rules.filter(r => r.pattern !== pattern)
  await fetch(`/api/sandbox/rules?pattern=${encodeURIComponent(pattern)}`, { method: 'DELETE' })
}

export function getRules(): PermissionRule[] {
  return [...rules]
}

export async function evaluateCommand(command: string, mode?: PermissionMode): Promise<boolean> {
  const effectiveMode = mode ?? currentMode
  if (effectiveMode === 'full') return true
  if (effectiveMode === 'auto') {
    return evaluateAgainstBuiltinAllow(command)
  }
  return true
}

function evaluateAgainstBuiltinAllow(command: string): boolean {
  const denied = ['rm -rf', 'sudo', 'shutdown', 'reboot']
  if (denied.some(p => command.includes(p))) return false
  return true
}
