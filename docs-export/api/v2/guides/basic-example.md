---
title: Basic Example
description: Small TypeScript scripts for v0 SDK sync and streaming chat creation
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/v0-sdk
  - /docs/api/v2/quickstart
---

# Basic Example

Small TypeScript scripts for synchronous and streaming chat creation. Sources live in `examples/basic`.

## Setup

```bash
cd examples/basic
bun install
cp .env.example .env.local
# set V0_API_KEY in .env.local
```

## Usage

### Synchronous chat

```bash
bun run sync
```

`chats/sync.ts` creates a chat with the default client and waits for the response:

```typescript
import { v0 } from 'v0'

const response = await v0.chats.create({
  message: 'Build me a cool personal website',
})

if (response.error) throw new Error(response.error.message)

console.log(`Created chat ${response.data.chat.id}`)
```

### Streaming chat

```bash
bun run stream
```

`chats/stream.ts` builds a client with `createV0Client` (supporting `V0_BASE_URL` and a separate local key), starts a stream, converts it with `toResponse()`, and reads updates with `readV0Stream()`:

```typescript
import { createV0Client, readV0Stream } from 'v0'

const v0 = createV0Client({
  auth: process.env.V0_API_KEY!,
  ...(process.env.V0_BASE_URL ? { baseUrl: process.env.V0_BASE_URL } : {}),
})

const serverResult = await v0.chats.createStream({
  message: 'Simple hello world button',
})

const result = readV0Stream(serverResult.toResponse())

for await (const update of result.stream) {
  console.log(update)
}

const final = await result.final
console.log('Final result:', final)
```

## Code structure

- `chats/sync.ts` — synchronous chat creation using `v0.chats.create()`
- `chats/stream.ts` — streaming chat creation using `v0.chats.createStream()` and `readV0Stream()`

## Key concepts

- `v0.chats.create()` — creates a chat and returns the result
- `v0.chats.createStream()` — creates a chat and returns a `V0StreamResult`
- `readV0Stream()` — reads a `Response` and returns a `V0StreamResult`
- `V0StreamResult.stream` — async iterable of `V0StreamUpdate`
- `V0StreamResult.final` — promise of the final result
- `V0StreamResult.toResponse()` — converts to a `Response` for forwarding
