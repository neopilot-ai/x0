'use client'

import type { ReactNode } from 'react'

function inline(text: string): ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]*\]\([^)]*\))/g).filter(Boolean)
  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    const link = /^\[([^\]]*)\]\(([^)]*)\)$/.exec(part)
    if (link) {
      const [, label, href] = link
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-foreground underline underline-offset-4 hover:text-foreground/70"
        >
          {label}
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

export function MiniMarkdown({ text }: { text: string }) {
  const blocks = text.split('\n')
  const rendered: ReactNode[] = []
  let content: string[] = []

  const flush = (key: number) => {
    if (content.length) {
      rendered.push(
        <p key={key} className="whitespace-pre-wrap text-sm leading-7">
          {inline(content.join('\n'))}
        </p>,
      )
      content = []
    }
  }

  blocks.forEach((block, index) => {
    const trimmed = block.trim()
    if (!trimmed) {
      flush(index)
      return
    }
    if (trimmed === '---') {
      flush(index)
      rendered.push(<hr key={`hr-${index}`} className="my-3 border-border" />)
      return
    }
    if (trimmed.startsWith('### ')) {
      flush(index)
      rendered.push(
        <h4 key={`h-${index}`} className="mt-4 flex items-center gap-2 text-sm font-semibold">
          {inline(trimmed.slice(4))}
        </h4>,
      )
      return
    }
    if (trimmed.startsWith('> ')) {
      flush(index)
      rendered.push(
        <blockquote
          key={`q-${index}`}
          className="my-3 rounded-r-lg border-l-2 border-foreground/30 pl-4 text-sm leading-6 text-muted-foreground"
        >
          {inline(trimmed.slice(2))}
        </blockquote>,
      )
      return
    }
    if (/^[-*] /.test(trimmed)) {
      flush(index)
      rendered.push(
        <ul key={`ul-${index}`} className="my-1 list-disc space-y-1 pl-5 text-sm leading-6">
          {trimmed
            .replace(/^[-*] /, '')
            .split(/  \n?/)
            .map((item, i) => (
              <li key={i}>{inline(item)}</li>
            ))}
        </ul>,
      )
      return
    }
    content.push(trimmed)
  })
  flush(blocks.length)

  return <div className="space-y-2">{rendered}</div>
}
