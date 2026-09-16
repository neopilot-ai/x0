'use client'

import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  FileText,
  BarChart3,
  Folder,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type SidebarProps = {
  open: boolean
  onToggle: () => void
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  return (
    <div className="flex h-full flex-col bg-card">
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-bold text-sm">V</span>
          </div>
          {open && <span className="text-sm font-semibold text-foreground">Vercel v0</span>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground"
          onClick={onToggle}
        >
          {open ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        <SidebarItem icon={<LayoutDashboard className="size-4" />} label="Dashboard" active />
        <SidebarItem icon={<MessageSquare className="size-4" />} label="Chat" />
        <SidebarItem icon={<FileText className="size-4" />} label="Projects" />
        <SidebarItem icon={<Folder className="size-4" />} label="Files" />
        <SidebarItem icon={<BarChart3 className="size-4" />} label="Analytics" />
        <SidebarItem icon={<Users className="size-4" />} label="Team" />
      </nav>

      <div className="border-t border-border p-2">
        <SidebarItem icon={<Settings className="size-4" />} label="Settings" />
      </div>
    </div>
  )
}

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
