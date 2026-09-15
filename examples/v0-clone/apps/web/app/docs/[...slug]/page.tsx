import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MarkdownContent } from '@/components/docs/markdown-content'
import { docs, prevNext, relatedDocs } from '@/lib/docs-data'
import { getDocBySlug } from '@/lib/docs-store'

export function generateStaticParams() {
  return docs.filter((doc) => doc.slug).map((doc) => ({ slug: doc.slug.split('/') }))
}

export default async function DocPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugParts } = await params
  const slug = slugParts.join('/')
  const doc = getDocBySlug(slug)
  if (!doc) notFound()

  const { prev, next } = prevNext(doc)
  const related = relatedDocs(doc)

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_240px]">
      <article className="min-w-0 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span className="truncate text-foreground">{doc.title}</span>
          {doc.section && (
            <>
              <span>/</span>
              <Link href={`/docs?section=${encodeURIComponent(doc.section)}`} className="hover:text-foreground">
                {doc.section}
              </Link>
            </>
          )}
        </nav>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Official source · indexed
          </span>
          <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-muted-foreground">
            {doc.section} · {doc.category}
          </span>
          {doc.lastUpdated && (
            <span className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-muted-foreground">
              Updated {doc.lastUpdated}
            </span>
          )}
        </div>

        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.03em]">{doc.title}</h1>
        {doc.description && (
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{doc.description}</p>
        )}

        <div className="mt-8 rounded-xl border border-border bg-muted/30 p-4 text-sm leading-6 text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Provenance.</span> This page renders indexed
            material from the official v0 documentation. The application may surface structured
            views, excerpts, and related links, but the authoritative text lives at the source.
          </p>
        </div>

        {doc.content ? (
          <div className="mt-10">
            <MarkdownContent content={doc.content} />
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
            <p>{doc.excerpt || doc.description}</p>
            <p className="mt-3">
              The full body for this page is not included in the offline index. Open the official
              documentation below for the canonical details.
            </p>
          </div>
        )}

        {doc.headings.length > 0 && (
          <details className="mt-8 rounded-xl border border-border bg-card px-4 py-3 text-sm">
            <summary className="cursor-pointer font-medium">All headings</summary>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {doc.headings.map((heading) => (
                <li key={heading}>
                  <Link
                    href={`${doc.sourceUrl}#${heading.toLowerCase().replace(/[^a-z0-9 -]/g, '').replaceAll(' ', '-')}`}
                    target="_blank"
                    className="hover:text-foreground"
                  >
                    {heading}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        )}

        <section className="mt-12">
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Related documentation
          </h2>
          {related.length ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/docs/${item.slug}`}
                  className="rounded-xl border border-border p-4 hover:border-foreground/30 hover:bg-card"
                >
                  <p className="font-medium">{item.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              No related documents recorded in the index.
            </p>
          )}
        </section>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className="group text-muted-foreground hover:text-foreground">
              <span className="block text-xs text-muted-foreground/70">Previous</span>
              <span className="font-medium group-hover:underline">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className="group text-right text-muted-foreground hover:text-foreground"
            >
              <span className="block text-xs text-muted-foreground/70">Next</span>
              <span className="font-medium group-hover:underline">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>

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
          {doc.headings.length ? (
            doc.headings.map((heading) => (
              <a
                key={heading}
                href={`${doc.sourceUrl}#${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`}
                target="_blank"
                className="block hover:text-foreground"
              >
                {heading}
              </a>
            ))
          ) : (
            <p className="text-xs">No headings indexed.</p>
          )}
        </nav>
      </aside>
    </main>
  )
}