import Link from 'next/link'
import { notFound } from 'next/navigation'
import { docs, getDoc } from '@/lib/docs-data'

export function generateStaticParams() {
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()
  return (
    <main className="mx-auto grid min-h-screen max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1fr_240px]">
      <article className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>{doc.section}</span>
        </div>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight">{doc.title}</h1>
        <p className="mt-4 text-xl leading-8 text-muted-foreground">{doc.description}</p>
        <div className="mt-8 rounded-xl border border-border bg-muted/30 p-4 text-sm">
          <span className="font-medium">Official source</span>
          <span className="ml-2 text-muted-foreground">
            This page is an indexed application view of documented v0 material.
          </span>
        </div>
        <div className="mt-12 flex flex-col gap-10">
          {doc.headings.map((heading, index) => (
            <section key={heading} id={heading.toLowerCase().replaceAll(' ', '-')}>
              <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {index === 0
                  ? doc.description
                  : `Review the official guidance for ${heading.toLowerCase()} in this workflow. Use the source link below for the canonical details and latest updates.`}
              </p>
              {index === 0 && (
                <pre className="mt-5 overflow-x-auto rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                  <code>{`// Source: ${doc.sourceUrl}\n// Reference content is preserved in the indexed knowledge base.`}</code>
                </pre>
              )}
            </section>
          ))}
        </div>
        <a
          href={doc.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-12 inline-flex text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          Open official documentation ↗
        </a>
      </article>
      <aside className="hidden lg:block">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          On this page
        </p>
        <nav className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
          {doc.headings.map((heading) => (
            <a
              key={heading}
              href={`#${heading.toLowerCase().replaceAll(' ', '-')}`}
              className="hover:text-foreground"
            >
              {heading}
            </a>
          ))}
        </nav>
      </aside>
    </main>
  )
}
