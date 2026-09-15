import Link from 'next/link'
import { docs } from '@/lib/docs-data'
export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-12">
      <p className="text-sm text-muted-foreground">Application-generated relationships</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Knowledge graph</h1>
      <p className="mt-4 text-muted-foreground">
        A lightweight source map connecting documents to their topics.
      </p>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {docs.map((doc) => (
          <div key={doc.id} className="rounded-2xl border border-border bg-card p-5">
            <Link href={`/docs/${doc.slug}`} className="font-medium hover:underline">
              {doc.title}
            </Link>
            <div className="mt-4 flex flex-wrap gap-2">
              {doc.topics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
