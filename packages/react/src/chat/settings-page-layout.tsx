'use client'

import { type ReactNode } from 'react'

export interface SettingsPageLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  header?: ReactNode
  className?: string
}

export function SettingsPageLayout({
  children,
  sidebar,
  header,
  className,
}: SettingsPageLayoutProps) {
  return (
    <div className={`@container/page-layout relative flex size-full min-h-0 flex-col ${className ?? ''}`}>
      {header}
      <div className="isolate flex min-h-0 flex-1">
        {sidebar && (
          <aside className="sticky top-0 hidden origin-left sm:block sidebar peer" style={{ padding: 0, zIndex: 60, width: 250 }}>
            {sidebar}
          </aside>
        )}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <main className="relative mt-0 flex-1 grow overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export interface SettingsSidebarProps {
  children: ReactNode
  collapsed?: boolean
}

export function SettingsSidebar({ children, collapsed }: SettingsSidebarProps) {
  return (
    <aside
      data-sidebar-wrapper="true"
      data-sidebar-peek-only-resolved="true"
      className="sticky top-0 hidden origin-left sm:block sidebar peer"
      style={{
        padding: 0,
        zIndex: 60,
        width: 250,
        transitionProperty: 'width, padding',
        transitionDuration: '0ms',
        transitionTimingFunction: 'cubic-bezier(0.31, 0.1, 0.08, 0.96)',
        transitionDelay: '0ms',
        willChange: 'width, padding',
      }}
    >
      <aside
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className="group/sidebar relative z-20 flex h-full flex-col hairline-r bg-v0-background-200"
        style={
          {
            '--sidebar-width': '250px',
            width: 250,
            transform: 'translateX(0px)',
            transitionProperty: 'opacity, transform, border-color, background, box-shadow',
            transitionDuration: '0ms',
            transitionTimingFunction: 'cubic-bezier(0.31, 0.1, 0.08, 0.96)',
            transitionDelay: '0ms',
            willChange: 'border-color, background',
          } as React.CSSProperties
        }
      >
        {children}
      </aside>
    </aside>
  )
}

export function SettingsSidebarContent({ children }: { children: ReactNode }) {
  return (
    <div
      data-sidebar-content="true"
      className="flex min-h-0 flex-1 flex-col gap-2 border-y border-transparent transition-[border-color] overflow-x-hidden overflow-y-auto pt-6 pt-0!"
    >
      {children}
    </div>
  )
}

export function SettingsSidebarSection({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-fit w-full flex-col gap-4">
      <div className="absolute inset-x-0 top-0 h-px w-full" />
      {children}
      <div className="absolute inset-x-0 bottom-0 h-px w-full" />
    </div>
  )
}

export function SettingsNavGroup({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-0.5">
      <p className="pb-1 px-1 text-label-12 font-medium text-v0-gray-600 uppercase">
        {title}
      </p>
      <ul className="flex w-full min-w-0 flex-col gap-1.5 gap-0.5!">
        {children}
      </ul>
    </div>
  )
}

export function SettingsNavItem({
  href,
  icon,
  label,
  current,
  disabled,
}: {
  href: string
  icon: ReactNode
  label: string
  current?: boolean
  disabled?: boolean
}) {
  return (
    <li
      className={`hover:bg-v0-gray-200 has-data-[current=true]:bg-v0-gray-200 has-data-[state=open]:bg-v0-gray-200 focus-within:bg-v0-gray-200 active:bg-v0-gray-200 group relative flex h-8 list-none items-center rounded-md text-v0-gray-900 has-[button:disabled]:pointer-events-none has-[button:disabled]:opacity-50 ${disabled ? 'opacity-50 hover:bg-transparent! focus-within:bg-transparent! active:bg-transparent!' : ''}`}
    >
      <a
        className="focus-visible:ring-offset-background rounded-md [&amp;_svg]:shrink-0 [&amp;_div]:truncate [&amp;_span]:truncate whitespace-nowrap flex size-full min-w-0 items-center justify-start gap-2 px-2 text-sm font-normal outline-hidden text-gray-600 focus-within:text-gray-900 hover:text-gray-900 focus:text-gray-900 group-hover:text-gray-900 data-[current=true]:text-gray-900 ring-blue-600 focus-visible:ring-2 focus-visible:ring-offset-1 cursor-default"
        data-current={current ? true : false}
        href={href}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  )
}

export function SettingsHeader({
  breadcrumb,
  logo,
  actions,
  collapsed,
  onToggleSidebar,
}: {
  breadcrumb: ReactNode
  logo?: ReactNode
  actions?: ReactNode
  collapsed?: boolean
  onToggleSidebar?: () => void
}) {
  return (
    <header className="flex shrink-0 flex-col absolute inset-x-0 top-0 z-10 w-full border-t transition-colors sm:border-b sm:border-t-0 pointer-events-none border-transparent bg-transparent">
      <div className="relative shrink-0 items-center gap-3 pl-4 pr-3 sm:pl-3 sm:pr-2 sm:mx-0 hidden sm:flex h-[50px] hairline-b bg-v0-background-200">
        {onToggleSidebar && (
          <button
            className="focus-visible:ring-offset-background outline-hidden has-focus-visible:ring-2 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border font-medium ring-v0-caveat-focus-ring-tab transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:ring-0 aria-disabled:cursor-not-allowed aria-disabled:ring-0 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 border-transparent bg-transparent hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500 px-3 text-sm has-[&gt;kbd]:gap-2 has-[&gt;svg]:px-2 has-[&gt;kbd]:pr-[6px] *:grid-stack group size-8 place-items-center rounded-md sm:grid! text-v0-gray-900 hover:text-v0-gray-1000 focus-visible:text-v0-gray-1000 pointer-events-auto hidden shrink-0 sm:flex"
            aria-label="Collapse Sidebar"
            data-state={collapsed ? 'closed' : 'open'}
            onClick={onToggleSidebar}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-opacity duration-150 group-hover:opacity-0">
              <path d="M15.25 11.5C15.25 13.5711 13.5711 15.25 11.5 15.25H4.5C2.42893 15.25 0.75 13.5711 0.75 11.5V4.5C0.75 2.42893 2.42893 0.75 4.5 0.75H11.5C13.5711 0.75 15.25 2.42893 15.25 4.5V11.5ZM13.75 4.5C13.75 3.25736 12.7426 2.25 11.5 2.25H4.5C3.25736 2.25 2.25 3.25736 2.25 4.5V11.5C2.25 12.7426 3.25736 13.75 4.5 13.75H11.5C12.7426 13.75 13.75 12.7426 13.75 11.5V4.5ZM6.25 11.5C6.25 11.9142 5.91421 12.25 5.5 12.25C5.08579 12.25 4.75 11.9142 4.75 11.5V4.5C4.75 4.08579 5.08579 3.75 5.5 3.75C5.91421 3.75 6.25 4.08579 6.25 4.5V11.5Z" fill="currentColor" />
            </svg>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              <path d="M15.25 11.5C15.25 13.5711 13.5711 15.25 11.5 15.25H4.5C2.42893 15.25 0.75 13.5711 0.75 11.5V4.5C0.75 2.42893 2.42893 0.75 4.5 0.75H11.5C13.5711 0.75 15.25 2.42893 15.25 4.5V11.5ZM13.75 4.5C13.75 3.25736 12.7426 2.25 11.5 2.25H4.5C3.25736 2.25 2.25 3.25736 2.25 4.5V11.5C2.25 12.7426 3.25736 13.75 4.5 13.75H11.5C12.7426 13.75 13.75 12.7426 13.75 11.5V4.5ZM7.15137 11.1279C7.35679 11.4876 7.23167 11.9459 6.87207 12.1514C6.51245 12.3568 6.05412 12.2317 5.84863 11.8721L4.69922 9.86035C4.04057 8.70757 4.04057 7.29243 4.69922 6.13965L5.84863 4.12793C6.05412 3.76833 6.51245 3.64321 6.87207 3.84863C7.23167 4.05412 7.35679 4.51245 7.15137 4.87207L6.00195 6.88379C5.60668 7.57551 5.60668 8.42449 6.00195 9.11621L7.15137 11.1279Z" fill="currentColor" />
            </svg>
          </button>
        )}
        {logo && (
          <div className="group/sidebar-logo-toggle relative mr-1 hidden sm:flex">
            {logo}
          </div>
        )}
        <div className="flex min-w-0 flex-1 items-center empty:hidden sm:ml-2 -ml-1.5" />
        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-none grid h-[50px] w-full shrink-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center hairline-b">
            <div className="pointer-events-auto min-w-0 justify-self-start pl-2">
              <nav aria-label="breadcrumb" data-slot="breadcrumb">
                <ol data-slot="breadcrumb-list" className="text-v0-gray-900 flex items-center text-sm break-words flex-nowrap gap-0">
                  {breadcrumb}
                </ol>
              </nav>
            </div>
            <div className="pointer-events-auto min-w-0 justify-self-end pr-2">
              {actions}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export function SettingsBreadcrumb({
  items,
}: {
  items: Array<{ label: string; current?: boolean }>
}) {
  return items.map((item, i) => (
    <li key={i} data-slot="breadcrumb-item" className="inline-flex items-center gap-1.5 min-w-0">
      <span
        data-slot="breadcrumb-page"
        role="link"
        aria-disabled={item.current ? true : undefined}
        aria-current={item.current ? 'page' : undefined}
        className="text-v0-gray-1000 truncate font-medium"
      >
        {item.label}
      </span>
    </li>
  ))
}

export function SettingsLogo() {
  return (
    <a
      data-testid="header-logo"
      className="focus-visible:ring-offset-background outline-hidden has-focus-visible:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap font-medium ring-v0-caveat-focus-ring-tab focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:ring-0 aria-disabled:cursor-not-allowed aria-disabled:ring-0 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:shrink-0 hover:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 border-transparent bg-transparent text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500 px-3 text-sm has-[&gt;kbd]:gap-2 has-[&gt;kbd]:pr-[6px] size-8 w-auto rounded-md py-1.5 has-[&gt;svg]:px-1 [&amp;&gt;svg]:size-7 border-0 transition-opacity duration-150 ease-[cubic-bezier(0.31,0.1,0.08,0.96)] group-hover/sidebar-logo-toggle:pointer-events-none group-hover/sidebar-logo-toggle:opacity-0 group-focus-within/sidebar-logo-toggle:pointer-events-none group-focus-within/sidebar-logo-toggle:opacity-0"
      href="/"
    >
      <svg fill="currentColor" height="20" viewBox="0 0 147 70" width="42" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-10">
        <path d="M56 50.2031V14H70V60.1562C70 65.5928 65.5928 70 60.1562 70C57.5605 70 54.9982 68.9992 53.1562 67.1573L0 14H19.7969L56 50.2031Z" />
        <path d="M147 56H133V23.9531L100.953 56H133V70H96.6875C85.8144 70 77 61.1856 77 50.3125V14H91V46.1562L123.156 14H91V0H127.312C138.186 0 147 8.81439 147 19.6875V56Z" />
      </svg>
      <span className="sr-only">New Chat</span>
    </a>
  )
}

export function SettingsScopeSelector({
  value,
  onChange,
  label,
}: {
  value: string
  onChange: (value: string) => void
  label: string
}) {
  return (
    <button
      className="focus-visible:ring-offset-background outline-hidden has-focus-visible:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border ring-v0-caveat-focus-ring-tab transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:ring-0 aria-disabled:cursor-not-allowed aria-disabled:ring-0 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 border-transparent bg-transparent text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500 h-8 text-sm has-[&gt;kbd]:gap-2 has-[&gt;svg]:px-2 has-[&gt;kbd]:pr-[6px] rounded-md px-2 font-medium border"
      aria-label={label}
      type="button"
      onClick={() => {
        const next = value === 'user' ? 'team' : 'user'
        onChange(next)
      }}
    >
      {value}
      <svg
        viewBox="0 0 16 16"
        height="16"
        width="16"
        data-slot="geist-icon"
        style={{ color: 'currentColor' }}
        className="size-4 text-v0-gray-900"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M8.7 2.4a1 1 0 0 0-1.4 0L4.46 5.22l-.53.53L5 6.81l.53-.53L8 3.81l2.47 2.47.53.53 1.06-1.06-.53-.53zM5.54 9.72 5 9.19l-1.06 1.06.53.53 2.82 2.82a1 1 0 0 0 1.42 0l2.82-2.82.53-.53L11 9.19l-.53.53L8 12.19z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

export function SettingsActionButton({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      className="focus-visible:ring-offset-background outline-hidden has-focus-visible:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap border font-medium ring-v0-caveat-focus-ring-tab transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:ring-0 aria-disabled:cursor-not-allowed aria-disabled:ring-0 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 border-transparent bg-transparent text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500 px-3 text-sm has-[&gt;kbd]:gap-2 has-[&gt;svg]:px-2 has-[&gt;kbd]:pr-[6px] size-7 rounded-md sm:hidden flex flex-row items-center gap-2.5"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
