import 'server-only'
import manifest from '@/data/docs-manifest.json'
import { searchDocs, type SearchHit, getDoc } from '@/lib/docs-data'

/**
 * Server-only access to the full documentation store, including document body
 * content. Import this from server components, route handlers, and the admin
 * pipeline only — it is not safe for client bundles.
 */

export type StoredDoc = {
  id: string
  slug: string
  title: string
  section: string
  category: string
  type: string
  description: string
  topics: string[]
  related: string[]
  requires: string[]
  headings: string[]
  excerpt: string
  snippets: { language: string; code: string }[]
  content: string
  sourceUrl: string
  lastUpdated?: string
}

const storedDocs = (manifest.docs as StoredDoc[]) ?? []

const byId = new Map(storedDocs.map((doc) => [doc.id, doc]))
const bySlug = new Map(storedDocs.map((doc) => [doc.slug.toLowerCase(), doc]))

export function allDocs(): StoredDoc[] {
  return storedDocs
}

export function docCount(): number {
  return storedDocs.length
}

export function getDocBySlug(slug: string): StoredDoc | undefined {
  if (!slug) return undefined
  return bySlug.get(slug.toLowerCase()) ?? byId.get(`docs-${slug.toLowerCase()}`)
}

export function getDocById(id: string): StoredDoc | undefined {
  return byId.get(id)
}

export function getContentBySlug(slug: string): string | undefined {
  return getDocBySlug(slug)?.content
}

export function searchDocsFull(query: string, limit = 12): SearchHit[] {
  const hits = searchDocs(query, Math.max(limit * 3, 30))
  const normalized = query.trim().toLowerCase()
  const primaryTerm = normalized.split(/[^a-z0-9+./#-]+/).filter((t) => t.length > 1)[0]

  return hits
    .map((hit) => {
      if (!primaryTerm) return { ...hit, snippet: hit.doc.excerpt }
      const content = getDocBySlug(hit.doc.slug)?.content ?? ''
      const index = content.toLowerCase().indexOf(primaryTerm)
      const contentScore = index !== -1 ? 2 : 0
      const snippet = index !== -1 ? excerpt(content, index, primaryTerm.length) : hit.doc.excerpt
      return { ...hit, score: hit.score + contentScore, snippet }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

function excerpt(content: string, index: number, termLength: number, radius = 200): string {
  const start = Math.max(0, index - radius)
  const end = Math.min(content.length, index + termLength + radius)
  return `${start > 0 ? '…' : ''}${content.slice(start, end).replace(/\s+/g, ' ')}${end < content.length ? '…' : ''}`
}

export function uniqueSlugPairs(): { from: string; to: string }[] {
  const pairs: { from: string; to: string }[] = []
  const seen = new Set<string>()
  for (const doc of storedDocs) {
    for (const item of [...doc.related, ...doc.requires]) {
      const target = getDoc(item)
      if (target) {
        const key = `${doc.slug}->${target.slug}`
        if (!seen.has(key)) {
          seen.add(key)
          pairs.push({ from: doc.slug, to: target.slug })
        }
      }
    }
  }
  return pairs
}

export function coverageReport() {
  const total = storedDocs.length
  return {
    total,
    processed: total,
    failed: 0,
    duplicates: 0,
    empty: storedDocs.filter((d) => !d.content.trim()).length,
    withCode: storedDocs.filter((d) => d.snippets.length > 0).length,
    withApi: storedDocs.filter((d) => d.section === 'API Reference').length,
    withIntegrations: storedDocs.filter((d) => d.section === 'Integrations').length,
    withTroubleshooting: storedDocs.filter((d) =>
      [...d.headings, d.content].join(' ').toLowerCase().includes('troubleshooting'),
    ).length,
    bySection: Object.fromEntries(
      [...new Set(storedDocs.map((d) => d.section))].map((section) => [
        section,
        storedDocs.filter((d) => d.section === section).length,
      ]),
    ),
    byCategory: Object.fromEntries(
      [...new Set(storedDocs.map((d) => d.category))].map((category) => [
        category,
        storedDocs.filter((d) => d.category === category).length,
      ]),
    ),
    generatedAt: manifest.generatedAt ?? '',
  }
}
