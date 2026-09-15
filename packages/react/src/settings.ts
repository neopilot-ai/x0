import { useState, useCallback } from 'react'
import { v0 } from 'v0'

export interface PreviewHostConfig {
  hosts: string[]
}

export interface UsePreviewHostsReturn {
  hosts: string[]
  setHosts: (hosts: string[]) => Promise<void>
  addHost: (host: string) => Promise<void>
  removeHost: (host: string) => Promise<void>
  isLoading: boolean
  error: Error | null
}

export function usePreviewHosts(): UsePreviewHostsReturn {
  const [hosts, setHostsState] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const setHosts = useCallback(async (newHosts: string[]) => {
    setIsLoading(true)
    try {
      await v0.settings.setPreviewHosts({ hosts: newHosts })
      setHostsState(newHosts)
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addHost = useCallback(async (host: string) => {
    if (hosts.includes(host)) return
    await setHosts([...hosts, host])
  }, [hosts])

  const removeHost = useCallback(async (host: string) => {
    const newHosts = hosts.filter((h) => h !== host)
    await setHosts(newHosts)
  }, [hosts])

  return {
    hosts,
    setHosts,
    addHost,
    removeHost,
    isLoading,
    error,
  }
}

export interface TrustHost {
  hostname: string
  pattern: string
}

export interface TrustHostConfig {
  allowLocalhost: boolean
  allowPreviewDomain: boolean
  customPatterns: string[]
}

export const defaultTrustHostConfig: TrustHostConfig = {
  allowLocalhost: false,
  allowPreviewDomain: true,
  customPatterns: [],
}

export interface PreviewProxyConfig {
  fallbackUrl: string
  path?: string | string[]
  onPreviewRefresh?: () => void
}
