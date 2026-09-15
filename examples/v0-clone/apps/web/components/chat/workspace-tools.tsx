'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  AgentIcon,
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  PlusIcon,
  SettingsIcon,
  SparklesIcon,
  ToolIcon,
} from '@/lib/icons'
import { cn } from '@/lib/utils'

type ToolPanel = 'terminal' | 'design' | 'versions' | 'integrations' | 'agents' | 'systems'

const integrations = [
  'Neon database',
  'Supabase Auth',
  'Vercel Blob',
  'GitHub repository',
  'Upstash Redis',
  'MCP servers',
]

export function WorkspaceTools({
  activeTool,
  onToolChange,
}: {
  activeTool: ToolPanel | null
  onToolChange: (tool: ToolPanel | null) => void
}) {
  const [terminalInput, setTerminalInput] = useState('')
  const [terminalLines, setTerminalLines] = useState([
    '$ pnpm dev',
    '  Ready on http://localhost:3000',
    '  Mock terminal — commands are not executed',
  ])
  const [designApplied, setDesignApplied] = useState(false)
  const [connected, setConnected] = useState<string[]>([])
  const [version, setVersion] = useState(3)

  if (!activeTool) return null

  return (
    <aside className="flex h-full w-full min-w-0 flex-col border-l border-border bg-card xl:w-[360px]">
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-border px-3">
        <div className="flex items-center gap-2 text-sm font-medium">
          <SparklesIcon className="size-4" />
          {toolTitle(activeTool)}
        </div>
        <Button
          aria-label="Close tool panel"
          className="size-7"
          onClick={() => onToolChange(null)}
          size="icon-sm"
          variant="ghost"
        >
          ×
        </Button>
      </div>
      {activeTool === 'terminal' && (
        <TerminalPanel
          input={terminalInput}
          setInput={setTerminalInput}
          lines={terminalLines}
          setLines={setTerminalLines}
        />
      )}
      {activeTool === 'design' && (
        <DesignPanel
          applied={designApplied}
          onApply={() => {
            setDesignApplied(true)
            setVersion((v) => v + 1)
          }}
        />
      )}
      {activeTool === 'versions' && (
        <VersionsPanel version={version} onRestore={() => setVersion((v) => v + 1)} />
      )}
      {activeTool === 'integrations' && (
        <IntegrationsPanel connected={connected} setConnected={setConnected} />
      )}
      {activeTool === 'agents' && <AgentsPanel />}
      {activeTool === 'systems' && <SystemsPanel />}
    </aside>
  )
}

function TerminalPanel({
  input,
  setInput,
  lines,
  setLines,
}: {
  input: string
  setInput: (v: string) => void
  lines: string[]
  setLines: (v: string[]) => void
}) {
  const run = () => {
    if (!input.trim()) return
    setLines([
      ...lines,
      `$ ${input}`,
      input === 'git status'
        ? '  On branch feature/landing-page · clean'
        : '  Mock command completed successfully',
    ])
    setInput('')
  }
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-2 border-b border-border p-2">
        <Badge variant="outline">Ask</Badge>
        <span className="text-xs text-muted-foreground">Permission mode</span>
        <Button className="ml-auto" size="icon-sm" variant="ghost">
          <SettingsIcon />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-background p-3 font-mono text-xs leading-6 text-muted-foreground">
        {lines.map((line, i) => (
          <div key={`${line}-${i}`} className={cn(line.startsWith('$') && 'text-foreground')}>
            {line}
          </div>
        ))}
      </div>
      <div className="border-t border-border p-2">
        <div className="flex gap-2">
          <Input
            aria-label="Terminal command"
            className="font-mono text-xs"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') run()
            }}
            placeholder="Type a command..."
            value={input}
          />
          <Button aria-label="Run command" onClick={run} size="icon-sm">
            <ChevronDownIcon className="rotate-[-90deg]" />
          </Button>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Rules protect your project from destructive commands.
        </p>
      </div>
    </div>
  )
}

function DesignPanel({ applied, onApply }: { applied: boolean; onApply: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-auto p-3">
      <div className="rounded-lg border border-border bg-background p-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium">Selected element</span>
          <Badge variant="secondary">hero</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input defaultValue="48px" aria-label="Font size" />
          <Input defaultValue="#f5f5f5" aria-label="Text color" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium">Instruction</span>
        <Textarea defaultValue="Make the hero feel more focused and editorial." />
        <Button onClick={onApply}>
          {applied ? <CheckIcon /> : <SparklesIcon />}
          {applied ? 'Applied as version' : 'Apply changes'}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline">Undo</Button>
        <Button variant="outline">Reset</Button>
      </div>
    </div>
  )
}

function VersionsPanel({ version, onRestore }: { version: number; onRestore: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-auto p-3">
      <div className="rounded-lg border border-primary/40 bg-primary/5 p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Version {version}</span>
          <Badge>Current</Badge>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Latest changes · just now</p>
      </div>
      {[version - 1, version - 2]
        .filter((v) => v > 0)
        .map((v) => (
          <div className="rounded-lg border border-border p-3" key={v}>
            <div className="flex items-center justify-between">
              <span className="text-sm">Version {v}</span>
              <Button onClick={onRestore} size="sm" variant="outline">
                Restore as new
              </Button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Saved from chat · 12 min ago</p>
          </div>
        ))}
      <Separator />
      <Button className="justify-start" variant="ghost">
        <CopyIcon />
        Compare versions
      </Button>
    </div>
  )
}

function IntegrationsPanel({
  connected,
  setConnected,
}: {
  connected: string[]
  setConnected: (v: string[]) => void
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-auto p-3">
      <p className="text-xs text-muted-foreground">
        Mocked project connections. Credentials are never stored.
      </p>
      {integrations.map((name) => {
        const isConnected = connected.includes(name)
        return (
          <div className="flex items-center gap-3 rounded-lg border border-border p-3" key={name}>
            <div className="flex size-8 items-center justify-center rounded-md bg-muted">
              <ToolIcon />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">
                {isConnected ? 'Connected' : 'Not configured'}
              </p>
            </div>
            <Button
              onClick={() =>
                setConnected(
                  isConnected ? connected.filter((item) => item !== name) : [...connected, name],
                )
              }
              size="sm"
              variant={isConnected ? 'secondary' : 'outline'}
            >
              {isConnected ? 'Configure' : 'Connect'}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

function AgentsPanel() {
  return (
    <div className="flex flex-1 flex-col gap-3 p-3">
      <div className="rounded-lg border border-border p-3">
        <div className="flex items-center gap-3">
          <AgentIcon />
          <div>
            <p className="text-sm font-medium">Claude Code</p>
            <p className="text-xs text-muted-foreground">Pre-installed agent · Gateway routed</p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Badge variant="secondary">Available</Badge>
          <Badge variant="outline">Ask permission</Badge>
        </div>
      </div>
      <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
        Agents can inspect your workspace. Review permissions before granting terminal access.
      </div>
      <Button variant="outline">Manage agent access</Button>
    </div>
  )
}

function SystemsPanel() {
  return (
    <div className="flex flex-1 flex-col gap-3 p-3">
      <div className="rounded-lg border border-border p-3">
        <p className="text-sm font-medium">Design system</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Attach tokens and components to this chat.
        </p>
      </div>
      <Input placeholder="Search components and tokens" />
      <Button variant="outline">
        <PlusIcon />
        Attach design system
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="secondary">Appearance</Button>
        <Button variant="outline">Revisions</Button>
      </div>
    </div>
  )
}

function toolTitle(tool: ToolPanel) {
  return {
    terminal: 'Terminal',
    design: 'Design mode',
    versions: 'Versions',
    integrations: 'Project settings',
    agents: 'Pre-installed agents',
    systems: 'Design systems',
  }[tool]
}

export type { ToolPanel }
