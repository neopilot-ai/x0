'use client'

import { useMemo } from 'react'
import { diffLines } from '@/lib/diff'
import { cn } from '@/lib/utils'

export function DiffView({ original, modified }: { original: string; modified: string }) {
  const ops = useMemo(() => diffLines(original, modified), [original, modified])
  const changeCount = useMemo(
    () => ops.filter((op) => op.kind === 'add' || op.kind === 'remove').length,
    [ops],
  )

  if (changeCount === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No changes
      </div>
    )
  }

  return (
    <div className="min-h-0 flex-1 overflow-auto bg-background">
      <table className="w-full border-collapse font-mono text-xs leading-5">
        <tbody>
          {ops.map((op, index) => (
            <tr
              className={cn(
                op.kind === 'add' && 'bg-emerald-500/[0.08]',
                op.kind === 'remove' && 'bg-red-500/[0.08]',
              )}
              key={index}
            >
              <td className="w-10 shrink-0 border-r border-border/60 py-px pr-2 text-right select-none text-muted-foreground/60">
                {op.oldNumber ?? ''}
              </td>
              <td className="w-10 shrink-0 border-r border-border/60 py-px pr-2 text-right select-none text-muted-foreground/60">
                {op.newNumber ?? ''}
              </td>
              <td
                className={cn(
                  'w-6 shrink-0 py-px pl-2 pr-1 text-center select-none',
                  op.kind === 'add' && 'text-emerald-600 dark:text-emerald-400',
                  op.kind === 'remove' && 'text-red-600 dark:text-red-400',
                  op.kind === 'context' && 'text-muted-foreground/50',
                )}
              >
                {op.kind === 'add' ? '+' : op.kind === 'remove' ? '−' : ''}
              </td>
              <td
                className={cn(
                  'whitespace-pre py-px pr-4',
                  op.kind === 'add' && 'text-emerald-700 dark:text-emerald-300',
                  op.kind === 'remove' && 'text-red-600 dark:text-red-400/90 line-through',
                  op.kind === 'context' && 'text-muted-foreground',
                )}
              >
                {op.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}