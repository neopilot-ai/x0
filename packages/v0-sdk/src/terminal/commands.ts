export async function executeBash(
  command: string,
  options?: { timeout?: number; permissionMode?: 'ask' | 'auto' | 'full' },
): Promise<{ output: string; exitCode: number | null }> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), options?.timeout ?? 30000)
    const response = await fetch('/api/sandbox/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command, mode: options?.permissionMode ?? 'ask' }),
      signal: controller.signal,
    })
    clearTimeout(timeout)
    const result = await response.json()
    return { output: result.output ?? '', exitCode: result.exitCode ?? 0 }
  } catch (error) {
    return { output: error instanceof Error ? error.message : String(error), exitCode: 1 }
  }
}

export async function getBashHistory(): Promise<
  Array<{ command: string; output: string; exitCode: number | null }>
> {
  try {
    const response = await fetch('/api/sandbox/commands')
    return await response.json()
  } catch {
    return []
  }
}

export async function cancelCommand(commandId: string): Promise<void> {
  await fetch(`/api/sandbox/commands/${commandId}`, { method: 'DELETE' })
}
