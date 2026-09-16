---
title: Resume a Chat Stream
description: Reconnect to an active v0 generation after a client disconnects
product: v0 API
type: guide
prerequisites:
  - /docs/api/v2
related:
  - /docs/api/v2/guides/custom-chat-interface
  - /docs/api/v2/reference/chats/resume-chat-stream
  - /docs/api/v2/reference/messages/list-messages
---

# Resume a Chat Stream

A dropped client connection (e.g. if you refresh your browser) does not stop the agent's active v0 generation. Resume the
latest generation with its chat ID, then continue receiving accumulated
message snapshots until the stream finishes.

This guide shows two ways to reconnect:

- Simplest: use `@v0-sdk/react` if you're building a React or Next.js application.
- Otherwise, use the core `v0` package and manage stream state yourself.

<Callout type="info">
  Resuming reconnects to the latest generation for a chat. It does not restart a
  stopped generation or create a new assistant message.
</Callout>

## Install the SDK

Install the v0 SDK:

```bash
pnpm add v0
```

For the React approach, also install the v0 React package and AI SDK:

```bash
pnpm add @v0-sdk/react ai @ai-sdk/react
```

## Resume with `@v0-sdk/react`

The React package provides `V0Transport`, which converts v0 stream updates into
AI SDK UI messages. When the newest persisted message is an unfinished
assistant message, AI SDK's `useChat` reconnects automatically.

This flow has three pieces:

1. Load the chat's message history.
2. Proxy the resume request through your server.
3. Configure `useChat` with the history and `V0Transport`.

### Load the message history

Load messages on the server so your API key is never sent to the browser.
Messages are returned newest first, which is the order expected by
`shouldResumeV0Chat()` and `V0Transport`.

```tsx title="app/chat/[chatId]/page.tsx"
import { notFound } from 'next/navigation'
import { v0 } from 'v0'

import { V0Chat } from './v0-chat'

export default async function ChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const result = await v0.messages.list({
    chatId,
    limit: 50,
  })

  if (result.error) {
    throw new Error(result.error.message)
  }

  if (!result.data) {
    notFound()
  }

  return <V0Chat chatId={chatId} history={result.data.messages} />
}
```

### Add a resume proxy

The proxy calls the v0 API with server-side credentials and forwards the
`V0StreamResult` as SSE.

```typescript title="app/api/v0/chats/[chatId]/resume/route.ts"
import { v0 } from 'v0'

import { auth } from '@/auth'

export async function POST(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ chatId: string }>
  },
) {
  const session = await auth()
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { chatId } = await params
  const result = await v0.chats.resume({ chatId })
  return result.toResponse()
}
```

Before calling v0, also verify that the signed-in application user can access
`chatId` in your data model.

### Configure `useChat`

Pass the newest-first v0 history to the transport and convert it to
chronological AI SDK messages with `toV0UIMessages()`. The `resume` option is
true only when the newest message is an assistant message whose `finishReason`
is `null`.

```tsx title="app/chat/[chatId]/v0-chat.tsx"
'use client'

import { useChat } from '@ai-sdk/react'
import {
  shouldResumeV0Chat,
  toV0UIMessages,
  V0Transport,
  type MessagesListResponse,
  type V0UIMessage,
} from '@v0-sdk/react'
import { useMemo } from 'react'

export function V0Chat({
  chatId,
  history,
}: {
  chatId: string
  history: MessagesListResponse['messages']
}) {
  const transport = useMemo(
    () =>
      new V0Transport({
        chatId,
        messages: history,
        urls: {
          create: '/api/v0/chats/stream',
          send: (id) => `/api/v0/chats/${id}/messages/stream`,
          resume: (id) => `/api/v0/chats/${id}/resume`,
        },
      }),
    [chatId, history],
  )

  const chat = useChat<V0UIMessage>({
    id: chatId,
    messages: toV0UIMessages(history),
    resume: shouldResumeV0Chat(history),
    transport,
  })

  return (
    <main>
      <p aria-live="polite">{chat.status}</p>

      {chat.messages.map((message) => (
        <article key={message.id}>
          <strong>{message.role}</strong>
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return <p key={`${message.id}:${index}`}>{part.text}</p>
            }

            if (part.type === 'reasoning') {
              return (
                <details key={`${message.id}:${index}`}>
                  <summary>Reasoning</summary>
                  <p>{part.text}</p>
                </details>
              )
            }

            return null
          })}
        </article>
      ))}

      {chat.error ? <p role="alert">{chat.error.message}</p> : null}
    </main>
  )
}
```

`V0Transport` seeds the reconnect with the persisted unfinished assistant
message, applies each resumed update, and prevents the existing partial content
from being duplicated.

The transport requires create, send, and resume URLs because the same `useChat`
instance can handle the full chat lifecycle. The create and send URLs should
point to your existing v0 stream proxy routes.

## Resume with the core `v0` SDK

Use the core SDK directly in a trusted server environment when you do not need
the React package:

```typescript
import { v0 } from 'v0'

const result = await v0.chats.resume({
  chatId: 'chat_abc123',
})

for await (const update of result.stream) {
  renderMessageParts(update.parts)

  if (update.title) {
    updateChatTitle(update.title)
  }
}

const final = await result.final
console.log('Generation finished:', final.parts)
```

Each item in `result.stream` is an accumulated snapshot. `update.parts` contains
the complete message parts received so far, not a raw delta that you need to
patch yourself. The raw API event remains available on `update.event` when you
need it.

`result.final` resolves to the completed snapshot. The stream result starts
when either `result.stream` or `result.final` is consumed, and both can be used
on the same result.

### Consume the stream in a browser

If your custom client runs in a browser, reuse the authenticated proxy route
from the React example. The route itself only uses the core `v0` package. Then
reconstruct the same `V0StreamResult` with the browser-safe entrypoint:

```typescript
import { readV0Stream } from 'v0/browser'

export async function resumeChat(chatId: string) {
  const response = await fetch(`/api/v0/chats/${encodeURIComponent(chatId)}/resume`, {
    method: 'POST',
  })

  const result = readV0Stream(response)

  for await (const update of result.stream) {
    renderMessageParts(update.parts)
  }

  return result.final
}
```

Authenticate browser-facing proxy routes and verify that the application user
can access the requested chat before calling v0.

## Resume behavior

- The endpoint resumes only the latest message when it is an unfinished
  assistant message.
- If the latest assistant message has already finished, the endpoint emits its
  current chat state and closes.
- If the chat has no assistant message to resume, or its backing stream is no
  longer available, the endpoint returns `404`.
- Resuming a stopped message does not start generation again. Send a new
  message to create another assistant generation.

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
