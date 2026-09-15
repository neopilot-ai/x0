'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { cn } from '@/lib/utils'

type AppLayoutProps = {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <aside
        className={cn(
          'fixed left-0 top-0 z-20 h-full bg-card border-r border-border transition-width duration-200',
          sidebarOpen ? 'w-64' : 'w-0',
        )}
      >
        <div
          className={cn(
            'flex h-full w-64 flex-col overflow-y-auto',
            !sidebarOpen && 'w-0 overflow-hidden',
          )}
        >
          <Sidebar onToggle={() => setSidebarOpen((open) => !open)} open={sidebarOpen} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
