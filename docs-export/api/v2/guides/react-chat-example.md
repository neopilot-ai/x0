---
title: React Chat Example
description: Minimal Next.js chat with AI SDK and V0Transport
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/react-transport
  - /docs/api/v2/guides/custom-chat-interface
---

# React Chat Example

A minimal Next.js chat application using the AI SDK `useChat` hook with `V0Transport`.

## Setup

```bash
cd examples/react-chat
bun install
bun run dev
```

## Architecture

The example demonstrates the client-server pattern:

- **Client**: `app/chat.tsx` and `app/chat/[chatId]/page.tsx` use `useChat` with `V0Transport`
- **Server**: `app/api/v0/chats/stream/route.ts` and other API routes proxy requests to the v0 API
- **Proxy**: `lib/proxy.ts` handles v0 API requests securely

## Key Files

- `app/chat.tsx` - Main chat component using `useChat`
- `app/api/v0/chats/stream/route.ts` - Streaming chat endpoint
- `app/api/v0/chats/[chatId]/messages/route.ts` - Send messages endpoint
- `lib/proxy.ts` - Proxy configuration
- `lib/agent-runtime.ts` - Agent runtime setup

## How It Works

1. User sends a message through the chat UI
2. `useChat` calls `V0Transport.sendMessages()`
3. `V0Transport` forwards the request to the proxy route
4. The proxy route forwards to the v0 API
5. Response is streamed back to the client

## V0Transport Configuration

The transport is configured with URLs for create, send, and resume operations:

```tsx
const transport = new V0Transport({
  urls: {
    create: '/api/v0/chats/create',
    send: (chatId) => `/api/v0/chats/${chatId}/send`,
    resume: (chatId) => `/api/v0/chats/${chatId}/resume`,
  },
})
```
