export type PreviewToken = string

export interface V0SandboxPreview {
  url: string
  token: PreviewToken
  expiresAt: Date
}

export interface V0SandboxOptions {
  fallbackUrl: string | URL
  path?: string | string[]
  onPreviewRefresh?: () => void | Promise<void>
}

export interface V0Sandbox {
  chatId: string
  preview: V0SandboxPreview | null
  getPreview(): Promise<V0SandboxPreview | null>
  refresh(): Promise<void>
  isReady(): boolean
}

export interface SandboxConfig {
  chatId: string
  previewHosts: string[]
  autoRefresh?: boolean
  refreshInterval?: number
}

export interface PreviewState {
  status: 'loading' | 'ready' | 'refreshing' | 'error' | 'expired'
  preview: V0SandboxPreview | null
  error?: Error
}

export async function getSandboxPreview(
  v0: {
    chats: {
      getPreview: (params: {
        chatId: string
      }) => Promise<{ data?: V0SandboxPreview; error?: Error }>
    }
  },
  chatId: string,
): Promise<V0SandboxPreview | null> {
  const result = await v0.chats.getPreview({ chatId })
  return result.data ?? null
}

export function createSandbox(
  v0: {
    chats: {
      getPreview: (params: {
        chatId: string
      }) => Promise<{ data?: V0SandboxPreview; error?: Error }>
    }
  },
  chatId: string,
): V0Sandbox {
  let preview: V0SandboxPreview | null = null
  let state: PreviewState = { status: 'loading', preview: null }

  return {
    chatId,
    preview: null,

    async getPreview() {
      preview = await getSandboxPreview(v0, chatId)
      state = {
        status: preview ? 'ready' : 'loading',
        preview,
      }
      return preview
    },

    async refresh() {
      state = { status: 'refreshing', preview }
      preview = await getSandboxPreview(v0, chatId)
      state = {
        status: preview ? 'ready' : 'expired',
        preview,
      }
    },

    isReady() {
      return state.status === 'ready' && preview !== null
    },
  }
}
