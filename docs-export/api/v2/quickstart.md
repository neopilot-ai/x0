---
title: Quickstart
description: Build your first app-generation interface with the v0 API
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/custom-chat-interface
  - /docs/api/v2/guides/accessing-previews
  - /docs/api/v2/guides/integrating-v0-into-agents
  - /docs/api/v2/reference/chats/create-chat
---

# Quickstart

Build an app-generation experience where users can prompt, preview, and iterate on applications. Your frontend owns the experience; a small server layer keeps your v0 credentials private and forwards requests to the API.

```bash
npm install v0
```

## Start a new app

The fastest way to get started is with the complete app template.

### 1. Create the app

```bash
npx create-v0-sdk-app my-v0-app
```

The starter includes a React chat interface, server proxy routes, generated code and file views, and an isolated live-preview app. It also adds a v0 agent skill at `.agents/skills/v0/SKILL.md` so coding agents can use current SDK patterns when extending the project.

### 2. Add your API key

Create an API key in [v0 settings](https://v0.app/settings/keys). Then copy the starter environment file and add the key:

```bash
cd my-v0-app
cp .env.example .env.local
```

```bash title=".env.local"
V0_API_KEY=your_v0_api_key
```

Keep this value server-side. Do not expose it in browser code or prefix it with `NEXT_PUBLIC_`.

### 3. Run the app

```bash
npm run dev
```

Open the local URL printed in your terminal. You can now prompt v0, stream a generation, inspect the generated files, and load the live preview from the app.

## Add to an existing app

Your browser should call routes owned by your application instead of calling v0 directly. Those routes use the server-side `v0` package to authenticate with v0 and return data or streams to your frontend.

Create an [API key](https://v0.app/settings/keys) and add it to your server environment as `V0_API_KEY` before continuing.

Install the server SDK:

```bash
npm install v0
```

If you're using React, also install the v0 React helpers and AI SDK:

```bash
npm install @v0-sdk/react ai @ai-sdk/react
```

### React

Use the `v0` package in your server routes to create chats, send messages, and resume streams. Then configure `V0Transport` in your React app to connect AI SDK's `useChat` to those routes:

```tsx title="hooks/use-v0-app-builder.ts"
'use client'

import { useChat } from '@ai-sdk/react'
import { V0Transport, type V0UIMessage } from '@v0-sdk/react'
import { useState } from 'react'

export function useV0AppBuilder() {
  const [transport] = useState(
    () =>
      new V0Transport({
        urls: {
          create: '/api/v0/chats',
          send: (chatId) => `/api/v0/chats/${chatId}/messages`,
          resume: (chatId) => `/api/v0/chats/${chatId}/resume`,
        },
      }),
  )

  return useChat<V0UIMessage>({ transport })
}
```

Use the returned `messages`, `sendMessage`, `status`, and `stop` values to build your interface. Follow [Build a Custom Chat Interface](/docs/api/v2/guides/custom-chat-interface) to add the proxy routes, render rich message parts, load history, authorize users, and resume interrupted streams.

### Non-React

Install the server SDK:

```bash
npm install v0
```

Add an endpoint in your server framework that accepts a prompt from your frontend and calls v0. For example:

```typescript title="api/v0/chats.ts"
import { v0 } from 'v0'

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message: string }
  const result = await v0.chats.create({ message })

  if (result.error) {
    return Response.json(result.error, { status: result.response.status })
  }

  return Response.json(result.data)
}
```

Call your endpoint from the browser when the user submits a prompt:

```typescript title="app.ts"
const response = await fetch('/api/v0/chats', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Create a project management dashboard with a kanban board',
  }),
})

const { chat } = await response.json()
console.log('Created chat:', chat.id)
```

This example waits for the first generation to finish. For a streaming interface, use `v0.chats.createStream()` in your server endpoint and return `result.toResponse()`, then consume the stream with your frontend framework.

## Next steps

- [Build a custom chat interface](/docs/api/v2/guides/custom-chat-interface) with React and AI SDK.
- [Embed the live preview](/docs/api/v2/guides/accessing-previews) in your product.
- [Use v0 from another agent](/docs/api/v2/guides/integrating-v0-into-agents) through MCP or AI SDK tools.
- [Migrate an existing v1 integration](/docs/api/v2/guides/migrating-from-v1-to-v2).
- Browse the [endpoint reference](/docs/api/v2/reference/chats/list-chats).

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
