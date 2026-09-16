import Link from 'next/link'
import { coverageStats, generatedAt } from '@/lib/docs-data'

export default function AboutPage() {
  const stats = coverageStats()
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <p className="text-sm text-muted-foreground">About this application</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">About</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">
        A documentation-driven workspace that indexes the official v0 documentation and surfaces it
        with search, a knowledge graph, and a cited assistant. This project is built on the v0 SDK
        and is independent of v0. app.
      </p>

      <section className="mt-10 space-y-5 text-[15px] leading-7">
        <h2 className="text-lg font-semibold">How the knowledge base works</h2>
        <p>
          The corpus is ingested from{' '}
          <Link className="underline underline-offset-4" href="https://v0.app/docs">
            v0.app/docs
          </Link>{' '}
          — including its sitemap, LLMs.txt corpus, and per-page Markdown — via a local ingestion
          script under{' '}
          <code className="rounded bg-muted px-1.5 py-0.5">scripts/ingest-docs.mjs</code>. It is
          committed to the app as static data so the deployed site needs no external calls to render
          any page.
        </p>
        <p>
          Currently the index contains <strong>{stats.total} documents</strong> across{' '}
          {Object.keys(stats.bySection).length} sections, with {stats.withCode} pages carrying code
          and {stats.topicsCount} detected topics. Every record keeps its official{' '}
          <code className="rounded bg-muted px-1.5 py-0.5">sourceUrl</code>.
        </p>

        <h2 className="text-lg font-semibold">App-generated vs official</h2>
        <p>
          User-facing features that derive from the indexed sources — section grouping, search
          relevance, the graph, dotted-line answers, coverage statistics — are labeled as
          application-generated throughout. The authoritative text is always attributed and linked
          back to the official docs.
        </p>

        <h2 className="text-lg font-semibold">Capabilities</h2>
        <ul className="list-disc space-y-1.5 pl-6 marker:text-muted-foreground">
          <li>
            <Link className="underline underline-offset-4" href="/docs">
              Documentation
            </Link>{' '}
            — browsable corpus with per-page content and provenance.
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/search">
              Search
            </Link>{' '}
            — server-side ranked search over stored body text.
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/graph">
              Knowledge graph
            </Link>{' '}
            — docs connected by recorded related/prerequisite links.
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/assistant">
              Ask the docs
            </Link>{' '}
            — retrieval-augmented assistant with citations.
          </li>
          <li>
            <Link className="underline underline-offset-4" href="/admin">
              Admin
            </Link>{' '}
            — ingestion tool and coverage report.
          </li>
        </ul>

        <h2 className="text-lg font-semibold">Surfaces</h2>
        <p>
          <Link className="underline underline-offset-4" href="/">
            The dashboard
          </Link>{' '}
          ties together the surfaces and navigation. Press{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">⌘K</kbd> or{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs">Ctrl K</kbd>{' '}
          anywhere to jump across the corpus.
        </p>
      </section>

      <p className="mt-12 text-xs text-muted-foreground">
        Manifest generated at {generatedAt ? new Date(generatedAt).toUTCString() : '—'} · Site
        operates on node runtime with the indexed data shipped at build time.
      </p>
    </main>
  )
}
