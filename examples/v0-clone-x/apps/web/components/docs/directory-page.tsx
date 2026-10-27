import Link from 'next/link'
import { docs, searchDocs } from '@/lib/docs-data'

type DirectoryKind =
  | 'topics'
  | 'examples'
  | 'api-reference'
  | 'integrations'
  | 'tutorials'
  | 'troubleshooting'

function filterFor(kind: DirectoryKind) {
  if (kind === 'api-reference') {
    return docs.filter((doc) => doc.section === 'API Reference')
  }
  if (kind === 'integrations') {
    return docs.filter((doc) => doc.section === 'Integrations')
  }
  if (kind === 'examples') {
    return docs.filter((doc) => doc.snippets.length > 0)
  }
  if (kind === 'tutorials') {
    return docs.filter(
      (doc) =>
        ['Guides', 'Getting Started', 'Overview'].includes(doc.section) &&
        !['reference', 'integration'].includes(doc.type),
    )
  }
  if (kind === 'troubleshooting') {
    return docs.filter(
      (doc) =>
        doc.section === 'FAQs' ||
        doc.category === 'FAQs' ||
        [...doc.headings, doc.description].some((value) =>
          /troubleshoot|common issues|debug|error|fix|\bfaq\b/i.test(value),
        ),
    )
  }
  return docs
}

const detailHref: Record<DirectoryKind, (slug: string) => string> = {
  topics: (slug) => `/topics/${slug}`,
  examples: (slug) => `/examples/${slug}`,
  'api-reference': (slug) => `/api-reference/${slug}`,
  integrations: (slug) => `/integrations/${slug}`,
  tutorials: (slug) => `/tutorials/${slug}`,
  troubleshooting: (slug) => `/troubleshooting/${slug}`,
}

type Item = {
  href: string
  title: string
  eyebrow?: string
  description: string
  codeLine?: string
}

export function DirectoryPage({
  kind,
  title,
  description,
}: {
  kind: DirectoryKind
  title: string
  description: string
}) {
  const items: Item[] =
    kind === 'topics'
      ? [...new Set(docs.flatMap((doc) => doc.topics))].map((topic) => ({
          href: `/topics/${topic}`,
          title: topic,
          description: `Explore documentation connected to ${topic}.`,
        }))
      : filterFor(kind).map((doc) => ({
          href: detailHref[kind](doc.slug),
          title: doc.title,
          eyebrow: kind === 'api-reference' ? doc.category.replace('API · ', '') : doc.section,
          description: doc.description,
          codeLine: kind === 'examples' ? (doc.snippets[0]?.code.split('\n')[0] ?? '') : undefined,
        }))

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <p className="text-xs text-muted-foreground">
        Application-generated index over the official v0 documentation corpus
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{description}</p>
      {kind !== 'topics' && (
        <p className="mt-3 text-sm text-muted-foreground">
          {items.length} indexed pages from the corpus shown here.
        </p>
      )}
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 hover:border-foreground/30"
          >
            {item.eyebrow && (
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {item.eyebrow}
              </span>
            )}
            <h2 className="mt-1.5 font-medium group-hover:underline">{item.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
            {item.codeLine && (
              <p className="mt-3 truncate font-mono text-xs text-zinc-500">{item.codeLine}</p>
            )}
          </Link>
        ))}
      </div>
    </main>
  )
}

export function SearchPage({ query }: { query?: string }) {
  const results = searchDocs(query ?? '')
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">Search</h1>
      <p className="mt-3 text-muted-foreground">Keyword search over the documentation corpus.</p>
      <form className="mt-8" action="/search" method="get">
        <input
          name="q"
          defaultValue={query}
          placeholder="Search docs..."
          className="h-12 w-full rounded-xl border border-border bg-card px-4 outline-none focus:ring-2 focus:ring-ring"
        />
      </form>
      <div className="mt-10 flex flex-col gap-3">
        {results.length ? (
          results.map(({ doc }) => (
            <Link
              key={doc.id}
              href={`/docs/${doc.slug}`}
              className="rounded-xl border border-border p-5 hover:bg-card"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-medium">{doc.title}</h2>
                <span className="text-xs text-muted-foreground">{doc.section}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{doc.description}</p>
            </Link>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No results.</p>
        )}
      </div>
    </main>
  )
}
