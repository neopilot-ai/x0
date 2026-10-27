import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CodeBlock, MarkdownContent } from '@/components/docs/markdown-content'
import { getDocBySlug } from '@/lib/docs-store'

export function SectionDocPage({
  section,
  slug,
}: {
  section: 'api-reference' | 'examples' | 'integrations' | 'tutorials' | 'troubleshooting'
  slug: string
}) {
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const labels: Record<string, { plural: string; singular: string }> = {
    'api-reference': { plural: 'API reference', singular: 'Reference page' },
    examples: { plural: 'Examples', singular: 'Code example' },
    integrations: { plural: 'Integrations', singular: 'Integration' },
    tutorials: { plural: 'Tutorials', singular: 'Tutorial' },
    troubleshooting: { plural: 'Troubleshooting', singular: 'Troubleshooting guide' },
  }
  const label = labels[section]

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_240px]">
      <article className="min-w-0 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <Link href={`/${section}`} className="hover:text-foreground">
            {label.plural}
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{doc.title}</span>
        </nav>

        <span className="mt-8 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-amber-500" />
          Indexed view · {label.singular} · {doc.section}
        </span>

        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em]">{doc.title}</h1>
        {doc.description && (
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
        )}

        {section === 'examples' && doc.snippets.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Indexed code
            </h2>
            <div className="mt-3 space-y-4">
              {doc.snippets.map((snippet, index) => (
                <CodeBlock key={index} language={snippet.language} code={snippet.code} />
              ))}
            </div>
          </section>
        )}

        {doc.content ? (
          <div className="mt-10">
            <MarkdownContent content={doc.content} />
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
            <p>{doc.excerpt || doc.description}</p>
            <p className="mt-3">
              The body for this page is not included in the offline index. Open the source for the
              canonical details.
            </p>
          </div>
        )}

        <a
          href={doc.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-foreground/30 hover:bg-card"
        >
          Open official documentation <span aria-hidden>↗</span>
        </a>
      </article>

      <aside className="hidden lg:block">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <nav className="mt-4 max-h-[70vh] space-y-2.5 overflow-auto text-sm text-muted-foreground">
          {doc.headings.map((heading) => (
            <a
              key={heading}
              href={`#${heading
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')}`}
              className="block hover:text-foreground"
            >
              {heading}
            </a>
          ))}
        </nav>
        {doc.related.length > 0 && (
          <>
            <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Related
            </p>
            <nav className="mt-3 space-y-2 text-sm text-muted-foreground">
              {doc.related.map((rel) => (
                <a key={rel} href={`/docs/${rel}`} className="block hover:text-foreground">
                  {rel}
                </a>
              ))}
            </nav>
          </>
        )}
      </aside>
    </main>
  )
}
