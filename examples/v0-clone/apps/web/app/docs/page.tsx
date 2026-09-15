import Link from 'next/link'
import { docs, sections } from '@/lib/docs-data'

export default async function DocsPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>
}) {
  const { section: sectionParam } = await searchParams
  const activeSection = sectionParam ? decodeURIComponent(sectionParam) : null
  const visibleSections = activeSection ? [activeSection] : sections

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Official v0 documentation, indexed</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Documentation</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Browse the {docs.length} indexed source pages. Every page links back to the official v0
        docs. Application-generated grouping over the canonical corpus.
      </p>

      {activeSection && (
        <Link href="/docs" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← All sections
        </Link>
      )}
      <div className="mt-8 flex flex-wrap gap-2">
        {sections.map((section) => (
          <Link
            key={section}
            href={section === activeSection ? '/docs' : `/docs?section=${encodeURIComponent(section)}`}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
              section === activeSection
                ? 'border-foreground/40 bg-card text-foreground'
                : 'border-border text-muted-foreground hover:bg-card hover:text-foreground'
            }`}
          >
            {section}
            <span className="text-xs text-muted-foreground">
              {docs.filter((doc) => doc.section === section).length}
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {visibleSections.map((section) => (
          <section key={section}>
            <h2 className="border-b border-border pb-3 text-sm font-medium">{section}</h2>
            <div className="mt-3 flex flex-col gap-2">
              {docs
                .filter((doc) => doc.section === section)
                .map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/docs/${doc.slug}`}
                    className="rounded-xl border border-transparent p-3 hover:border-border hover:bg-card"
                  >
                    <span className="font-medium">{doc.title}</span>
                    <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">
                      {doc.description || doc.excerpt}
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}