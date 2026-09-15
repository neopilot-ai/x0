'use client'

import { useEffect, useMemo, useRef } from 'react'
import { highlightCodeForPath } from '@/lib/syntax-highlight'
import { cn } from '@/lib/utils'

export type EditorReveal = { start: number; end: number }

const GUTTER_WIDTH = 'w-11'
const LINE_HEIGHT = 20

/**
 * Dependency-free syntax-highlighted editor: a transparent <textarea> floats
 * over a highlighted <pre> in the same scroll container, with a line-number
 * gutter kept in sync on scroll.
 */
export function HighlightedEditor({
  value,
  onChange,
  path,
  disabled = false,
  reveal,
  className,
}: {
  value: string
  onChange?: (value: string) => void
  path: string
  disabled?: boolean
  reveal?: EditorReveal | null
  className?: string
}) {
  const html = useMemo(() => highlightCodeForPath(value, path) || '&nbsp;', [value, path])
  const lineCount = useMemo(() => (value ? value.split('\n').length : 1), [value])
  const scrollRef = useRef<HTMLDivElement>(null)
  const gutterRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const syncScroll = () => {
    if (gutterRef.current && scrollRef.current) {
      gutterRef.current.scrollTop = scrollRef.current.scrollTop
    }
  }

  useEffect(() => {
    if (!gutterRef.current || !scrollRef.current) return
    gutterRef.current.scrollTop = scrollRef.current.scrollTop
  })

  useEffect(() => {
    if (!reveal || !textareaRef.current || !scrollRef.current) return
    const textarea = textareaRef.current
    textarea.focus()
    textarea.setSelectionRange(reveal.start, reveal.end)
    const line = value.slice(0, reveal.start).split('\n').length
    scrollRef.current.scrollTop = Math.max(0, (line - 1) * LINE_HEIGHT - 48)
  }, [reveal, value])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== 'Tab') return
    event.preventDefault()
    const target = event.currentTarget
    const { selectionStart, selectionEnd, value: current } = target
    const next = `${current.slice(0, selectionStart)}  ${current.slice(selectionEnd)}`
    onChange?.(next)
    requestAnimationFrame(() => {
      target.setSelectionRange(selectionStart + 2, selectionStart + 2)
    })
  }

  const gutterLines = Array.from({ length: lineCount }, (_, index) => (
    <div className="pr-2.5" key={index}>
      {index + 1}
    </div>
  ))

  return (
    <div className={cn('flex h-full min-h-0 bg-background', className)}>
      <div
        aria-hidden
        className={cn(
          'shrink-0 overflow-hidden border-r border-border/70 bg-muted/20 py-4 text-right font-mono text-[11px] leading-5 text-muted-foreground/70 select-none',
          GUTTER_WIDTH,
        )}
        ref={gutterRef}
      >
        {gutterLines}
      </div>
      <div className="relative min-w-0 flex-1 overflow-auto" onScroll={syncScroll} ref={scrollRef}>
        <pre
          aria-hidden
          className="pointer-events-none absolute top-0 left-0 z-0 h-max w-max min-w-full min-h-full p-4 font-mono text-xs leading-5 whitespace-pre"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <textarea
          aria-label={`Edit ${path}`}
          className="absolute top-0 left-0 z-10 h-max w-max min-w-full min-h-full resize-none overflow-hidden bg-transparent p-4 font-mono text-xs leading-5 whitespace-pre text-transparent caret-foreground outline-none selection:bg-primary/25"
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.value)}
          onKeyDown={handleKeyDown}
          ref={textareaRef}
          spellCheck={false}
          value={value}
        />
      </div>
    </div>
  )
}