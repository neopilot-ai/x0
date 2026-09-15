'use client'

import * as React from 'react'

type CrawlResult = {
  ok: boolean
  error?: string
  doc?: {
    id: string
    slug: string
    title: string
    section: string
    type: string
    description: string
    headings: string[]
    excerpt: string
    snippets: { language: string; code: string }[]
    contentLength: number
    sourceUrl: string
  }
  bytes?: number
  fetchedAt?: string
}

export function CrawlTool() {
  const [url, setUrl] = React.useState('https://v0.app/docs/quickstart')
  const [result, setResult] = React.useState<CrawlResult | null>(null)
  const [busy, setBusy] = React.useState(false)

  const run = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!url.trim() || busy) return
    setBusy(true)
    setResult(null)
    try {
      const response = await fetch('/api/admin/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      setResult(await response.json())
    } catch (error) {
      setResult({ ok: false, error: (error as Error).message })
    } finally {
      setBusy(false)
    }
  }

  const download = () => {
    if (!result?.doc) return
    const blob = new Blob([JSON.stringify(result.doc, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${result.doc.id}.json`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-medium">Ingest a single page</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Fetches and normalizes one official v0.app/docs page with the same pipeline the app uses.
        Restricted to https://v0.app/docs/ URLs with a 15s timeout and 1.5 MB cap.
      </p>
      <form onSubmit={run} className="mt-4 flex gap-2">
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://v0.app/docs/..."
          className="h-11 flex-1 rounded-xl border border-border bg-background px-3 pr-4 text-sm outline-none focus:border-foreground/30"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-xl bg-foreground px-4 text-sm font-medium text-background disabled:opacity-40"
        >
          {busy ? 'Fetching…' : 'Fetch'}
        </button>
      </form>

      {result && (
        <div className="mt-5 space-y-4">
          {!result.ok && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {result.error}
            </p>
          )}
          {result.ok && result.doc && (
            <>
              <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm">
                <p className="font-medium">{result.doc.title}</p>
                <p className="mt-1 text-muted-foreground">{result.doc.slug}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {result.doc.section} · {result.doc.type} · {result.doc.contentLength} chars ·{' '}
                  {result.doc.snippets.length} snippets · {result.doc.headings.length} headings ·{' '}
                  {result.bytes} bytes
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={download}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted"
                >
                  Download normalized JSON
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted"
                >
                  Clear
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}