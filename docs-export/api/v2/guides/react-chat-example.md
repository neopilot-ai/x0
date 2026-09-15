---
title: React Chat Example
description: Next.js chat with AI SDK useChat, V0Transport, and SWR message history
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/react-transport
  - /docs/api/v2/guides/custom-chat-interface
---

# React Chat Example

A Next.js chat application using the AI SDK `useChat` hook with `V0Transport`. Sources live in `examples/react-chat`.

## Setup

```bash
cd examples/react-chat
bun install
bun run dev
```

## Architecture

The example demonstrates the client-server pattern:

- **Client**: `app/chat.tsx` and `app/chat/[chatId]/page.tsx` use `useChat` with `V0Transport`
- **Server**: API routes under `app/api/v0/chats/` proxy requests to the v0 API
- **Proxy**: `lib/proxy.ts` handles v0 API requests securely

## Key files

- `app/chat.tsx` — main chat component using `useChat`
- `app/api/v0/chats/stream/route.ts` — streaming chat-creation endpoint
- `app/api/v0/chats/[chatId]/messages/route.ts` — list messages endpoint
- `app/api/v0/chats/[chatId]/messages/stream/route.ts` — streaming send-message endpoint
- `app/api/v0/chats/[chatId]/messages/[messageId]/stop/route.ts` — stop-generation endpoint
- `app/api/v0/chats/[chatId]/resume/route.ts` — resume-stream endpoint
- `lib/proxy.ts` — proxy configuration

## How it works

1. User sends a message through the chat UI
2. `useChat` calls `V0Transport`, which forwards to the proxy route
3. The proxy route forwards to the v0 API
4. Response is streamed back to the client
5. Message history loads via the `useMessages` SWR hook; interrupted streams resume via `shouldResumeV0Chat`

## V0Transport configuration

The transport is configured with the current chat id, loaded history, endpoint URLs, and an `onChatCreated` callback that navigates to the new chat:

```tsx
const transport = useMemo(
  () =>
    new V0Transport({
      chatId: initialChatId,
      messages: history,
      urls: {
        create: '/api/v0/chats/stream',
        send: (id) => `/api/v0/chats/${id}/messages/stream`,
        resume: (id) => `/api/v0/chats/${id}/resume`,
      },
      onChatCreated: setCreatedChatId,
    }),
  [history, initialChatId],
)
```

History and stop controls come from `@v0-sdk/react/swr`:

```tsx
import { useMessages, useStopMessage } from '@v0-sdk/react/swr'
import { shouldResumeV0Chat, toV0UIMessages } from '@v0-sdk/react'

const history = useMessages(chatId ? `/api/v0/chats/${chatId}/messages` : null, { limit: 50 })

const chat = useAIChat<V0UIMessage>({
  id: initialChatId,
  messages: toV0UIMessages(history),
  resume: shouldResumeV0Chat(history),
  transport,
})
```
