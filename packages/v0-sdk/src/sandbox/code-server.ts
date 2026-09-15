export interface V0SandboxConfig {
  chatId: string
  sandboxId?: string
  codeServerPort?: number
  workingDirectory?: string
}

export interface CodeServerSandboxConnection {
  chatId: string
  codeServerUrl: string
  isConnected: boolean
  files: Map<string, string>
}

export async function connectToSandbox(
  chatId: string,
): Promise<CodeServerSandboxConnection> {
  const codeServerUrl = `https://${chatId}.sandbox.vercel.app`
  return {
    chatId,
    codeServerUrl,
    isConnected: true,
    files: new Map(),
  }
}

export async function startCodeServer(connection: CodeServerSandboxConnection): Promise<void> {
  const response = await fetch(`${connection.codeServerUrl}/api/start`, { method: 'POST' })
  if (!response.ok) throw new Error('Failed to start code-server')
}

export async function stopCodeServer(connection: CodeServerSandboxConnection): Promise<void> {
  await fetch(`${connection.codeServerUrl}/api/stop`, { method: 'POST' })
  connection.isConnected = false
}

export async function getCodeServerUrl(connection: CodeServerSandboxConnection): Promise<string> {
  return connection.codeServerUrl
}

export function getIsolationInfo(): { isolation: string; networkPolicy: string } {
  return { isolation: 'per-chat', networkPolicy: 'restricted' }
}

export function getNetworkPolicy(): string {
  return 'restricted'
}

export function setNetworkPolicy(_policy: string): void {
  // no-op
}
