'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import {
  ArrowRightIcon as ArrowUpRight,
  CodeIcon as BookOpen,
  ToolIcon as Boxes,
  SearchIcon as Command,
  ExternalIcon as ExternalLink,
  ToolIcon as GitBranch,
  SearchIcon as Search,
  SparklesIcon as Sparkles,
  TerminalIcon as Terminal,
  ToolIcon as Waypoints,
} from '@/lib/icons'
import { docs, sections, topics, searchDocs } from '@/lib/docs-data'

const surfaces = [
  {
    href: '/docs',
    label: 'Documentation',
    description: 'Browse the official v0 knowledge base.',
    icon: BookOpen,
  },
  {
    href: '/examples',
    label: 'Examples',
    description: 'Find patterns and reusable code.',
    icon: Terminal,
  },
  {
    href: '/api-reference',
    label: 'API reference',
    description: 'Explore documented APIs and references.',
    icon: Boxes,
  },
  {
    href: '/integrations',
    label: 'Integrations',
    description: 'Connect the tools your app needs.',
    icon: GitBranch,
  },
  {
    href: '/graph',
    label: 'Knowledge graph',
    description: 'Map concepts, topics, and source pages.',
    icon: Waypoints,
  },
  {
    href: '/assistant',
    label: 'Ask the docs',
    description: 'Get cited answers from indexed sources.',
    icon: Sparkles,
  },
]

export function DocsDashboard() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchDocs(query), [query])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-foreground text-background">
              v0
            </span>
            <span>Docs intelligence</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            <Link href="/docs" className="hover:text-foreground">
              Docs
            </Link>
            <Link href="/topics" className="hover:text-foreground">
              Topics
            </Link>
            <Link href="/admin" className="hover:text-foreground">
              Coverage
            </Link>
            <Link
              href="/chats/new"
              className="rounded-full border border-border px-3 py-1.5 text-foreground hover:bg-accent"
            >
              Open workspace
            </Link>
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Indexed from official v0
            documentation
          </div>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
            Build with clarity.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            A source-attributed workspace for understanding v0, from your first prompt to production
            integrations.
          </p>
        </div>
        <div className="relative mt-10 max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            aria-label="Search documentation"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documentation, topics, APIs..."
            className="h-14 w-full rounded-2xl border border-border bg-card pl-12 pr-24 text-base shadow-2xl shadow-black/5 outline-none ring-offset-background transition focus:border-foreground/30 focus:ring-2 focus:ring-ring"
          />
          <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground sm:flex">
            <Command /> K
          </span>
        </div>
        {query && (
          <div className="mt-3 max-w-2xl rounded-2xl border border-border bg-card p-2 shadow-xl">
            {results.length ? (
              results.slice(0, 5).map((doc) => (
                <Link
                  key={doc.id}
                  href={`/docs/${doc.slug}`}
                  className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-accent"
                >
                  <span>
                    <span className="block text-sm font-medium">{doc.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {doc.section} · {doc.description}
                    </span>
                  </span>
                  <ArrowUpRight className="text-muted-foreground" />
                </Link>
              ))
            ) : (
              <p className="px-3 py-4 text-sm text-muted-foreground">
                No matching indexed documentation.
              </p>
            )}
          </div>
        )}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {surfaces.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-border bg-card/60 p-5 transition hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-card"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="grid size-9 place-items-center rounded-lg bg-muted">
                  <Icon />
                </span>
                <ArrowUpRight className="text-muted-foreground transition group-hover:text-foreground" />
              </div>
              <h2 className="font-medium">{label}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-6 pb-20 lg:grid-cols-[1.3fr_.7fr]">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Coverage overview</p>
              <p className="mt-2 text-3xl font-semibold">
                {docs.length}{' '}
                <span className="text-base font-normal text-muted-foreground">indexed pages</span>
              </p>
            </div>
            <Link
              href="/admin/coverage"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              View report <ExternalLink />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {sections.map((section) => (
              <div key={section} className="rounded-xl bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground">{section}</p>
                <p className="mt-2 text-xl font-medium">
                  {docs.filter((doc) => doc.section === section).length}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Popular topics</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {topics.slice(0, 12).map((topic) => (
              <Link
                key={topic}
                href={`/topics/${topic}`}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground hover:border-foreground/30 hover:text-foreground"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
