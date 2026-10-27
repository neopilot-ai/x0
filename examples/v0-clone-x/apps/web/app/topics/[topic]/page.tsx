import Link from 'next/link'
import { notFound } from 'next/navigation'
import { docs, topics } from '@/lib/docs-data'
export function generateStaticParams() {
  return topics.map((topic) => ({ topic }))
}
export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const matches = docs.filter((doc) => doc.topics.includes(topic))
  if (!topics.includes(topic)) notFound()
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12">
      <Link href="/topics" className="text-sm text-muted-foreground hover:text-foreground">
        ← All topics
      </Link>
      <h1 className="mt-8 text-4xl font-semibold tracking-tight">{topic}</h1>
      <p className="mt-3 text-muted-foreground">
        {matches.length} indexed documents connected to this topic.
      </p>
      <div className="mt-10 flex flex-col gap-3">
        {matches.map((doc) => (
          <Link
            key={doc.id}
            href={`/docs/${doc.slug}`}
            className="rounded-2xl border border-border bg-card p-5 hover:border-foreground/30"
          >
            <h2 className="font-medium">{doc.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{doc.description}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
