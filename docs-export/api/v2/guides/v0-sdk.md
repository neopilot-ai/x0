---
title: v0 SDK
description: TypeScript SDK for the v0 API
product: v0 API
type: guide
related:
  - /docs/api/v2/reference/chats/list-chats
  - /docs/api/v2/guides/integrating-v0-into-agents
  - /docs/api/v2/guides/custom-chat-interface
---

# v0 SDK

The `v0` package is a TypeScript SDK generated from the v0 API OpenAPI schema. It provides type-safe methods for creating chats, sending messages, managing MCP servers, handling webhooks, and more.

## Installation

```bash
npm install v0
# or
pnpm add v0
# or
bun add v0
```

## Authentication

The SDK supports two authentication methods:

### Environment Variable

Set `V0_API_KEY` in your environment. The default client reads it automatically:

```bash
V0_API_KEY=your_api_key_here
```

```ts
import { v0 } from 'v0'

const response = await v0.chats.create({
  message: 'Build me a personal website',
})
```

### Custom Client Configuration

Use `createV0Client` when you need to customize auth, `baseUrl`, or fetch options:

```ts
import { createV0Client } from 'v0'

const v0 = createV0Client({
  auth: process.env.CUSTOM_V0_API_KEY!,
})
```

### Vercel OIDC Auth

For server-side code deployed on Vercel with OIDC enabled, use `vercelOidcAuth`:

```ts
import { createV0Client, vercelOidcAuth } from 'v0'

const v0 = createV0Client({
  auth: vercelOidcAuth(),
})
```

The `vercelOidcAuth` function returns an auth callback that uses the Vercel project-scoped OIDC token. This token can only access resources associated with the Vercel project that minted it.

```ts
import { vercelOidcAuth, type VercelOidcAuthOptions } from 'v0'

// Override token minting
const auth = vercelOidcAuth({
  getToken: () => customToken(),
})
```

## Creating a Client

### Default Client

```ts
import { v0 } from 'v0'

// Uses V0_API_KEY env var or Vercel OIDC auth automatically
const response = await v0.chats.create({
  message: 'Create a todo app',
})
```

### Custom Client

```ts
import { createV0Client } from 'v0'

const v0 = createV0Client({
  auth: process.env.V0_API_KEY!,
  baseUrl: 'https://api.v0.dev',
})
```

## Chat Operations

### Create a Chat (Streaming)

```ts
import { v0 } from 'v0'

const result = await v0.chats.createStream({
  message: 'Build a hello world button',
})

for await (const update of result.stream) {
  console.log(update)
}

console.log(await result.final)
```

The `V0StreamResult` exposes:
- `stream` - An `AsyncIterable<V0StreamUpdate>` of streaming updates
- `final` - A `Promise<V0StreamFinal>` with the completed snapshot
- `toResponse()` - Converts the stream to a `Response` for proxy forwarding

### Create a Chat (Async)

```ts
const result = await v0.chats.createAsync({
  message: 'Build a dashboard',
})
// Returns immediately with chatId and messageId
// Poll until finishReason is non-null
```

### Create a Chat (From Files)

```ts
const result = await v0.chats.createFromFiles({
  files: [
    { name: 'src/App.tsx', content: '...' },
    { name: 'package.json', content: '...' },
  ],
  privacy: 'private',
})
```

### Create a Chat (From Repository)

```ts
const result = await v0.chats.createFromRepo({
  repo: {
    url: 'https://github.com/vercel/next.js',
    branch: 'main',
  },
})
```

### Create a Chat (From ZIP)

```ts
const result = await v0.chats.createFromZip({
  url: 'https://example.com/project.zip',
})
```

### Create a Vercel Project

```ts
await v0.chats.createVercelProject({
  chatId: 'chat_xxx',
  name: 'My Vercel Project',
})
```

### List Chats

```ts
const result = await v0.chats.list({
  limit: 20,
  cursor: '...',
  vercelProjectId: 'proj_xxx',
})
```

### Get a Chat

```ts
const result = await v0.chats.get({ chatId: 'chat_xxx' })
```

### Update a Chat

```ts
await v0.chats.update({
  chatId: 'chat_xxx',
  title: 'New Title',
  privacy: 'team',
})
```

### Update Chat Files

```ts
await v0.chats.updateFiles({
  chatId: 'chat_xxx',
  files: [
    { path: 'app/page.tsx', content: '...' },
    { path: 'old.tsx', content: null }, // Delete
  ],
})
```

### Delete a Chat

```ts
await v0.chats.delete({ chatId: 'chat_xxx' })
```

### Deploy a Chat

```ts
await v0.chats.deploy({ chatId: 'chat_xxx' })
```

### Download Chat Files

```ts
const result = await v0.chats.downloadFiles({ chatId: 'chat_xxx' })
// Returns ZIP archive
```

### Get Preview URL

```ts
const result = await v0.chats.getPreview({ chatId: 'chat_xxx' })
```

### Get Chat Files

```ts
const result = await v0.chats.getFiles({ chatId: 'chat_xxx' })
```

### Get Connect Setup Status

```ts
const result = await v0.chats.getConnectSetupStatus({
  chatId: 'chat_xxx',
  requestId: 'req_xxx',
})
```

### Duplicate a Chat

```ts
const result = await v0.chats.duplicate({
  chatId: 'chat_xxx',
  privacy: 'team',
})
```

### Resume a Chat

```ts
const result = await v0.chats.resume({ chatId: 'chat_xxx' })
```

### Restore a Message

```ts
await v0.chats.restoreMessage({
  chatId: 'chat_xxx',
  messageId: 'msg_xxx',
})
```

## Message Operations

```ts
// Send a message
const result = await v0.messages.send({
  chatId: 'chat_xxx',
  message: 'Add dark mode',
})

// Send async
const result = await v0.messages.sendAsync({ ... })

// Send streaming
const result = await v0.messages.sendStream({ ... })

// Get a message
const result = await v0.messages.get({
  chatId: 'chat_xxx',
  messageId: 'msg_xxx',
})

// List messages
const result = await v0.messages.list({ chatId: 'chat_xxx' })

// Resolve a task
await v0.messages.resolve({ chatId: 'chat_xxx', task: { ... } })

// Resolve async
await v0.messages.resolveAsync({ ... })

// Resolve streaming
const result = await v0.messages.resolveStream({ ... })

// Stop a message
await v0.messages.stop({ chatId: 'chat_xxx', messageId: 'msg_xxx' })
```

## MCP Servers

```ts
await v0.mcpServers.create({
  name: 'Linear',
  url: 'https://mcp.linear.com',
  auth: { type: 'none' },
  scope: 'user',
})

await v0.mcpServers.update({ mcpServerId: 'xxx', name: 'Updated' })
const result = await v0.mcpServers.list()
const result = await v0.mcpServers.get({ mcpServerId: 'xxx' })
await v0.mcpServers.delete({ mcpServerId: 'xxx' })
```

## Settings

```ts
const result = await v0.settings.getPreviewHosts()
await v0.settings.setPreviewHosts({ hosts: ['*.example.com'] })
```

## Usage

```ts
const result = await v0.usage.getSummary({ start: '2024-01-01', end: '2024-01-31' })
const result = await v0.usage.getActivity({ ... })
const result = await v0.usage.listEvents({ ... })
```

## Webhooks

```ts
const result = await v0.webhooks.create({
  name: 'My Webhook',
  events: ['chat.created', 'message.finished'],
  url: 'https://example.com/webhook',
})
const result = await v0.webhooks.list()
const result = await v0.webhooks.get({ hookId: 'xxx' })
await v0.webhooks.update({ hookId: 'xxx', events: [...] })
await v0.webhooks.delete({ hookId: 'xxx' })
```

## Streaming

### Read a Stream from Response

```ts
import { readV0Stream } from 'v0'

const response = await fetch('...')
const result = readV0Stream(response)

for await (const update of result.stream) {
  console.log(update)
}

console.log(await result.final)
```

### Stream Result Interface

```ts
interface V0StreamResult {
  stream: AsyncIterable<V0StreamUpdate>
  final: Promise<V0StreamFinal>
  toResponse(init?: ResponseInit): Response
}
```

### V0StreamUpdate

```ts
interface V0StreamUpdate {
  status: 'streaming'
  event: V0StreamEvent
  chat?: Chat
  message?: Message
  title?: string
  parts: V0StreamParts
  usage?: Message['usage']
}
```

### V0StreamError

```ts
class V0StreamError extends Error {
  readonly code: string | undefined
  readonly id: string | undefined
}
```

## Preview Proxy

For embedding generated previews in iframes, use the `fetchPreview` helper:

```ts
import { fetchPreview } from 'v0'

const response = await fetchPreview({
  request,
  preview: cachedPreview,
  fallbackUrl: '/loading',
  path: ['[...path]'],
  onPreviewRefresh: () => {
    // Clear cache
  },
})
```

## Browser Entry Point

The `v0/browser` entry point provides browser-safe SDK primitives without importing authenticated client or OIDC helpers:

```ts
import { createClient, createConfig, mergeHeaders } from 'v0/browser'
import type { Client, ClientOptions, Options } from 'v0/browser'
import { Chats, Messages, McpServers, Webhooks } from 'v0/browser'
```

## Default Export

```ts
import { v0 } from 'v0'

// The default client uses V0_API_KEY or Vercel OIDC auth
```
