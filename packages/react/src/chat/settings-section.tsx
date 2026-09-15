import { type ReactNode } from 'react'

export interface SettingsSectionProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
  headerExtra?: ReactNode
  isLoading?: boolean
  scope?: ReactNode
  className?: string
}

export function SettingsSection({
  title,
  description,
  children,
  footer,
  headerExtra,
  isLoading = false,
  scope,
  className,
}: SettingsSectionProps) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ''}`}>
      <div className="bg-v0-background-100 rounded-lg overflow-hidden border border-v0-gray-200 divide-y divide-v0-gray-200">
        <div className="flex sm:gap-4 flex-col items-stretch gap-0">
          <div className="flex-1 flex flex-col gap-5 p-4">
            <div className="flex flex-row items-start justify-between gap-2">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-5 w-full max-w-md" />
                  </>
                ) : (
                  <div className="flex flex-col gap-1">
                    <label className="text-heading-16 font-medium text-v0-gray-1000">
                      {title}
                    </label>
                    <p className="text-label-14 text-v0-gray-900 text-pretty">
                      {description}
                    </p>
                  </div>
                )}
              </div>
              {!isLoading && headerExtra && (
                <div className="shrink-0">{headerExtra}</div>
              )}
              {!isLoading && !headerExtra && <div className="shrink-0" />}
            </div>
            {isLoading ? (
              <Skeleton className="h-[120px] w-full" />
            ) : (
              children
            )}
          </div>
          <div className="flex items-center gap-2 justify-between bg-v0-background-200 w-full border-t border-v0-gray-200! h-14 px-3">
            <div className="flex min-w-0 items-center gap-2">
              {isLoading ? <Skeleton className="h-8 w-24" /> : scope}
            </div>
            <div className="ml-auto flex items-center gap-2">
              {isLoading ? <Skeleton className="h-8 w-16" /> : footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-v0-gray-200 rounded-md ${className}`}
    />
  )
}

export function SettingsSectionContent({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>
}
