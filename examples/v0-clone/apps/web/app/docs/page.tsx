import Link from 'next/link'
import { docs, sections } from '@/lib/docs-data'

export default function DocsPage() {
  return <main className="mx-auto min-h-screen max-w-7xl px-6 py-12"><p className="text-sm text-muted-foreground">Official v0 documentation</p><h1 className="mt-3 text-4xl font-semibold tracking-tight">Documentation</h1><p className="mt-4 max-w-2xl text-muted-foreground">Browse the indexed source material. Every page links back to the official v0 docs.</p><div className="mt-12 grid gap-10 md:grid-cols-3">{sections.map((section) => <section key={section}><h2 className="border-b border-border pb-3 text-sm font-medium">{section}</h2><div className="mt-3 flex flex-col gap-2">{docs.filter((doc) => doc.section === section).map((doc) => <Link key={doc.id} href={`/docs/${doc.slug}`} className="rounded-xl border border-transparent p-3 hover:border-border hover:bg-card"><span className="font-medium">{doc.title}</span><span className="mt-1 block text-sm text-muted-foreground">{doc.description}</span></Link>)}</div></section>)}</div></main>
}
