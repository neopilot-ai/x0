---
title: Examples
description: Example projects built with the v0 SDK
product: v0 API
type: guide
related:
  - /docs/api/v2/quickstart
  - /docs/api/v2/guides/v0-sdk
  - /docs/api/v2/guides/react-transport
---

# Examples

Explore example projects that demonstrate how to use the v0 SDK in different scenarios.

## Available Examples

### [basic](./../../examples/basic)

Small TypeScript scripts for synchronous and streaming chat creation.

```bash
bun run basic/chats/stream.ts
bun run basic/chats/sync.ts
```

**Use case**: Quick integration test, understanding the v0 SDK basics.

**Features**:
- Synchronous chat creation
- Streaming chat creation
- Minimal setup

### [react-chat](./../../examples/react-chat)

Minimal Next.js chat using AI SDK `useChat` with `V0Transport`.

```bash
bun run dev
```

**Use case**: Building a custom chat interface with React.

**Features**:
- AI SDK `useChat` integration
- `V0Transport` for streaming
- Preview proxy routes
- Next.js App Router

**Project structure**:
- `app/` - Chat page and layout
- `lib/proxy.ts` - v0 proxy route
- `app/api/v0/chats/stream/route.ts` - Stream endpoint

### [v0-clone](./../../examples/v0-clone)

Full-featured v0 clone built with the v0 SDK.

```bash
bun run dev
```

**Use case**: Complete application reference implementation.

**Features**:
- Full chat interface with live previews
- AI SDK `useChat` with `V0Transport`
- Preview proxy
- Agent builder
- Settings and sidebar chats
- Vercel deployment

**Project structure**:
- `apps/web/` - Main Next.js application
- `apps/web/components/agent/` - Agent builder component
- `apps/web/lib/` - v0 client, proxy, and utilities
- `apps/web/lib/hooks/` - Custom hooks

## Adding v0 to Your Project

For a quick start, use the CLI:

```bash
npx create-v0-sdk-app my-app
```

Or integrate manually:

```bash
npm install v0 @v0-sdk/react @v0-sdk/ai-tools
```

## Next Steps

- [v0 SDK Guide](/docs/api/v2/guides/v0-sdk)
- [React Transport](/docs/api/v2/guides/react-transport)
- [AI Tools Guide](/docs/api/v2/guides/ai-tools-guide)
- [Custom Chat Interface](/docs/api/v2/guides/custom-chat-interface)
