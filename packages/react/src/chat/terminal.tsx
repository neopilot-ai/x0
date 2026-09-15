import { useState, useCallback } from 'react'

export function V0Terminal({
  permissionMode = 'ask',
  onCommandExecute,
}: {
  permissionMode?: 'ask' | 'auto' | 'full'
  onCommandExecute?: (command: string, output: string) => void
}) {
  const [commands, setCommands] = useState<Array<{ id: string; command: string; output: string }>>([])

  const executeCommand = useCallback(async (command: string) => {
    try {
      const response = await fetch('/api/sandbox/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, mode: permissionMode }),
      })
      const result = await response.json()
      const output = result.output ?? ''
      setCommands(prev => [...prev, { id: `${Date.now()}`, command, output }])
      onCommandExecute?.(command, output)
    } catch (error) {
      setCommands(prev => [...prev, { id: `${Date.now()}`, command, output: error instanceof Error ? error.message : String(error) }])
    }
  }, [permissionMode, onCommandExecute])

  const clearHistory = useCallback(() => {
    setCommands([])
  }, [])

  return (
    <div className="v0-terminal">
      <div className="v0-terminal__header">
        <span>Terminal</span>
        <button onClick={clearHistory}>Clear</button>
      </div>
      <div className="v0-terminal__body">
        {commands.map(cmd => (
          <div key={cmd.id} className="v0-terminal__command">
            <div className="v0-terminal__command-input">{cmd.command}</div>
            <div className="v0-terminal__command-output">{cmd.output}</div>
          </div>
        ))}
      </div>
      <div className="v0-terminal__input">
        <input
          placeholder="Type a command..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              executeCommand(e.currentTarget.value)
              e.currentTarget.value = ''
            }
          }}
        />
      </div>
    </div>
  )
}

export function V0PermissionGuard({
  mode,
  children,
}: {
  mode: 'ask' | 'auto' | 'full'
  children: React.ReactNode
}) {
  if (mode === 'full') return <>{children}</>
  return <>{children}</>
}

export function V0CommandHistory({
  commands,
}: {
  commands: Array<{ command: string; output: string; exitCode: number | null }>
}) {
  return (
    <div className="v0-command-history">
      {commands.map((cmd, i) => (
        <div key={i} className="v0-command-history__entry">
          <span>{cmd.command}</span>
          <span>{cmd.exitCode ?? '...'}</span>
        </div>
      ))}
    </div>
  )
}
