import { ToggleWelcome } from '@/components/modals/welcome'
import { VercelDashed } from '@/components/icons/vercel-dashed'
import { SlidersHorizontalIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <VercelDashed className="ml-1 md:ml-2.5 mr-1.5" />
        <span className="hidden md:inline text-sm uppercase font-mono font-bold tracking-tight">
          OSS Vibe Coding Platform
        </span>
      </div>
      <div className="flex items-center ml-auto space-x-1.5">
        <Link href="/settings" className="p-1 hover:bg-accent rounded-md transition-colors">
          <SlidersHorizontalIcon className="size-4 text-muted-foreground" />
        </Link>
        <ToggleWelcome />
      </div>
    </header>
  )
}
