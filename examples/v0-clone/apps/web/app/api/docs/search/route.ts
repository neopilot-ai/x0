import { searchDocsFull } from '@/lib/docs-store'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const query = (url.searchParams.get('q') ?? '').trim().slice(0, 200)
  const rawLimit = Number(url.searchParams.get('limit') ?? '12')
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(Math.floor(rawLimit), 1), 50) : 12

  if (!query) {
    return Response.json({ hits: [], total: 0, query: '', section: null })
  }

  const hits = searchDocsFull(query, limit)

  return Response.json({
    query,
    limit,
    total: hits.length,
    hits: hits.map((hit) => ({
      id: hit.doc.id,
      slug: hit.doc.slug,
      title: hit.doc.title,
      section: hit.doc.section,
      category: hit.doc.category,
      description: hit.doc.description,
      topics: hit.doc.topics,
      excerpt: hit.doc.excerpt,
      snippet: hit.snippet,
      score: Math.round(hit.score * 100) / 100,
      reasons: hit.reasons,
      sourceUrl: hit.doc.sourceUrl,
    })),
  })
}