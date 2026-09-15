const AGENT_PERMISSIONS_KEY = 'v0-agent-permissions'
const AGENT_RULES_KEY = 'v0-agent-rules'

export interface AgentPermissions {
  mode: 'ask' | 'auto' | 'full'
  rules: Array<{ pattern: string; type: string }>
}

export function getAgentPermissions(): AgentPermissions {
  try {
    const stored = localStorage.getItem(AGENT_PERMISSIONS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return { mode: 'ask', rules: [] }
}

export function setAgentPermissions(permissions: AgentPermissions): void {
  localStorage.setItem(AGENT_PERMISSIONS_KEY, JSON.stringify(permissions))
}

export function resetToDefault(): void {
  localStorage.removeItem(AGENT_PERMISSIONS_KEY)
  localStorage.removeItem(AGENT_RULES_KEY)
}

export async function saveAgentPermissions(permissions: AgentPermissions): Promise<void> {
  await fetch('/api/sandbox/permissions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(permissions),
  })
  setAgentPermissions(permissions)
}

export async function loadAgentPermissions(): Promise<AgentPermissions> {
  try {
    const response = await fetch('/api/sandbox/permissions')
    const data = await response.json()
    setAgentPermissions(data)
    return data
  } catch {
    return getAgentPermissions()
  }
}
