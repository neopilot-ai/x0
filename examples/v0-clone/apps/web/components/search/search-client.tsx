'use client'

import * as React from 'react'
import Link from 'next/link'
import { SearchIcon } from '@/lib/icons'

type Hit = {
  id: string
  slug: string
  title: string
  section: string
  category: string
  description: string
  snippet?: string
  score: number
  reasons: string[]
}

const EMPTY: { hits: Hit[]; total: number } = { hits: [], total: 0 }

export function SearchClient({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = React.useState(initialQuery ?? '')
  const [data, setData] = React.useState<{ hits: Hit[]; total: number }>(EMPTY)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const term = query.trim()
    if (!term) {
      setData(EMPTY)
      setLoading(false)
      return
    }
    setLoading(true)
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/docs/search?q=${encodeURIComponent(term)}&limit=20`, {
          signal: controller.signal,
        })
        if (response.ok) setData(await response.json())
      } catch {
        // aborted or offline; keep previous results
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }, 250)
    return () => {
      controller.abort()
      clearTimeout(timer)
    }
  }, [query])

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Keyword search over the indexed corpus</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Search</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Results are computed by the server over the full stored body text, with excerpts generated
        around matched terms.
      </p>
      <form className="relative mt-8">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search docs..."
          autoFocus
          className="h-13 w-full rounded-2xl border border-border bg-card py-4 pl-12 pr-4 outline-none focus:border-foreground/30 focus:ring-2 focus:ring-ring"
        />
      </form>
      <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <span>{loading ? 'Searching…' : query.trim() ? `${data.total} result${data.total === 1 ? '' : 's'}` : 'Type a query to begin.'}</span>
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {query.trim() && data.hits.map((hit) => (
          <Link
            key={hit.id}
            href={`/docs/${hit.slug}`}
            className="rounded-xl border border-border p-5 transition hover:bg-card"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-medium">{hit.title}</h2>
              <span className="text-xs text-muted-foreground">
                {hit.section} · {hit.category}
              </span>
            </div>
            {hit.snippet && (
              <p className="mt-3 rounded-lg bg-muted/40 px-3 py-2 text-sm leading-6 text-muted-foreground">
                {hit.snippet}
              </p>
            )}
            <p className="mt-2 line-clamp-1 text-sm text-muted-foreground">{hit.description}</p>
          </Link>
        ))}
        {query.trim() && !loading && !data.hits.length && (
          <p className="rounded-xl border border-border p-5 text-sm text-muted-foreground">
            No indexed documentation matched “{query}”.
          </p>
        )}
      </div>
    </main>
  )
}