export const runtime = 'nodejs'
export const maxDuration = 60

const HOST = 'https://v0.app'
const FETCH_TIMEOUT_MS = 15_000
const MAX_BODY_BYTES = 1_500_000

const SECTION_OVERRIDES: Record<string, string> = {
  '': 'Overview',
  quickstart: 'Getting Started',
  faqs: 'FAQs',
  enterprise: 'Reference',
  pricing: 'Reference',
  security: 'Reference',
  account: 'Reference',
  teams: 'Reference',
  'usage-dashboard': 'Reference',
}

function kebab(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseFrontmatter(body: string) {
  if (!body.startsWith('---')) return { meta: {} as Record<string, unknown>, content: body }
  const end = body.indexOf('\n---', 4)
  if (end === -1) return { meta: {} as Record<string, unknown>, content: body }
  const block = body.slice(4, end)
  const content = body.slice(end + 4)
  const meta: Record<string, unknown> = {}
  const lines = block.split('\n')
  let currentKey = ''
  for (const line of lines) {
    const match = /^([\w-]+):\s?(.*)$/.exec(line)
    if (match) {
      const [, key, raw] = match
      currentKey = key
      if (raw.startsWith('[')) {
        meta[key] = [...raw.matchAll(/`?([^`[\]",\s]+)`?/g)].map((m) => m[1])
      } else if (raw) {
        meta[key] = raw
      } else {
        meta[key] = []
      }
      continue
    }
    const item = /^\s*-\s*(.+)$/.exec(line)
    if (item && currentKey) {
      const existing = meta[currentKey]
      if (!Array.isArray(existing)) meta[currentKey] = existing ? [existing] : []
      ;(meta[currentKey] as string[]).push(item[1].trim())
    }
  }
  return { meta, content }
}

function normalizeBody(raw: string) {
  let body = raw
  const footerAt = body.indexOf('For a semantic overview of all documentation')
  if (footerAt !== -1) body = body.slice(0, footerAt)
  body = body.replace(/<!--.*?-->/gs, '')
  return body
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function extractHeadings(body: string) {
  const headings: string[] = []
  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim())
    if (!match) continue
    headings.push(match[2].trim().replace(/`/g, ''))
    if (headings.length >= 40) break
  }
  return headings
}

function extractSnippets(body: string) {
  const snippets: { language: string; code: string }[] = []
  const fence = /```(\w+)?\n([\s\S]*?)```/g
  let match
  while ((match = fence.exec(body)) && snippets.length < 8) {
    snippets.push({ language: match[1] || 'text', code: match[2].trim() })
  }
  return snippets
}

function extractExcerpt(body: string) {
  const lines = body
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !/^#|^```/.test(l))
  for (const line of lines) {
    const candidate = line
      .replace(/^[#>\-*\d.]+\s*/, '')
      .replace(/`/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    if (candidate && candidate.length > 12) {
      return candidate.length > 340 ? `${candidate.slice(0, 337)}…` : candidate
    }
  }
  return 'Documentation from the official v0 docs.'
}

function pickSection(url: string, type: string, slug: string) {
  const path = url.replace(HOST, '').replace(/^\/docs\/?/, '')
  if (path.startsWith('api/') || path.includes('/api/') || path === 'api') return 'API Reference'
  if (path.includes('/compare/')) return 'Compare'
  if (slug in SECTION_OVERRIDES) return SECTION_OVERRIDES[slug]
  if (type.toLowerCase() === 'integration') return 'Integrations'
  if (slug.includes('troubleshoot')) return 'Troubleshooting'
  return 'Guides'
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { url?: unknown } | null
  const rawUrl = typeof body?.url === 'string' ? body.url.trim() : ''

  if (!rawUrl) {
    return Response.json(
      { ok: false, error: 'Provide a v0.app documentation URL.' },
      { status: 400 },
    )
  }

  let target: URL
  try {
    target = new URL(rawUrl)
  } catch {
    return Response.json({ ok: false, error: 'Invalid URL.' }, { status: 400 })
  }

  if (
    target.protocol !== 'https:' ||
    target.hostname !== 'v0.app' ||
    !target.pathname.startsWith('/docs/')
  ) {
    return Response.json(
      { ok: false, error: 'Only https://v0.app/docs/... URLs are allowed.' },
      { status: 403 },
    )
  }

  const markdownUrl = target.href.endsWith('.md') ? target.href : `${target.href}.md`

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    const response = await fetch(markdownUrl, {
      headers: { 'user-agent': 'v0-docs-indexer/1.0 (documentation knowledge base ingestion)' },
      signal: controller.signal,
      redirect: 'follow',
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const reader = response.body!.getReader()
    const chunks: Uint8Array[] = []
    let size = 0
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      size += value.byteLength
      if (size > MAX_BODY_BYTES) {
        reader.cancel()
        throw new Error('body too large (over 1.5 MB)')
      }
    }
    const text = Buffer.concat(chunks).toString('utf-8')

    const { meta, content } = parseFrontmatter(text)
    const slug = target.pathname.replace(/^\/docs\/?/, '').replace(/\/$/, '')
    const title = String(meta.title || slug.split('/').pop() || 'Overview')
    const description = String(meta.description || '')
    const type = String(meta.type || '')
    const bodyText = normalizeBody(content)
    const section = pickSection(target.href, type, slug)
    const doc = {
      id: `docs-${kebab(slug || 'overview')}`,
      slug,
      title,
      section,
      type,
      description,
      headings: extractHeadings(bodyText),
      excerpt: extractExcerpt(bodyText),
      snippets: extractSnippets(bodyText),
      contentLength: bodyText.length,
      sourceUrl: target.href,
    }

    return Response.json({
      ok: true,
      fetchedAt: new Date().toISOString(),
      bytes: size,
      doc,
    })
  } catch (error) {
    const message =
      (error as Error).name === 'AbortError' ? 'Request timed out.' : (error as Error).message
    return Response.json({ ok: false, error: message }, { status: 502 })
  } finally {
    clearTimeout(timer)
  }
}
