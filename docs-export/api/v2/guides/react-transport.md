---
title: React Transport
description: AI SDK transport and hooks for building custom chat interfaces
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/custom-chat-interface
  - /docs/api/v2/guides/integrating-v0-into-agents
  - /docs/api/v2/reference/chats/create-chat-streaming
---

# @v0-sdk/react

The `@v0-sdk/react` package provides AI SDK transport and generated hooks for building custom chat interfaces that call an application-owned v0 proxy.

## Installation

```bash
npm install @v0-sdk/react v0 ai swr
```

## V0Transport

`V0Transport` is an AI SDK `ChatTransport` implementation backed by caller-owned v0 proxy routes. It handles the full lifecycle of a chat: creating, sending messages, reconnecting, and resuming.

### Creating a Transport

```tsx
import { V0Transport } from '@v0-sdk/react'

const transport = new V0Transport({
  urls: {
    create: '/api/v0/chats/create',
    send: (chatId) => `/api/v0/chats/${chatId}/send`,
    resume: (chatId) => `/api/v0/chats/${chatId}/resume`,
  },
  chatId: 'existing-chat-id', // Optional: resume an existing chat
  messages: [...], // Optional: newest-first SDK history to seed a resumed assistant
  create: { modelConfiguration: { modelId: 'v0-pro' } }, // Optional: overrides for create
  send: { modelConfiguration: { modelId: 'v0-pro' } }, // Optional: overrides for send
  request: { headers: {} }, // Optional: custom request options
  onChatCreated: (chatId, controls) => {
    // Called when a new chat is created
  },
})
```

### Transport URLs

```ts
interface V0TransportUrls {
  create: string // URL for creating a new chat
  send: V0TransportChatUrl // URL for sending messages (can be a function)
  resume: V0TransportChatUrl // URL for resuming a chat
}

type V0TransportChatUrl = string | ((chatId: string) => string)
```

### Transport Options

```ts
interface V0TransportOptions {
  urls: V0TransportUrls
  chatId?: string
  messages?: readonly Message[]
  create?: Omit<ChatsCreateStreamData['body'], 'message' | 'attachments'>
  send?: Omit<MessagesSendStreamData['body'], 'message' | 'attachments'>
  request?: V0RequestOptions
  onChatCreated?: (chatId: string, controls: V0TransportStreamControls) => void
}
```

### Stream Controls

```ts
interface V0TransportStreamControls {
  stop: () => void // Stops the active transport stream
}
```

### Usage with `useChat`

```tsx
import { useChat } from '@ai-sdk/react'
import { V0Transport } from '@v0-sdk/react'

function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    transport: new V0Transport({
      urls: {
        create: '/api/v0/chats/create',
        send: (id) => `/api/v0/chats/${id}/send`,
        resume: (id) => `/api/v0/chats/${id}/resume`,
      },
    }),
  })

  return (
    <div>
      {messages.map((m) => (
        <div key={m.id}>{m.parts.map((p) => p.text)}</div>
      ))}
      <input value={input} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Send</button>
    </div>
  )
}
```

### Reconnection

`V0Transport` automatically handles reconnection. If the stream drops, it attempts to reconnect using the `resume` URL. If no seed message is available, reconnection returns `null`.

```ts
// sendMessages returns ReadableStream<UIMessageChunk>
// reconnectToStream returns ReadableStream<UIMessageChunk> | null
```

## Request Utilities

### `requestV0Operation`

A lower-level function for making v0 API requests:

```ts
import { requestV0Operation, type V0Operation } from '@v0-sdk/react'

const result = await requestV0Operation<Data, ErrorBody>(
  url,
  { id: 'ai-sdk.stream', method: 'POST', response: 'stream' },
  input,
  options,
)
```

### Request Types

```ts
interface V0Operation<Data> {
  id: string
  method: V0HttpMethod // 'get' | 'post' | 'patch' | 'delete' | 'put'
  response: V0ResponseKind // 'json' | 'stream' | 'blob'
  transform?: V0ResponseTransformer<Data>
  invalidates?: readonly string[]
}

interface V0RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  fetch?: V0Fetch
}
```

### Error Handling

```ts
import { V0ResponseError } from '@v0-sdk/react'

try {
  const result = await requestV0Operation(...)
} catch (error) {
  if (error instanceof V0ResponseError) {
    console.log(error.status, error.statusText, error.body)
  }
}
```

## SWR Hooks

The `@v0-sdk/react` package also exports SWR hooks generated from the OpenAPI schema for data fetching:

```ts
import { createV0Key } from '@v0-sdk/react/swr'
import type {
  V0QueryConfiguration,
  V0MutationConfiguration,
  V0InfiniteConfiguration,
} from '@v0-sdk/react/swr'
```

The generated SWR hooks provide `useQuery`, `useMutation`, and `useInfiniteQuery` wrappers for all v0 API endpoints.

## Messages

Utility functions for converting between v0 SDK messages and AI SDK UI messages:

```ts
import {
  toV0UIMessage,
  toV0UIMessages,
  toV0UIMessageMetadata,
  getV0PartId,
  serializeDates,
} from '@v0-sdk/react'

import type { V0UIMessage, V0UIMessageMetadata, V0UIDataTypes, Serialized } from '@v0-sdk/react'
```

### toV0UIMessage

Converts a persisted v0 `Message` to an AI SDK `UIMessage`:

```ts
const uiMessage = toV0UIMessage(v0Message)
```

### toV0UIMessages

Converts an array of v0 `Message` objects:

```ts
const uiMessages = toV0UIMessages(v0Messages)
```

### Serialized

A type utility that converts `Date` objects to strings recursively:

```ts
type Serialized<T> = T extends Date
  ? string
  : T extends Array<infer Item>
    ? Array<Serialized<Item>>
    : T extends object
      ? { [Key in keyof T]: Serialized<T[Key]> }
      : T
```

## Composition Utilities

Helpers for managing chat state and resumption:

```ts
import {
  shouldResumeV0Chat,
  getResumableV0Assistant,
  prependV0UIMessageHistory,
} from '@v0-sdk/react'
```

### shouldResumeV0Chat

Returns `true` only when the newest SDK message is an unfinished assistant:

```ts
if (shouldResumeV0Chat(messages)) {
  // Resume the chat
}
```

### getResumableV0Assistant

Returns the assistant message to use as a seed for reconnection:

```ts
const seed = getResumableV0Assistant(messages)
```

### prependV0UIMessageHistory

Prepends older newest-first SDK pages to local state without replacing existing messages:

```ts
const updatedMessages = prependV0UIMessageHistory(current, olderNewestFirst)
```

## Task Utilities

```ts
import { getPendingV0Task } from '@v0-sdk/react'
import type { V0PendingTask } from '@v0-sdk/react'

const task = getPendingV0Task(message)
// Returns: { type: 'questions' | 'plan' | 'integration' | 'permissions' } | null
```

## Chunk Processing

```ts
import { V0SnapshotChunkReducer, v0StreamToUIMessageStream } from '@v0-sdk/react'
```

`V0SnapshotChunkReducer` converts accumulated v0 message snapshots into incremental AI SDK chunks.

`v0StreamToUIMessageStream` converts a v0 stream into an AI SDK `ReadableStream<UIMessageChunk>`.
