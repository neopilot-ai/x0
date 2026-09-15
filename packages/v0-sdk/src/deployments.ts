/**
 * Deployment / publish helpers.
 *
 * v0 deploys projects to Vercel: working branches get preview deployments,
 * publishing updates the production deployment. See `/docs/deployments`,
 * `/docs/github`, and `/docs/git-import`.
 *
 * These helpers wrap the generated client with small structural types
 * (same pattern as `sandbox.ts`) so they work with the default `v0`
 * client without importing generated internals.
 */

type ApiResult<D> = Promise<{ data?: D; error?: unknown }>

interface ChatsDeployClient {
  chats: {
    deploy: (params: { chatId: string }) => ApiResult<unknown>
    createVercelProject: (params: { chatId: string; name?: string }) => ApiResult<unknown>
    getPreview: (params: { chatId: string }) => ApiResult<{ url: string } | null>
  }
}

interface ChatsCreateFromRepoClient {
  chats: {
    createFromRepo: (params: {
      repo: { url: string; branch?: string }
      privacy?: 'public' | 'private' | 'team' | 'team-edit' | 'unlisted'
      title?: string
    }) => ApiResult<{ chat?: { id: string } }>
  }
}

/** Trigger a Vercel production deployment for a chat (Publish). */
export async function publishChat(
  v0: ChatsDeployClient,
  chatId: string,
): Promise<{ ok: boolean; error?: unknown }> {
  const result = await v0.chats.deploy({ chatId })
  if (result.error !== undefined) return { ok: false, error: result.error }
  return { ok: true }
}

/** Create a Vercel project and attach it to the chat (first-publish setup). */
export async function createVercelProjectForChat(
  v0: ChatsDeployClient,
  chatId: string,
  name?: string,
): Promise<{ ok: boolean; error?: unknown }> {
  const result = await v0.chats.createVercelProject({ chatId, name })
  if (result.error !== undefined) return { ok: false, error: result.error }
  return { ok: true }
}

/**
 * Poll the preview endpoint until a preview URL is available.
 * Returns null after `maxAttempts` with `intervalMs` between polls.
 */
export async function waitForPreview(
  v0: ChatsDeployClient,
  chatId: string,
  options?: { maxAttempts?: number; intervalMs?: number },
): Promise<string | null> {
  const maxAttempts = options?.maxAttempts ?? 30
  const intervalMs = options?.intervalMs ?? 2000
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await v0.chats.getPreview({ chatId })
    const url = result.data && typeof result.data === 'object' && 'url' in result.data
      ? (result.data as { url: string }).url
      : null
    if (url) return url
    await new Promise((resolve) => setTimeout(resolve, intervalMs))
  }
  return null
}

/**
 * Import a GitHub repository as a new chat (Import from GitHub).
 * Returns the created chat id, or an error.
 */
export async function importRepoAsChat(
  v0: ChatsCreateFromRepoClient,
  repo: { url: string; branch?: string },
  options?: { privacy?: 'public' | 'private' | 'team' | 'team-edit' | 'unlisted'; title?: string },
): Promise<{ chatId: string } | { error: unknown }> {
  const result = await v0.chats.createFromRepo({
    repo,
    privacy: options?.privacy ?? 'private',
    title: options?.title,
  })
  if (result.error !== undefined) return { error: result.error }
  const chatId = result.data?.chat?.id
  if (!chatId) return { error: new Error('createFromRepo returned no chat id') }
  return { chatId }
}
