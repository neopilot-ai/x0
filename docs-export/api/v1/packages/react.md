---
title: @v0-sdk/react
description: React hooks and AI SDK transport for the v0 API
product: v0 API
type: reference
prerequisites:
  - /docs/api/v2/quickstart
related:
  - /docs/api/v2/guides/react-transport
  - /docs/api/v2/guides/custom-chat-interface
---

# @v0-sdk/react

> **Note**: This page covers the v2 package. The v1 documentation referenced components like `StreamingMessage`, `CodeBlock`, `ThinkingSection`, and `TaskSection` which have been replaced by the `V0Transport` class and AI SDK integration. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2).

## Installation

```bash
npm install @v0-sdk/react v0 ai swr
```

## Quick Start

Use `V0Transport` with `@ai-sdk/react` `useChat`:

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

## Core Exports

### V0Transport

AI SDK chat transport backed by caller-owned v0 proxy routes:

```ts
import { V0Transport } from '@v0-sdk/react'

const transport = new V0Transport({
  urls: {
    create: '/api/v0/chats/create',
    send: (chatId) => `/api/v0/chats/${chatId}/send`,
    resume: (chatId) => `/api/v0/chats/${chatId}/resume`,
  },
})
```

### Request Utilities

```ts
import { requestV0Operation, V0ResponseError } from '@v0-sdk/react'

const result = await requestV0Operation<Data>(url, operation, input, options)
```

### Message Utilities

```ts
import { toV0UIMessage, toV0UIMessages, getPendingV0Task } from '@v0-sdk/react'

const uiMessage = toV0UIMessage(v0Message)
const task = getPendingV0Task(message)
```

### Composition Utilities

```ts
import {
  shouldResumeV0Chat,
  getResumableV0Assistant,
  prependV0UIMessageHistory,
} from '@v0-sdk/react'
```

### SWR Hooks

```ts
import { createV0Key } from '@v0-sdk/react/swr'
```

### Types

```ts
import type {
  V0UIMessage,
  V0UIMessageMetadata,
  V0UIDataTypes,
  V0RequestOptions,
  V0ResponseError,
} from '@v0-sdk/react'
```

## Migrate from v1

| v1 (Deprecated)            | v2 (Current)                      |
| -------------------------- | --------------------------------- |
| `<StreamingMessage>`       | Use `useChat` with `V0Transport`  |
| `<CodeBlock>`              | Use your own code display         |
| `<ThinkingSection>`        | Use your own thinking display     |
| `<TaskSection>`            | Use `getPendingV0Task()`          |
| `useStreamingChat`         | `useChat` with `V0Transport`      |
| `useCodeHighlight`         | Custom implementation             |
| `@v0-sdk/react` components | `@v0-sdk/react` transport + types |

For a complete v2 guide, see [React Transport Guide](/docs/api/v2/guides/react-transport).
