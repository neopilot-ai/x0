export interface VercelSandboxConfig {
  image?: string
  runtime?: 'node24' | 'node22' | 'python3.13'
  workingDirectory?: string
  environment?: Record<string, string>
  memory?: string
  cpu?: string
}

export interface VercelSandboxInstance {
  id: string
  status: 'creating' | 'ready' | 'running' | 'stopped' | 'expired'
  url: string
  domain: string
  createdAt: Date
  expiresAt: Date
  filesystem: Map<string, string>
  env: Record<string, string>
}

export async function createSandbox(config?: VercelSandboxConfig): Promise<VercelSandboxInstance> {
  const response = await fetch('/api/sandbox', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config ?? {}),
  })
  const data = await response.json()
  return {
    id: data.id,
    status: 'ready',
    url: data.url,
    domain: data.domain,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    filesystem: new Map(),
    env: config?.environment ?? {},
  }
}

export async function connectToSandbox(sandboxId: string): Promise<VercelSandboxInstance> {
  const response = await fetch(`/api/sandbox/${sandboxId}`)
  const data = await response.json()
  return {
    id: data.id,
    status: data.status,
    url: data.url,
    domain: data.domain,
    createdAt: new Date(data.createdAt),
    expiresAt: new Date(data.expiresAt),
    filesystem: new Map(),
    env: data.env ?? {},
  }
}

export async function executeCommand(
  sandboxId: string,
  command: string,
): Promise<{ output: string; exitCode: number }> {
  const response = await fetch(`/api/sandbox/${sandboxId}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command }),
  })
  return await response.json()
}

export async function copyFiles(sandboxId: string, files: Record<string, string>): Promise<void> {
  await fetch(`/api/sandbox/${sandboxId}/files`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ files }),
  })
}

export async function stopSandbox(sandboxId: string): Promise<void> {
  await fetch(`/api/sandbox/${sandboxId}`, { method: 'DELETE' })
}

export async function getSandboxDomain(sandboxId: string): Promise<string> {
  const response = await fetch(`/api/sandbox/${sandboxId}/domain`)
  const data = await response.json()
  return data.domain
}

export async function getSandboxStatus(sandboxId: string): Promise<string> {
  const response = await fetch(`/api/sandbox/${sandboxId}/status`)
  const data = await response.json()
  return data.status
}

export async function extendSandbox(sandboxId: string): Promise<void> {
  await fetch(`/api/sandbox/${sandboxId}/extend`, { method: 'POST' })
}

export async function createSnapshot(sandboxId: string): Promise<string> {
  const response = await fetch(`/api/sandbox/${sandboxId}/snapshot`, { method: 'POST' })
  const data = await response.json()
  return data.snapshotId
}

export async function restoreSnapshot(snapshotId: string): Promise<void> {
  await fetch(`/api/sandbox/snapshot/${snapshotId}`, { method: 'POST' })
}

export async function getIsolationInfo(
  sandboxId: string,
): Promise<{ isolation: string; networkPolicy: string }> {
  const response = await fetch(`/api/sandbox/${sandboxId}/isolation`)
  return await response.json()
}

export async function getNetworkPolicy(sandboxId: string): Promise<string> {
  const response = await fetch(`/api/sandbox/${sandboxId}/network-policy`)
  const data = await response.json()
  return data.policy
}

export async function setNetworkPolicy(sandboxId: string, policy: string): Promise<void> {
  await fetch(`/api/sandbox/${sandboxId}/network-policy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ policy }),
  })
}
