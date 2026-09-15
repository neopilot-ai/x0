#!/usr/bin/env node
/**
 * Ingests the official v0 documentation (https://v0.app/docs) into a
 * canonical, source-attributed knowledge base:
 *
 *   data/docs-manifest.json   – canonical manifest (used by the app)
 *   data/docs/index.json      – same manifest for external tooling
 *   data/docs/{id}.json       – per-document records
 *   data/taxonomy.json        – sections / categories / topics graph
 *
 * The v0 docs site serves page-level Markdown by appending `.md` to any
 * documentation URL, and publishes `sitemap-docs.xml` plus `llms.txt`.
 * Each record keeps its `sourceUrl` and optional `lastUpdated` so the app can
 * always link back to the official source.
 *
 * Run from `examples/v0-clone/apps/web`:
 *   node scripts/ingest-docs.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const APP_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATA_DIR = join(APP_ROOT, 'data')
const DOCS_DIR = join(DATA_DIR, 'docs')

const SITEMAP_URL = 'https://v0.app/sitemap-docs.xml'
const HOST = 'https://v0.app'
const CONCURRENCY = 8
const FETCH_TIMEOUT_MS = 15_000
const MAX_BODY_BYTES = 1_500_000
const MAX_CONTENT_CHARS = 7_000
const MAX_SNIPPETS = 8
const MAX_HEADINGS = 60

const TOPIC_HINTS = [
  ['mcp', 'mcp', 'model context protocol'],
  ['databases', 'database', 'sql', 'postgres', 'neon', 'supabase', 'upstash'],
  ['github', 'github', 'git-import', 'pull request', 'pull requests'],
  ['deployment', 'deploys', 'deploy', 'publish', 'vercel-project', 'preview deployment'],
  ['design', 'design-mode', 'design-mode', 'figma', 'tailwind', 'ui'],
  ['ai', 'ai-models', 'ai models', 'model', 'gateway', 'openai'],
  ['security', 'security', 'privacy', 'trusted', 'sandbox'],
  ['api', 'api/'],
  ['authentication', 'auth', 'bearer', 'token', 'api-key', 'api key'],
  ['streaming', 'stream', 'streaming', 'sse'],
  ['environment-variables', 'environment variables', 'env var'],
  ['previews', 'preview', 'preview url'],
  ['agents', 'agent', 'agents', 'pre-installed'],
  ['terminal', 'terminal', 'command'],
  ['permissions', 'permission', 'ask', 'auto', 'approval'],
  ['integrations', 'integration', 'marketplace'],
  ['pricing', 'pricing', 'plan', 'billing', 'credits'],
  ['teams', 'team', 'teams', 'rbac'],
  ['versions', 'version', 'versions', 'restore'],
  ['sharing', 'share', 'sharing', 'publish'],
]

const SECTION_OVERRIDES = {
  '': 'Overview',
  'quickstart': 'Getting Started',
  'faqs': 'FAQs',
  'enterprise': 'Reference',
  'pricing': 'Reference',
  'security': 'Reference',
  'account': 'Reference',
  'teams': 'Reference',
  'usage-dashboard': 'Reference',
}

function kebab(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseFrontmatter(body) {
  if (!body.startsWith('---')) return { meta: {}, content: body }
  const end = body.indexOf('\n---', 4)
  if (end === -1) return { meta: {}, content: body }
  const block = body.slice(4, end)
  const content = body.slice(end + 4)
  const meta = {}
  const lines = block.split('\n')
  let currentKey
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const match = /^([\w-]+):\s?(.*)$/.exec(line)
    if (match) {
      const [, key, raw] = match
      currentKey = key.startsWith(' ') ? key.slice(1) : key
      while (currentKey.startsWith(' ')) currentKey = currentKey.slice(1)
      if (raw.startsWith('[')) {
        meta[currentKey] = [...raw.matchAll(/`?([^`\[\]",\s]+)`?/g)].map((m) => m[1])
      } else if (raw) {
        meta[currentKey] = raw
      } else {
        meta[currentKey] = []
      }
      continue
    }
    const item = /^\s*-\s*(.+)$/.exec(line)
    if (item && currentKey) {
      if (!Array.isArray(meta[currentKey])) meta[currentKey] = meta[currentKey] ? [meta[currentKey]] : []
      meta[currentKey].push(item[1].trim())
    }
  }
  return { meta, content }
}

function splitFrontmatterList(raw) {
  if (Array.isArray(raw)) return raw.filter(Boolean)
  if (typeof raw !== 'string') return []
  return raw
    .split(',')
    .map((s) => s.trim().replace(/`/g, '').replace(/^"|"$/g, ''))
    .filter(Boolean)
}

function stripJsx(line) {
  return line
    .replace(/\{\/\*.*?\*\/\}/g, '')
    .replace(/\{(?:[^{}]|\{[^{}]*\})*\}/g, '')
    .replace(/<[^>]+>/g, '')
}

function normalizeBody(raw) {
  let body = raw
  const footerAt = body.indexOf('For a semantic overview of all documentation')
  if (footerAt !== -1) body = body.slice(0, footerAt)
  body = body.replace(/<!--.*?-->/gs, '')

  const lines = body.split('\n')
  const out = []
  let inFence = false
  for (const rawLine of lines) {
    if (/^\s*```/.test(rawLine)) {
      inFence = !inFence
      out.push(rawLine)
      continue
    }
    if (inFence) {
      out.push(rawLine)
      continue
    }
    const trimmed = rawLine.trim()
    if (
      /^import\s/.test(trimmed) ||
      /^export\s/.test(trimmed) ||
      /^\s*<(Video|Image|Figure|img|DocsCardList|LearnMore)\s*\/?\s*>?$/i.test(trimmed.replace(/\{$.*$/s, '')) ||
      /^<\/?(Video|Image|figure|Callout|Card|CardHeader|CardContent|CardTitle|CardDescription)\s*>?$/i.test(trimmed)
    ) {
      continue
    }
    if (trimmed === '') {
      out.push('')
      continue
    }
    if (/^!\[/.test(trimmed) && !trimmed.includes(' ')) {
      continue
    }
    const cleaned = stripJsx(rawLine).trim()
    out.push(cleaned)
  }
  return out.join('\n').replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\n{3,}/g, '\n\n')
}

function extractHeadings(body) {
  const headings = []
  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    headings.push(match[2].trim().replace(/`/g, ''))
    if (headings.length >= MAX_HEADINGS) break
  }
  return headings
}

function extractSnippets(body) {
  const snippets = []
  const fence = /```(\w+)?\n([\s\S]*?)```/g
  let match
  while ((match = fence.exec(body)) && snippets.length < MAX_SNIPPETS) {
    snippets.push({ language: match[1] || 'text', code: match[2].trim() })
  }
  return snippets
}

function extractExcerpt(body) {
  const lines = body
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/^#|^```/.test(l))
  let excerpt = ''
  for (const line of lines) {
    const candidate = line.replace(/^[#>\-\*\d.]+\s*/, '').replace(/`/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    if (candidate && candidate.length > 12) {
      excerpt = candidate
      break
    }
  }
  if (!excerpt) excerpt = 'Documentation from the official v0 docs.'
  return excerpt.length > 340 ? `${excerpt.slice(0, 337)}…` : excerpt
}

function slugToId(slug) {
  const base = kebab(slug || '')
  return base ? `docs-${base}` : 'docs-overview'
}

function pickSection(url, type, slug) {
  const path = url.replace('https://v0.app', '').replace(/^\/docs\/?/, '')
  if (path.startsWith('api/') || path === 'api') return 'API Reference'
  if (path.startsWith('compare/')) return 'Compare'
  if (path.includes('/api/')) return 'API Reference'
  if (slug in SECTION_OVERRIDES) return SECTION_OVERRIDES[slug]
  if (typeof type === 'string' && type.toLowerCase() === 'integration') return 'Integrations'
  if (slug.includes('troubleshoot')) return 'Troubleshooting'
  return 'Guides'
}

function pickCategory(url, section) {
  if (section !== 'API Reference') return section
  const path = url.replace('https://v0.app/docs', '')
  const segments = path.split('/').filter(Boolean)
  if (segments.length >= 3 && segments[0] === 'api') {
    const area = segments[2] || segments[1]
    if (area === 'reference') return segments[3] ? `API · ${capitalize(segments[3])}` : 'API Reference'
    return `API · ${capitalize(segments[1])}`
  }
  return 'API Reference'
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function pickTopics(slug, title, description, type, url, related) {
  const haystack = `${slug} ${title} ${description} ${type} ${url} ${related.join(' ')}`.toLowerCase()
  const found = []
  for (const [topic, ...hints] of TOPIC_HINTS) {
    if (hints.some((hint) => haystack.includes(hint.toLowerCase()))) found.push(topic)
  }
  return [...new Set(found)].slice(0, 8)
}

function resolveLinks(list, basePath) {
  return (list || [])
    .map((s) => s.trim().replace(/^"|"$/g, ''))
    .filter(Boolean)
    .map((s) => (s.startsWith('/docs/') ? s.slice(6) : s.startsWith('/') ? s.slice(1) : s))
}

async function fetchPage(url, lastmod) {
  const mdUrl = url.endsWith('/docs') ? `${url}.md` : `${url}.md`
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(mdUrl, {
      headers: { 'user-agent': 'v0-docs-indexer/1.0 (documentation knowledge base ingestion)' },
      signal: controller.signal,
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const reader = res.body.getReader()
    const chunks = []
    let size = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        reader.cancel()
        throw new Error('body too large')
      }
    }
    const text = Buffer.concat(chunks).toString('utf-8')
    return parseAndNormalize(url, lastmod, text)
  } finally {
    clearTimeout(timer)
  }
}

function parseAndNormalize(url, lastmod, rawMarkdown) {
  const { meta, content } = parseFrontmatter(rawMarkdown)
  const slug = url.replace('https://v0.app/docs', '').replace(/^\/|\/$/g, '')
  const title = String(meta.title || slug.split('/').pop() || 'Overview')
  const description = String(meta.description || '')
  const type = String(meta.type || '')
  const related = resolveLinks(splitFrontmatterList(meta.related))
  const requires = resolveLinks(splitFrontmatterList(meta.prerequisites))
  const body = normalizeBody(content)
  const section = pickSection(url, type, slug)
  const category = pickCategory(url, section)
  const headings = extractHeadings(body)
  const snippets = extractSnippets(body)
  const id = slugToId(slug)
  return {
    id,
    slug,
    title,
    section,
    category,
    type,
    description,
    topics: pickTopics(slug, title, description, type, url, related),
    related,
    requires,
    headings,
    excerpt: extractExcerpt(body),
    snippets,
    content: body.slice(0, MAX_CONTENT_CHARS),
    sourceUrl: url,
    lastUpdated: lastmod ? lastmod.slice(0, 10) : undefined,
  }
}

async function crawlSite() {
  const sitemapRes = await fetch(SITEMAP_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
  if (!sitemapRes.ok) throw new Error(`sitemap HTTP ${sitemapRes.status}`)
  const xml = await sitemapRes.text()
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1])
  const lastmods = {}
  for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>\s*<lastmod>\s*([^<]+?)\s*<\/lastmod>/gs)) {
    lastmods[m[1]] = m[2]
  }
  const unique = [...new Set(urls)].filter((u) => u.startsWith(HOST))
  const docs = []
  let cursor = 0
  const report = {
    pages_discovered: unique.length,
    pages_processed: 0,
    pages_failed: 0,
    failed_urls: [],
  }
  async function worker() {
    while (cursor < unique.length) {
      const url = unique[cursor++]
      try {
        const doc = await fetchPage(url, lastmods[url])
        docs.push(doc)
        report.pages_processed++
      } catch (error) {
        report.pages_failed++
        report.failed_urls.push({ url, error: error.message })
      }
    }
  }
  const workers = Array.from({ length: CONCURRENCY }, () => worker())
  await Promise.all(workers)
  return { docs, report, lastmod: new Date().toISOString() }
}

function buildTaxonomy(docs) {
  const sections = {}
  const categories = {}
  const topics = {}
  for (const doc of docs) {
    sections[doc.section] = (sections[doc.section] || 0) + 1
    categories[doc.category] = (categories[doc.category] || 0) + 1
    for (const topic of doc.topics) topics[topic] = (topics[topic] || 0) + 1
  }
  return {
    generatedAt: new Date().toISOString(),
    source: 'v0',
    sections: Object.entries(sections)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    categories: Object.entries(categories)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
    topics: Object.entries(topics)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  }
}

const sectionOrder = ['Overview', 'Getting Started', 'Guides', 'Integrations', 'API Reference', 'Compare', 'FAQs', 'Troubleshooting', 'Reference']
const orderOf = (section) => {
  const i = sectionOrder.indexOf(section)
  return i === -1 ? sectionOrder.length : i
}

async function main() {
  console.log('Crawling official v0 documentation from', SITEMAP_URL)
  const { docs, report, lastmod } = await crawlSite()
  docs.sort((a, b) => orderOf(a.section) - orderOf(b.section) || a.title.localeCompare(b.title))
  const taxonomy = buildTaxonomy(docs)
  const manifest = {
    generatedBy: 'scripts/ingest-docs.mjs',
    source: 'v0',
    sourceBase: 'https://v0.app/docs',
    generatedAt: lastmod,
    report: {
      ...report,
      pages_changed: report.pages_processed,
      pages_removed: 0,
    },
    docs,
  }

  await mkdir(DOCS_DIR, { recursive: true })
  await writeFile(join(DATA_DIR, 'docs-manifest.json'), JSON.stringify(manifest, null, 2))
  await writeFile(join(DOCS_DIR, 'index.json'), JSON.stringify(manifest, null, 2))
  await Promise.all(
    manifest.docs.map((doc) => writeFile(join(DOCS_DIR, `${doc.id}.json`), JSON.stringify(doc, null, 2))),
  )
  await writeFile(join(DATA_DIR, 'taxonomy.json'), JSON.stringify(taxonomy, null, 2))

  const snippetCount = docs.filter((d) => d.snippets.length).length
  const apiCount = docs.filter((d) => d.section === 'API Reference').length
  const integrationCount = docs.filter((d) => d.section === 'Integrations').length
  console.log('')
  console.log('Crawl report:', report.pages_processed, 'processed,', report.pages_failed, 'failed')
  if (report.failed_urls.length) {
    console.log('Failed URLs:')
    for (const f of report.failed_urls.slice(0, 10)) console.log(`  - ${f.url} (${f.error})`)
  }
  console.log('Coverage:', docs.length, 'docs |', snippetCount, 'with code |', apiCount, 'API |', integrationCount, 'integrations')
  console.log('Sections:', Object.entries(taxonomy.sections.reduce((a, s) => ((a[s.name] = s.count), a), {})).join(', '))
  console.log('Wrote', DATA_DIR)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})