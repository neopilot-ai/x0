'use client'

import { useState, useCallback, useEffect, useTransition } from 'react'
import {
  getAgentPermissions,
  setAgentPermissions,
} from 'v0'
import {
  getNetworkPolicy,
  setNetworkPolicy,
} from 'v0/sandbox'

export type PermissionMode = 'ask' | 'auto' | 'full'

export interface AgentPermissionsState {
  mode: PermissionMode
  rules: Array<{ pattern: string; type: string }>
  scope: 'user' | 'team'
}

export interface NetworkPolicyState {
  policy: string
  scope: 'user' | 'team'
  customPatterns: string[]
  allowLocalhost: boolean
  allowPreviewDomain: boolean
}

export interface CustomInstructionsState {
  instructions: string
  isDirty: boolean
}

export interface AdvancedSettingsData {
  agentPermissions: AgentPermissionsState
  networkPolicy: NetworkPolicyState
  customInstructions: CustomInstructionsState
}

interface UseAdvancedSettingsReturn {
  data: AdvancedSettingsData
  isLoading: boolean
  isSaving: boolean
  error: Error | null
  updateAgentPermissions: (updates: Partial<AgentPermissionsState>) => Promise<void>
  updateNetworkPolicy: (updates: Partial<NetworkPolicyState>) => Promise<void>
  updateCustomInstructions: (instructions: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useAdvancedSettings(): UseAdvancedSettingsReturn {
  const [data, setData] = useState<AdvancedSettingsData>({
    agentPermissions: {
      mode: 'ask',
      rules: [],
      scope: 'user',
    },
    networkPolicy: {
      policy: '',
      scope: 'team',
      customPatterns: [],
      allowLocalhost: false,
      allowPreviewDomain: true,
    },
    customInstructions: {
      instructions: '',
      isDirty: false,
    },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, startSaving] = useTransition()
  const [error, setError] = useState<Error | null>(null)

  const refresh = useCallback(async () => {
    try {
      setIsLoading(true)
      const [perms, policy] = await Promise.all([
        Promise.resolve(getAgentPermissions()),
        Promise.resolve(getNetworkPolicy('')),
      ])

      setData(prev => ({
        ...prev,
        agentPermissions: {
          ...prev.agentPermissions,
          ...perms,
        },
        networkPolicy: {
          ...prev.networkPolicy,
          policy,
          scope: 'team',
          customPatterns: [],
          allowLocalhost: false,
          allowPreviewDomain: true,
        },
      }))
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const updateAgentPermissions = useCallback(async (updates: Partial<AgentPermissionsState>) => {
    startSaving(async () => {
      try {
        const next = { ...data.agentPermissions, ...updates }
        await setAgentPermissions(next)
        setData(prev => ({
          ...prev,
          agentPermissions: next,
        }))
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    })
  }, [data.agentPermissions])

  const updateNetworkPolicy = useCallback(async (updates: Partial<NetworkPolicyState>) => {
    startSaving(async () => {
      try {
        const next = { ...data.networkPolicy, ...updates }
        await setNetworkPolicy('', next.policy)
        setData(prev => ({
          ...prev,
          networkPolicy: next,
        }))
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    })
  }, [data.networkPolicy])

  const updateCustomInstructions = useCallback(async (instructions: string) => {
    startSaving(async () => {
      try {
        setData(prev => ({
          ...prev,
          customInstructions: { instructions, isDirty: true },
        }))
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
      }
    })
  }, [])

  return {
    data,
    isLoading,
    isSaving,
    error,
    updateAgentPermissions,
    updateNetworkPolicy,
    updateCustomInstructions,
    refresh,
  }
}

function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-v0-gray-200 rounded-md ${className}`}
    />
  )
}

function SectionHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-heading-16 font-medium text-v0-gray-1000">
        {title}
      </label>
      <p className="text-label-14 text-v0-gray-900 text-pretty">
        {description}
      </p>
    </div>
  )
}

function ScopeSelector({
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
      aria-label={`${label} scope`}
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

export function AgentPermissionsSection({
  permissions,
  onChange,
  isLoading,
}: {
  permissions: AgentPermissionsState
  onChange: (updates: Partial<AgentPermissionsState>) => Promise<void>
  isLoading: boolean
}) {
  return (
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
                <SectionHeader
                  title="Agent Permissions"
                  description="Control which actions v0 can take automatically, which require approval, and which are blocked."
                />
              )}
            </div>
          </div>
          <div className="rounded-md animate-pulse bg-v0-gray-200 h-[120px] w-full" />
        </div>
        <div className="flex items-center gap-2 justify-between bg-v0-background-200 w-full border-t border-v0-gray-200 h-14 px-3">
          <div className="flex min-w-0 items-center gap-2">
            {!isLoading && (
              <ScopeSelector
                value={permissions.scope}
                onChange={(scope) => onChange({ scope: scope as 'user' | 'team' })}
                label="Permissions scope"
              />
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SandboxNetworkPolicySection({
  policy,
  onChange,
  isLoading,
}: {
  policy: NetworkPolicyState
  onChange: (updates: Partial<NetworkPolicyState>) => Promise<void>
  isLoading: boolean
}) {
  return (
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
                <SectionHeader
                  title="Sandbox Network Policy"
                  description="Configure the domains and host patterns that v0 can access."
                />
              )}
            </div>
            {!isLoading && (
              <div className="rounded-md animate-pulse bg-v0-gray-200 h-7 w-24 shrink-0" />
            )}
          </div>
          <div className="rounded-md animate-pulse bg-v0-gray-200 h-[120px] w-full" />
        </div>
        <div className="flex items-center gap-2 justify-between bg-v0-background-200 w-full border-t border-v0-gray-200 h-14 px-3">
          <div className="flex min-w-0 items-center gap-2">
            {!isLoading && (
              <ScopeSelector
                value={policy.scope}
                onChange={(scope) => onChange({ scope: scope as 'user' | 'team' })}
                label="Network policy scope"
              />
            )}
          </div>
          <div className="ml-auto flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CustomInstructionsSection({
  instructions,
  onChange,
  isLoading,
}: {
  instructions: CustomInstructionsState
  onChange: (instructions: string) => Promise<void>
  isLoading: boolean
}) {
  return (
    <div className="bg-v0-background-100 rounded-lg overflow-hidden border border-v0-gray-200 divide-y divide-v0-gray-200">
      <div className="flex sm:gap-4 flex-col items-stretch gap-0">
        <form className="flex flex-col w-full">
          <div className="flex-1 flex flex-col gap-5 p-4">
            <div className="flex flex-row items-start justify-between gap-2">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-5 w-full max-w-md" />
                  </>
                ) : (
                  <SectionHeader
                    title="Custom Instructions"
                    description="Manage your custom user rules or preferences for the LLM."
                  />
                )}
              </div>
              {!isLoading && (
                <div className="rounded-md animate-pulse bg-v0-gray-200 h-7 w-24 shrink-0" />
              )}
            </div>
            {isLoading ? (
              <Skeleton className="h-[120px] w-full" />
            ) : (
              <textarea
                className="rounded-md border border-v0-gray-200 bg-v0-background-200 p-3 text-sm text-v0-gray-1000 placeholder:text-v0-gray-500 focus:outline-none focus:ring-2 focus:ring-v0-blue-800 min-h-[120px] w-full resize-none"
                placeholder="Enter custom instructions..."
                value={instructions.instructions}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          </div>
          <div className="flex items-center gap-2 justify-between bg-v0-background-200 w-full border-t border-v0-gray-200 h-14 px-3">
            <div className="flex min-w-0 items-center gap-2" />
            <div className="ml-auto flex items-center gap-2">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <button
                  className="focus-visible:ring-offset-background outline-hidden has-focus-visible:ring-2 inline-flex shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap text-nowrap font-medium ring-v0-caveat-focus-ring-tab transition focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:ring-0 aria-disabled:cursor-not-allowed aria-disabled:ring-0 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-v0-alpha-400 focus-visible:bg-v0-alpha-400 border-transparent bg-transparent text-v0-gray-1000 hover:border-transparent focus:border-transparent focus-visible:border-transparent disabled:border-transparent disabled:bg-transparent disabled:text-v0-gray-500 aria-disabled:border-transparent aria-disabled:bg-transparent aria-disabled:text-v0-gray-500 h-8 text-sm has-[&gt;kbd]:gap-2 has-[&gt;svg]:px-2 has-[&gt;kbd]:pr-[6px] rounded-md px-2 font-medium border"
                  type="button"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

interface AdvancedSettingsProps {
  className?: string
}

export function AdvancedSettings({ className }: AdvancedSettingsProps) {
  const { data, isLoading, isSaving, error, updateAgentPermissions, updateNetworkPolicy, updateCustomInstructions, refresh } = useAdvancedSettings()

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <div className="bg-v0-background-100 rounded-lg overflow-hidden border border-v0-gray-200 divide-y divide-v0-gray-200 p-4">
          <p className="text-v0-gray-900">Error loading settings</p>
          <button
            onClick={() => refresh()}
            className="text-v0-blue-800 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={className} data-saving={isSaving}>
      <AgentPermissionsSection
        permissions={data.agentPermissions}
        onChange={updateAgentPermissions}
        isLoading={isLoading}
      />
      <div className="flex flex-col gap-2 mt-4">
        <SandboxNetworkPolicySection
          policy={data.networkPolicy}
          onChange={updateNetworkPolicy}
          isLoading={isLoading}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <CustomInstructionsSection
          instructions={data.customInstructions}
          onChange={updateCustomInstructions}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
