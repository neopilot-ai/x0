---
title: Basic Example
description: Small TypeScript scripts for v0 SDK
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/v0-sdk
  - /docs/api/v2/quickstart
---

# Basic Example

Small TypeScript scripts for synchronous and streaming chat creation.

## Setup

```bash
cd examples/basic
bun install
```

## Usage

### Synchronous Chat

```bash
bun run chats/sync.ts
```

Creates a chat and waits for the response.

### Streaming Chat

```bash
bun run chats/stream.ts
```

Creates a chat and streams the response in real-time.

## Code Structure

- `sync.ts` - Synchronous chat creation using `v0.chats.create()`
- `stream.ts` - Streaming chat creation using `v0.chats.createStream()` and `readV0Stream()`

## Key Concepts

- `v0.chats.create()` - Creates a chat and returns the result
- `v0.chats.createStream()` - Creates a chat and returns a `V0StreamResult`
- `readV0Stream()` - Reads a `Response` and returns a `V0StreamResult`
- `V0StreamResult.stream` - Async iterable of `V0StreamUpdate`
- `V0StreamResult.final` - Promise of `V0StreamFinal`
- `V0StreamResult.toResponse()` - Converts to a `Response` for forwarding
