import type { ReactNode } from 'react'
import { CopyButton } from '@/components/docs/copy-button'

/**
 * Minimal, safe server-side renderer for the normalized Markdown that the
 * ingestion pipeline stores in the knowledge base. Content comes from
 * untrusted external pages, so everything is rendered as escaped text —
 * never raw HTML.
 */

function isInternalLink(href: string) {
  return href.startsWith('/docs/')
}

export function MarkdownContent({ content }: { content: string }) {
  const blocks = parseBlocks(content)
  return (
    <div className="space-y-5 text-[15px] leading-7 text-foreground/90">
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </div>
  )
}

type Block =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'code'; language: string; code: string }
  | { type: 'table'; rows: string[][] }
  | { type: 'quote'; text: string }

function inline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]*\]\([^)]*\))/g).filter(Boolean)
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[13px] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    const link = /^\[([^\]]*)\]\(([^)]*)\)$/.exec(part)
    if (link) {
      const [, label, href] = link
      return isInternalLink(href) ? (
        <a
          key={index}
          href={href}
          className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/70"
        >
          {label}
        </a>
      ) : (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline underline-offset-4 hover:text-foreground/70"
        >
          {label} ↗
        </a>
      )
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={index}>{part}</span>
  })
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function Block({ block }: { block: Block }) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) {
        return (
          <h2
            id={slugify(block.text)}
            className="scroll-mt-20 pt-4 text-2xl font-semibold tracking-tight text-foreground"
          >
            {block.text}
          </h2>
        )
      }
      return (
        <h3
          id={slugify(block.text)}
          className="scroll-mt-20 pt-2 text-lg font-semibold text-foreground"
        >
          {block.text}
        </h3>
      )
    case 'paragraph':
      return <p>{inline(block.text)}</p>
    case 'quote':
      return (
        <blockquote className="rounded-r-lg border-l-2 border-foreground/30 pl-4 text-muted-foreground">
          {inline(block.text)}
        </blockquote>
      )
    case 'list':
      if (block.ordered) {
        return (
          <ol className="list-decimal space-y-1.5 pl-6 marker:text-muted-foreground">
            {block.items.map((item, i) => (
              <li key={i}>{inline(item)}</li>
            ))}
          </ol>
        )
      }
      return (
        <ul className="list-disc space-y-1.5 pl-6 marker:text-muted-foreground">
          {block.items.map((item, i) => (
            <li key={i}>{inline(item)}</li>
          ))}
        </ul>
      )
    case 'code':
      return <CodeBlock language={block.language} code={block.code} />
    case 'table':
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i ? 'border-t border-border' : 'bg-muted/40'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2.5 align-top">
                      {inline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

export function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-zinc-950 text-zinc-100 dark:bg-black/60">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          {language || 'code'}
        </span>
        <CopyButton code={code} />
      </div>
      <pre className="max-h-[420px] overflow-auto p-4 font-mono text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function parseBlocks(content: string): Block[] {
  const lines = content.replace(/\r/g, '').split('\n')
  const blocks: Block[] = []
  let i = 0

  const pushParagraph = (linesToMerge: string[]) => {
    const text = linesToMerge.map((line) => line.trim().replace(/^[+#>\-*]+\s*/, '')).join(' ')
    if (text) blocks.push({ type: 'paragraph', text })
  }

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i++
      continue
    }
    const h2 = /^##\s+(.+)$/.exec(trimmed)
    if (h2) {
      blocks.push({ type: 'heading', level: 2, text: h2[1] })
      i++
      continue
    }
    const h3 = /^###\s+(.+)$/.exec(trimmed)
    if (h3) {
      blocks.push({ type: 'heading', level: 3, text: h3[1] })
      i++
      continue
    }
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++
      if (codeLines.length) blocks.push({ type: 'code', language, code: codeLines.join('\n') })
      continue
    }
    if (trimmed.startsWith('|')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        const cells = lines[i]
          .trim()
          .replace(/\s+\|/g, '|')
          .replace(/\|\s+/g, '|')
          .split('|')
          .filter(Boolean)
          .map((cell) => cell.trim())
        if (!cells.every((cell) => /^[-:]+$/.test(cell))) rows.push(cells)
        i++
      }
      if (rows.length) blocks.push({ type: 'table', rows })
      continue
    }
    if (/^>\s+/.test(trimmed)) {
      blocks.push({ type: 'quote', text: trimmed.replace(/^>\s+/, '') })
      i++
      continue
    }
    if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const ordered = /^\d+\./.test(trimmed)
      const items: string[] = []
      while (
        i < lines.length &&
        (/^[-*]\s+/.test(lines[i].trim()) || /^\d+\.\s+/.test(lines[i].trim()))
      ) {
        items.push(
          lines[i]
            .trim()
            .replace(/^[-*]\s+/, '')
            .replace(/^\d+\.\s+/, ''),
        )
        i++
      }
      blocks.push({ type: 'list', ordered, items })
      continue
    }
    const paragraph: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^#{2,3}\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('|') &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paragraph.push(lines[i])
      i++
    }
    pushParagraph(paragraph)
  }
  return blocks
}
