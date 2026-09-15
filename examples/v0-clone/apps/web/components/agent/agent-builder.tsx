'use client'

import Link from 'next/link'
import { useState } from 'react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
const agentRoles = [
  { id: 'researcher', name: 'Docs researcher', description: 'Retrieves official v0 documentation and citations.' },
  { id: 'planner', name: 'Code planner', description: 'Turns requirements into a safe implementation plan.' },
  { id: 'designer', name: 'Design reviewer', description: 'Reviews UX, accessibility, and responsive behavior.' },
  { id: 'reviewer', name: 'Test reviewer', description: 'Suggests validation and release checks.' },
] as const
import { ArrowLeftIcon, CheckIcon, CodeIcon, SparklesIcon, ToolIcon } from '@/lib/icons'

const transport = new DefaultChatTransport({ api: '/api/agent' })

export function AgentBuilder() {
  const [input, setInput] = useState('')
  const [planOnly, setPlanOnly] = useState(true)
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['researcher', 'planner', 'designer', 'reviewer'])
  const { messages, sendMessage, status, stop, error, regenerate } = useChat({ transport })
  const [fallbackText, setFallbackText] = useState('')

  const toggleRole = (role: string) => setSelectedRoles((current) => current.includes(role) ? current.filter((item) => item !== role) : [...current, role])
  const busy = status === 'submitted' || status === 'streaming'

  const runAgent = async () => {
    if (!input.trim()) return
    setFallbackText('')
    try {
      const response = await fetch('/api/agent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: input, roles: selectedRoles, planOnly }) })
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json() as { text?: string; error?: string }
        if (data.text) setFallbackText(data.text)
        else throw new Error(data.error ?? 'The agent is unavailable.')
        setInput('')
        return
      }
      sendMessage({ text: input }, { body: { roles: selectedRoles, planOnly } })
      setInput('')
    } catch {
      setFallbackText('The agent could not complete this run. Try again or narrow the request.')
    }
  }

  const panel = 'rounded-xl border border-border bg-card'
  const panelHeader = 'border-b border-border px-4 py-3'
  const panelContent = 'p-4'

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-4 py-3 md:px-8">
        <Link className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" href="/">
          <ArrowLeftIcon /> Back to workspace
        </Link>
        <div className="flex items-center gap-2"><Badge variant="outline">Public demo</Badge><Badge variant="secondary">Read-only safety</Badge></div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[260px_minmax(0,1fr)_260px] md:p-8">
        <aside className="flex flex-col gap-4">
          <div><p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Agentic workspace</p><h1 className="mt-2 text-2xl font-semibold tracking-tight">Agent builder</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Coordinate specialist agents for research, planning, design review, and release confidence.</p></div>
          <div className={panel}><div className={panelHeader}><p className="text-sm font-medium">Run mode</p></div><div className={`${panelContent} flex flex-col gap-2`}><Button onClick={() => setPlanOnly(true)} variant={planOnly ? 'secondary' : 'ghost'}><CodeIcon data-icon="inline-start" />Plan only</Button><Button onClick={() => setPlanOnly(false)} variant={!planOnly ? 'secondary' : 'ghost'} disabled><ToolIcon data-icon="inline-start" />Apply changes <Badge variant="outline">Soon</Badge></Button></div></div>
        </aside>
        <section className="flex min-h-[70vh] flex-col rounded-2xl border border-border bg-card/30">
          <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="font-medium">Coordinator run</p><p className="text-xs text-muted-foreground">{busy ? 'Agents are collaborating…' : 'Ready for a request'}</p></div>{busy && <Button onClick={() => stop()} variant="outline">Stop</Button>}</div>
          <div className="flex flex-1 flex-col gap-4 overflow-auto p-5">
            {!messages.length && <div className="m-auto max-w-md text-center"><SparklesIcon className="mx-auto mb-4 size-8 text-muted-foreground" /><h2 className="text-xl font-medium">What should the agents plan?</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Ask for a docs-grounded implementation plan. The coordinator will use read-only tools and cite sources.</p></div>}
            {messages.map((message: UIMessage) => <div key={message.id} className={message.role === 'user' ? 'ml-auto max-w-[85%] rounded-2xl bg-foreground px-4 py-3 text-background' : 'max-w-[92%] rounded-2xl border border-border bg-background px-4 py-3'}>{message.parts.map((part, index) => part.type === 'text' ? <p className="whitespace-pre-wrap text-sm leading-6" key={index}>{part.text}</p> : <div className="mt-2 rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground" key={index}>Tool event: {part.type}</div>)}</div>)}
            {fallbackText && <div className="max-w-[92%] rounded-2xl border border-border bg-background px-4 py-3"><p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Indexed fallback</p><p className="whitespace-pre-wrap text-sm leading-6">{fallbackText}</p></div>}
            {error && <div className={`${panel} flex items-center justify-between gap-3 p-4 text-sm`}><span>The agent could not complete this run.</span><Button onClick={() => regenerate()} variant="outline">Retry</Button></div>}
          </div>
          <form className="border-t border-border p-4" onSubmit={(event) => { event.preventDefault(); void runAgent() }}><Textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); event.currentTarget.form?.requestSubmit() } }} placeholder="Describe the product change, investigation, or plan…" disabled={busy} /><div className="mt-3 flex items-center justify-between gap-3"><span className="text-xs text-muted-foreground">{planOnly ? 'Plan-only mode' : 'Apply mode unavailable'} · Shift+Enter for a new line</span><Button type="submit" disabled={busy || !input.trim()}>Run agents</Button></div></form>
        </section>
        <aside className="flex flex-col gap-4"><div className={panel}><div className={panelHeader}><p className="text-sm font-medium">Specialists</p></div><div className={`${panelContent} flex flex-col gap-2`}>{agentRoles.map((role) => <button key={role.id} type="button" onClick={() => toggleRole(role.id)} className="flex items-start gap-3 rounded-lg border border-border p-3 text-left hover:border-foreground/30"><span className={`mt-0.5 flex size-4 items-center justify-center rounded border ${selectedRoles.includes(role.id) ? 'border-foreground bg-foreground text-background' : 'border-border'}`}>{selectedRoles.includes(role.id) && <CheckIcon />}</span><span><span className="block text-sm font-medium">{role.name}</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">{role.description}</span></span></button>)}</div></div><div className={panel}><div className={panelHeader}><p className="text-sm font-medium">Safety boundary</p></div><div className={`${panelContent} text-xs leading-5 text-muted-foreground`}>Agents can retrieve indexed docs, inspect public metadata, and propose plans. They cannot write files, run arbitrary commands, access credentials, or deploy.</div></div></aside>
      </div>
    </main>
  )
}
