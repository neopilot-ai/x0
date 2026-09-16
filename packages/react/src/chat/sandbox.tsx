import { useCallback, useState, useEffect } from 'react'
import { v0 } from 'v0'

export interface V0SandboxState {
  status: 'loading' | 'ready' | 'refreshing' | 'error' | 'expired'
  previewUrl: string | null
  previewToken: string | null
  error: Error | null
}

export interface V0SandboxOptions {
  chatId: string
  refreshInterval?: number
}

export interface V0SandboxReturn {
  state: V0SandboxState
  refresh: () => Promise<void>
  iframeSandbox: string
  iframeSrc: string | null
}

export function useV0Sandbox(chatId: string, options?: V0SandboxOptions): V0SandboxReturn {
  const [state, setState] = useState<V0SandboxState>({
    status: 'loading',
    previewUrl: null,
    previewToken: null,
    error: null,
  })

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'refreshing' }))
    try {
      const result = await v0.chats.getPreview({ chatId })
      if (result.data) {
        setState({
          status: 'ready',
          previewUrl: result.data.url,
          previewToken: result.data.token,
          error: null,
        })
      } else {
        setState({
          status: 'loading',
          previewUrl: null,
          previewToken: null,
          error: null,
        })
      }
    } catch (error) {
      setState({
        status: 'error',
        previewUrl: null,
        previewToken: null,
        error: error as Error,
      })
    }
  }, [chatId])

  useEffect(() => {
    refresh()
    const interval = options?.refreshInterval
      ? setInterval(refresh, options.refreshInterval)
      : undefined
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [refresh, options?.refreshInterval])

  const iframeSandbox = 'allow-scripts allow-same-origin'
  const iframeSrc = state.previewUrl ? `${state.previewUrl}?token=${state.previewToken}` : null

  return {
    state,
    refresh,
    iframeSandbox,
    iframeSrc,
  }
}

export interface V0SandboxProviderProps {
  chatId: string
  options?: V0SandboxOptions
  children: (props: {
    state: V0SandboxState
    refresh: () => void
    iframeSandbox: string
    iframeSrc: string | null
  }) => React.ReactNode
}

export function V0SandboxProvider({ chatId, options, children }: V0SandboxProviderProps) {
  const sandbox = useV0Sandbox(chatId, options)
  return <>{children({ ...sandbox })}</>
}

export interface V0SandboxPreviewProps {
  chatId: string
  options?: V0SandboxOptions
  fallbackUrl?: string
  className?: string
  style?: React.CSSProperties
}

export function V0SandboxPreview({
  chatId,
  options,
  fallbackUrl = '/loading',
  className,
  style,
}: V0SandboxPreviewProps) {
  const { state, iframeSrc, iframeSandbox, refresh } = useV0Sandbox(chatId, options)

  if (state.status === 'error') {
    return (
      <div className={className} style={style}>
        <p>Preview unavailable.</p>
        <button onClick={() => refresh()}>Retry</button>
      </div>
    )
  }

  if (state.status === 'loading' || state.status === 'refreshing') {
    return (
      <div className={className} style={style}>
        <iframe src={fallbackUrl} sandbox={iframeSandbox} />
      </div>
    )
  }

  return (
    <iframe
      src={iframeSrc ?? fallbackUrl}
      sandbox={iframeSandbox}
      className={className}
      style={style}
    />
  )
}
