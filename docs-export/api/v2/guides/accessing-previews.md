---
title: Accessing Previews
description: Display a v0 chat preview in your application
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/custom-chat-interface
  - /docs/api/v2/reference/chats/get-preview-url
  - /docs/api/v2/reference/settings/set-trusted-preview-hosts
---

# Accessing Previews

Use [`chats.getPreview`](/docs/api/v2/reference/chats/get-preview-url) to display the live preview for a chat in your own product.

Preview access is designed to go through your backend. The API returns a preview URL and a short-lived preview token. Browsers cannot attach that token as a custom header when loading an iframe, so point the iframe at a proxy that you control instead of directly at the preview URL. Run this proxy on a preview-only origin whose site is different from your host application.

A complete preview proxy has four parts:

1. A backend helper that gets and caches preview details, then calls `fetchPreview`.
2. A catch-all route that handles document, asset, navigation, and in-app requests.
3. A loading route that retries while a preview is starting or restarting.
4. A framework-level proxy that routes root-relative requests, such as `/_next/static/...`, through the catch-all route.

## Trust the preview hostname

Before embedding a preview, add the hostname of the isolated preview proxy to your team's trusted preview hosts. Previews will not work correctly without this.

```typescript
import { v0 } from 'v0'

const result = await v0.settings.setPreviewHosts({
  hosts: ['preview.example-preview.com'],
})

if (result.error) throw new Error(result.error.message)
```

## Set up the proxy

### 1. Fetch and cache the preview

The SDK's `fetchPreview` helper forwards the request to the preview URL with the short-lived `x-v0-preview-token` header. The token is valid until `expiresAt`, so you can cache the preview URL and token until then.

`fetchPreview` handles stale preview responses for you. When v0 adds `x-v0-preview-refresh: 1` to a response, the helper reads the header, calls the `onPreviewRefresh` callback you provide, and redirects to `fallbackUrl`. You do not need to inspect the response header yourself. Use `onPreviewRefresh` to clear your cached preview details, and see [Step 3](#3-add-a-loading-route) to implement the fallback loading route.

The following example uses an in-memory cache for clarity. Use Redis or another shared cache in production so preview details are available across instances.

```typescript
// lib/preview.ts
import { fetchPreview, v0, type ChatsGetPreviewResponse } from 'v0'

type Preview = NonNullable<ChatsGetPreviewResponse>

const previewCache = new Map<string, Preview>()

async function getPreview(chatId: string) {
  const cached = previewCache.get(chatId)
  const now = Date.now()

  if (cached && new Date(cached.expiresAt).getTime() - now > 60_000) {
    return cached
  }

  const response = await v0.chats.getPreview({ chatId })
  if (response.error) throw new Error(response.error.message)

  const preview = response.data
  if (preview) previewCache.set(chatId, preview)
  else previewCache.delete(chatId)

  return preview
}

export async function proxyPreviewRequest(request: Request, chatId: string, path: string[]) {
  const preview = await getPreview(chatId)
  const fallbackUrl = new URL(`/api/v0-preview/${encodeURIComponent(chatId)}/loading`, request.url)

  return fetchPreview({
    request,
    preview,
    path,
    fallbackUrl,
    onPreviewRefresh: () => {
      previewCache.delete(chatId)
    },
  })
}
```

`fetchPreview` does not call `chats.getPreview`, manage your cache, or authenticate the user. It forwards a request when you pass a preview, redirects to `fallbackUrl` when you pass `null`, and calls `onPreviewRefresh` before redirecting when v0 asks for fresh preview details.

### 2. Add a catch-all preview route

In a Next.js app, create `app/api/v0-preview/[chatId]/[[...path]]/route.ts`. The optional catch-all path lets the same route forward the initial document, relative assets, client-side navigations, API requests, and non-GET requests.

```typescript
// app/api/v0-preview/[chatId]/[[...path]]/route.ts
import { proxyPreviewRequest } from '@/lib/preview'

type RouteContext = {
  params: Promise<{ chatId: string; path?: string[] }>
}

async function handler(request: Request, context: RouteContext) {
  const { chatId, path = [] } = await context.params

  // Authenticate the request and verify that the current user can access
  // chatId before proxying it. Return 401 or 403 when they cannot.

  return proxyPreviewRequest(request, chatId, path)
}

export {
  handler as DELETE,
  handler as GET,
  handler as HEAD,
  handler as OPTIONS,
  handler as PATCH,
  handler as POST,
  handler as PUT,
}
```

<Callout type="warn">
  The preview route is an authenticated application endpoint. `fetchPreview` does not know which users can access a chat. Apply your own authentication and authorization to every proxied request, and never send your v0 API key to the browser or preview URL.
</Callout>

### 3. Add a loading route

When `chats.getPreview` returns `null`, or when v0 reports that cached preview details are stale, `fetchPreview` redirects to `fallbackUrl`. The loading route should render a loading state and retry the chat's preview URL.

```typescript
// app/api/v0-preview/[chatId]/loading/route.ts
export async function GET(_request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const previewPath = `/api/v0-preview/${encodeURIComponent(chatId)}`

  return new Response(
    `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="2;url=${previewPath}" />
  </head>
  <body>Loading preview…</body>
</html>`,
    {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  )
}
```

### 4. Route root-relative requests through the preview

The catch-all route cannot intercept root-relative URLs by itself. For example, HTML returned from the preview may contain:

```html
<script src="/_next/static/chunks/app.js"></script>
```

The browser resolves that URL against the iframe's origin and requests `/_next/static/chunks/app.js`, not `/api/v0-preview/{chatId}/_next/static/chunks/app.js`.

In Next.js, add a root-level `proxy.ts`. It reads the preview route from the request's `Referer` header and redirects the root-relative request through the catch-all route.

```typescript
// proxy.ts
import { NextResponse, type NextRequest } from 'next/server'

const previewPath = /^\/api\/v0-preview\/([^/]+)(?:\/|$)/

export function proxy(request: NextRequest) {
  const referer = request.headers.get('referer')
  if (!referer) return NextResponse.next()
  if (!URL.canParse(referer)) return NextResponse.next()

  const refererUrl = new URL(referer)
  if (refererUrl.origin !== request.nextUrl.origin) {
    return NextResponse.next()
  }

  const chatId = refererUrl.pathname.match(previewPath)?.[1]
  if (!chatId) return NextResponse.next()

  const proxyUrl = request.nextUrl.clone()
  proxyUrl.pathname = `/api/v0-preview/${chatId}${request.nextUrl.pathname}`

  return NextResponse.redirect(proxyUrl, 307)
}

export const config = {
  matcher: '/((?!api/v0-preview/).*)',
}
```

The redirect preserves the request method and query string. The matcher excludes the catch-all route to prevent a redirect loop. This approach depends on the browser sending the preview URL as the `Referer`, so do not set `Referrer-Policy: no-referrer` on the preview document.

## Configure the iframe

The iframe sandbox must include both `allow-scripts` and `allow-same-origin`:

```tsx
<iframe
  src={`https://preview.example-preview.com/api/v0-preview/${encodeURIComponent(chatId)}`}
  sandbox="allow-scripts allow-same-origin"
  title="Chat preview"
/>
```

- `allow-scripts` lets the generated application run JavaScript and hydrate.
- `allow-same-origin` lets the document keep the isolated proxy's origin instead of receiving an opaque origin. This is required for origin-sensitive runtime behavior such as HMR, cookies, and browser storage.

There is no `allow-cross-origin` iframe sandbox token. `allow-same-origin` preserves the isolated proxy origin; it does not make the iframe same-origin with the parent page.

Add other permissions, such as `allow-forms`, `allow-popups`, or `allow-downloads`, only when the applications you preview require them.

## Use an isolated preview origin

Generated previews can execute untrusted code. Deploy the catch-all route, loading route, and `proxy.ts` on a preview-only origin whose registrable domain is different from your host application's registrable domain.

For example, if your application runs at `app.example.com`, do not run the preview proxy at `preview.example.com`. Those hosts have different origins but are still part of the same site and can share cookies scoped to `example.com`. Use a different site, such as `preview.example-preview.com`, for the proxy.

The isolated origin should serve only the preview proxy and its supporting routes. Do not colocate authenticated application endpoints or other sensitive services on it. The `Referer` check in `proxy.ts` is routing logic, not an authorization boundary.

Root-relative requests resolve against `preview.example-preview.com`, so that deployment still needs its own `proxy.ts`. Be sure to add this hostname to the trusted preview hosts setting.

Preview cookies are scoped to the proxy origin because that is the origin the browser sees. To keep proxy credentials out of generated code, `fetchPreview` does not forward incoming `Cookie`, `Authorization`, or proxy authentication headers and removes upstream `Set-Cookie` headers. Preview applications that rely on server-side cookies will need an alternative authentication flow.

<Callout type="warn">
  Do not serve generated previews from your host application's origin or another origin on the same site. Combining `allow-scripts` and `allow-same-origin` with a same-origin iframe allows preview code to access the parent page, while a same-site origin can still receive parent-domain cookies.
</Callout>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
