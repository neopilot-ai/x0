---
title: Build a Custom Chat Interface
description: Build a React chat interface with v0 and AI SDK
product: v0 API
type: guide
related:
  - /docs/api/v2/quickstart
  - /docs/api/v2/guides/resuming-streams
  - /docs/api/v2/guides/handling-agent-interactions
  - /docs/api/v2/guides/accessing-previews
  - /docs/api/v2/reference/messages/list-messages
---

# Build a Custom Chat Interface

Build a custom React chat interface with the v0 React SDK and AI SDK. The React SDK handles message history and translates v0's stream into the message format expected by AI SDK's `useChat`.

## High level

A custom chat has three layers:

<div className="@container not-prose my-6">
  <div className="grid items-stretch gap-3 rounded-xl border bg-fd-secondary p-3 @min-[640px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
    <div className="rounded-lg border bg-fd-card p-4 shadow-sm">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        Browser
      </p>

      <p className="mb-3 font-semibold text-fd-foreground">
        React UI
      </p>

      <div className="space-y-2 text-sm text-fd-muted-foreground">
        <p>
          <code className="text-fd-foreground">useMessages()</code> loads
          history
        </p>

        <p>
          <code className="text-fd-foreground">useChat()</code> streams the
          conversation
        </p>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center gap-1 text-fd-muted-foreground">
      <span className="text-xs font-medium">
        JSON + SSE
      </span>

      <svg aria-hidden="true" className="h-5 w-5 rotate-90 @min-[640px]:rotate-0" fill="none" viewBox="0 0 20 20">
        <path d="M3 10h14m-4-4 4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>

    <div className="rounded-lg border bg-fd-card p-4 shadow-sm">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        Your infrastructure
      </p>

      <p className="mb-3 font-semibold text-fd-foreground">
        Backend routes
      </p>

      <div className="space-y-2 text-sm text-fd-muted-foreground">
        <p>
          Authenticate and authorize users
        </p>

        <p>
          Keep <code className="text-fd-foreground">V0\_API\_KEY</code> private
        </p>
      </div>
    </div>

    <div className="flex flex-col items-center justify-center gap-1 text-fd-muted-foreground">
      <span className="text-xs font-medium">
        Server SDK
      </span>

      <svg aria-hidden="true" className="h-5 w-5 rotate-90 @min-[640px]:rotate-0" fill="none" viewBox="0 0 20 20">
        <path d="M3 10h14m-4-4 4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    </div>

    <div className="rounded-lg border bg-fd-card p-4 shadow-sm">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        v0
      </p>

      <p className="mb-3 font-semibold text-fd-foreground">
        v0 API
      </p>

      <div className="space-y-2 text-sm text-fd-muted-foreground">
        <p>
          Runs the app-building agent
        </p>

        <p>
          Persists chats and streams updates
        </p>
      </div>
    </div>

  </div>
</div>

Your React app never calls the v0 API directly:

1. Hooks from `@v0-sdk/react` call routes owned by your application.
2. `useMessages` loads persisted v0 messages from your backend.
3. `V0Transport` connects AI SDK's `useChat` to your create, send, and resume routes. It translates v0 stream updates into AI SDK UI messages as they arrive.
4. Your backend uses the server-side `v0` SDK and returns either JSON or the stream response unchanged.

This keeps your v0 API key on the server while leaving the conversation UI, message rendering, and input behavior under your control.

## Install the packages

```bash
pnpm add v0 @v0-sdk/react ai @ai-sdk/react swr
```

Add your API key to the server environment:

```bash title=".env.local"
V0_API_KEY=your_v0_api_key
```

Do not prefix the variable with `NEXT_PUBLIC_` or otherwise expose it to the browser.

## Build the React interface

The following component supports both new and existing chats. For an existing chat, `useMessages` loads its persisted history. `toV0UIMessages` puts that newest-first history into the chronological format expected by AI SDK.

`V0Transport` then handles creating a chat, sending later messages, and reconnecting to an interrupted generation.

```tsx title="app/chat.tsx"
'use client'

import { useChat } from '@ai-sdk/react'
import { shouldResumeV0Chat, toV0UIMessages, V0Transport, type V0UIMessage } from '@v0-sdk/react'
import { useMessages } from '@v0-sdk/react/swr'
import { useState } from 'react'
import type { MessagesListResponse } from 'v0'

const emptyHistory: MessagesListResponse['messages'] = []

export function Chat({ chatId }: { chatId?: string }) {
  const history = useMessages(chatId ? `/api/v0/chats/${chatId}/messages` : null, { limit: 50 })

  if (chatId && history.isLoading) {
    return <p>Loading…</p>
  }

  if (history.error) {
    return <p role="alert">Unable to load this chat.</p>
  }

  return (
    <ChatRuntime
      key={chatId ?? 'new'}
      initialChatId={chatId}
      history={history.data?.messages ?? emptyHistory}
    />
  )
}

function ChatRuntime({
  initialChatId,
  history,
}: {
  initialChatId?: string
  history: MessagesListResponse['messages']
}) {
  const [input, setInput] = useState('')
  const [transport] = useState(
    () =>
      new V0Transport({
        chatId: initialChatId,
        messages: history,
        urls: {
          create: '/api/v0/chats',
          send: (chatId) => `/api/v0/chats/${chatId}/messages`,
          resume: (chatId) => `/api/v0/chats/${chatId}/resume`,
        },
        onChatCreated(chatId) {
          window.history.replaceState(null, '', `/chats/${chatId}`)
        },
      }),
  )

  const chat = useChat<V0UIMessage>({
    id: initialChatId,
    messages: toV0UIMessages(history),
    resume: shouldResumeV0Chat(history),
    transport,
  })

  const generating = chat.status === 'submitted' || chat.status === 'streaming'

  return (
    <main>
      <section aria-live="polite" aria-label="Conversation">
        {chat.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </section>

      {chat.error ? <p role="alert">{chat.error.message}</p> : null}

      <form
        onSubmit={(event) => {
          event.preventDefault()

          const text = input.trim()
          if (!text || generating) {
            return
          }

          setInput('')
          void chat.sendMessage({ text })
        }}
      >
        <textarea
          aria-label="Message"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
        <button disabled={!input.trim() || generating} type="submit">
          {generating ? 'Generating…' : 'Send'}
        </button>
      </form>
    </main>
  )
}

function Message({ message }: { message: V0UIMessage }) {
  return (
    <article>
      <h2>{message.role === 'user' ? 'You' : 'v0'}</h2>

      {message.parts.map((part, index) => {
        const key = `${message.id}:${index}`

        if (part.type === 'text') {
          return <p key={key}>{part.text}</p>
        }

        if (part.type === 'reasoning') {
          return (
            <details key={key}>
              <summary>Reasoning</summary>
              <p>{part.text}</p>
            </details>
          )
        }

        if (part.type === 'file') {
          return (
            <p key={key}>
              <a href={part.url}>{part.filename ?? 'Attachment'}</a>
            </p>
          )
        }

        if (part.type === 'data-v0-tool-call') {
          const tool = part.data

          return (
            <details key={key}>
              <summary>
                {tool.name} · {tool.status}
              </summary>

              {tool.input !== undefined ? (
                <pre>
                  <code>{JSON.stringify(tool.input, null, 2)}</code>
                </pre>
              ) : null}

              {tool.output !== undefined ? (
                <pre>
                  <code>{JSON.stringify(tool.output, null, 2)}</code>
                </pre>
              ) : null}
            </details>
          )
        }

        return null
      })}
    </article>
  )
}
```

The `key` on `ChatRuntime` gives each chat its own `useChat` state and transport. When v0 creates a chat from the first message, `onChatCreated` receives its ID. Use that callback to update your URL or application state.

### Render rich message parts

AI SDK represents a message as an ordered `parts` array. Render the array in order instead of relying on a single message string so the transcript can include prose, reasoning, attachments, and agent activity.

`V0Transport` maps v0 parts as follows:

| v0 part              | AI SDK UI part                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| `text`               | `text`                                                                                                |
| `thinking`           | `reasoning`                                                                                           |
| Attachment           | `file`                                                                                                |
| `tool-call`          | `data-v0-tool-call`                                                                                   |
| Other agent activity | `data-v0-file-read`, `data-v0-file-edit`, `data-v0-search`, `data-v0-bash`, or `data-v0-agent-action` |

For a tool call, its name, status, input, and output are available on `part.data`. The example renders them in a disclosure, but you can replace that with tool-specific UI by switching on `part.data.name`.

Some tool calls require user approval before the agent can continue. See [Handling Agent Interactions](/docs/api/v2/guides/handling-agent-interactions) to detect and resolve permission requests.

## Add the backend routes

The frontend above expects three backend URLs. The create and send routes return v0's SSE response, while the messages route also supports `GET` for history.

<Callout type="warning">
  The examples below focus only on forwarding requests. In every route, authenticate your application user before calling v0. For routes containing a `chatId`, also verify that the user owns or may access that chat. Keep this relationship in your own database or trusted server-written metadata; never trust ownership information supplied by the browser.
</Callout>

### Create a chat

```typescript title="app/api/v0/chats/route.ts"
import { v0, type ChatsCreateStreamData } from 'v0'

export async function POST(request: Request) {
  const body = (await request.json()) as ChatsCreateStreamData['body']
  const result = await v0.chats.createStream(body)

  return result.toResponse()
}
```

### Load history and send messages

A single route can handle both operations because `useMessages` sends a `GET`, while `V0Transport` sends a `POST`.

```typescript title="app/api/v0/chats/[chatId]/messages/route.ts"
import { v0, type MessagesSendStreamData } from 'v0'

export async function GET(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const cursor = new URL(request.url).searchParams.get('cursor')
  const result = await v0.messages.list({
    chatId,
    limit: 50,
    ...(cursor ? { cursor } : {}),
  })

  return Response.json(result.error ?? result.data ?? null, {
    status: result.response.status,
  })
}

export async function POST(request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const body = (await request.json()) as MessagesSendStreamData['body']
  const result = await v0.messages.sendStream({ chatId, ...body })

  return result.toResponse()
}
```

v0 returns persisted history newest first. Keep that order in the backend response; `toV0UIMessages` reverses it for display.

### Resume an interrupted stream

```typescript title="app/api/v0/chats/[chatId]/resume/route.ts"
import { v0 } from 'v0'

export async function POST(_request: Request, { params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = await params
  const result = await v0.chats.resume({ chatId })

  return result.toResponse()
}
```

`shouldResumeV0Chat(history)` asks AI SDK to call this route only when the newest persisted assistant message is unfinished. See [Resuming Streams](/docs/api/v2/guides/resuming-streams) for reconnection behavior and error handling.

## Show the generated app

The interface above renders the conversation. To embed the generated application beside it, follow [Accessing Previews](/docs/api/v2/guides/accessing-previews) and apply the same authentication and `chatId` authorization rules to the preview route.

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
