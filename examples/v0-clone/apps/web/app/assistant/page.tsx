'use client'

import * as React from 'react'
import Link from 'next/link'
import { MiniMarkdown } from '@/components/assistant/mini-markdown'
import { SparklesIcon as Sparkles } from '@/lib/icons'

type Source = {
  title: string
  slug: string
  section: string
  sourceUrl: string
  excerpt: string
  relevance: number
}

type Turn = {
  id: string
  role: 'user' | 'assistant'
  streaming?: boolean
  text: string
  sources?: Source[]
  mode?: 'llm' | 'index'
}

const SUGGESTIONS = [
  'How do I use an MCP server with v0?',
  'What environment variables can I set?',
  'How do I deploy a project with v0?',
  'What are the API rate limits?',
]

export default function AssistantPage() {
  const [question, setQuestion] = React.useState('')
  const [turns, setTurns] = React.useState<Turn[]>([])
  const [busy, setBusy] = React.useState(false)

  const ask = React.useCallback(
    async (prompt: string) => {
      const trimmed = prompt.trim()
      if (!trimmed) return
      const userTurn: Turn = { id: crypto.randomUUID(), role: 'user', text: trimmed }
      const answerTurn: Turn = {
        id: crypto.randomUUID(),
        role: 'assistant',
        streaming: true,
        text: '',
        sources: [],
      }
      setTurns((turns) => [...turns, userTurn, answerTurn])
      setQuestion('')
      setBusy(true)

      const patch = (partial: {
        text?: string
        sources?: Source[]
        mode?: 'llm' | 'index'
        streaming?: boolean
      }) =>
        setTurns((turns) =>
          turns.map((turn) => (turn.id === answerTurn.id ? { ...turn, ...partial } : turn)),
        )

      try {
        const response = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: trimmed }),
        })

        if (!response.ok || !response.body) {
          const error = (await response.json().catch(() => null)) as { error?: string } | null
          throw new Error(error?.error ?? `Request failed (${response.status})`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        let metaRead = false
        let text = ''

        for (;;) {
          const { done, value } = await reader.read()
          if (done) {
            text += decoder.decode()
            patch({ text, streaming: false })
            break
          }
          buffer += decoder.decode(value, { stream: true })
          let newline = buffer.indexOf('\n')
          while (newline !== -1) {
            const line = buffer.slice(0, newline)
            buffer = buffer.slice(newline + 1)
            if (!metaRead) {
              if (line.startsWith('{')) {
                try {
                  const meta = JSON.parse(line) as { sources?: Source[]; mode?: 'llm' | 'index' }
                  patch({ sources: meta.sources ?? [], mode: meta.mode })
                } catch {
                  text += line
                }
              } else {
                text += line
              }
              metaRead = true
            } else {
              text += `${line}\n`
              patch({ text })
            }
            newline = buffer.indexOf('\n')
          }
        }
      } catch (error) {
        patch({
          text: `\n> The assistant could not be reached: ${(error as Error).message}`,
          streaming: false,
        })
      } finally {
        setBusy(false)
      }
    },
    [],
  )

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    void ask(question)
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12">
      <p className="text-sm text-muted-foreground">Retrieval-augmented assistant over the corpus</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Ask the docs</h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        Answers are grounded in the indexed official sources. With an LLM provider configured the
        assistant synthesizes an answer over the retrieved sources; otherwise the application
        generates a labeled, extractive answer with citations.
      </p>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        {!turns.length && (
          <div className="grid gap-3 sm:grid-cols-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void ask(suggestion)}
                className="rounded-2xl border border-border bg-card p-4 text-left text-sm text-muted-foreground hover:border-foreground/25 hover:text-foreground"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {turns.map((turn) => (
          <div key={turn.id} className={`flex ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl border px-5 py-4 ${
                turn.role === 'user' ? 'border-foreground bg-foreground text-background' : 'border-border bg-card'
              }`}
            >
              {turn.role === 'user' ? (
                <p className="whitespace-pre-wrap text-sm leading-6">{turn.text}</p>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="size-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {turn.streaming
                        ? 'Retrieving and composing…'
                        : turn.mode === 'llm'
                          ? 'Synthesized from indexed sources · LLM'
                          : 'Generated by the application from indexed sources'}
                    </span>
                  </div>
                  <MiniMarkdown text={turn.text || '…'} />
                  {!turn.streaming && turn.sources && turn.sources.length > 0 && (
                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                        Sources ({turn.sources.length})
                      </p>
                      <div className="mt-3 flex flex-col gap-2">
                        {turn.sources.map((source) => (
                          <Link
                            key={source.slug}
                            href={`/docs/${source.slug}`}
                            className="rounded-lg border border-border px-3 py-2 text-sm font-medium hover:border-foreground/30"
                          >
                            {source.title}
                            <span className="ml-2 text-xs font-normal text-muted-foreground">{source.section}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-8 rounded-2xl border border-border bg-card p-3 focus-within:border-foreground/30">
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Ask a question about v0, MCP, deployments, the API..."
          className="min-h-20 w-full resize-none bg-transparent px-2 py-1 outline-none"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault()
              void ask(question)
            }
          }}
        />
        <div className="flex items-center justify-between">
          <span className="px-2 text-xs text-muted-foreground">
            {busy ? 'Streaming…' : 'Enter to send · grounded in indexed sources'}
          </span>
          <button
            type="submit"
            disabled={busy || !question.trim()}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition enabled:hover:opacity-90 disabled:opacity-40"
          >
            Ask
          </button>
        </div>
      </form>
    </main>
  )
}