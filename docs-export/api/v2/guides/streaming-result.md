---
title: Streaming Result
description: V0StreamResult, readV0Stream, and streaming utilities
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/v0-sdk
  - /docs/api/v2/guides/resuming-streams
  - /docs/api/v2/guides/browser-entry
---

# Streaming Result

The `v0-sdk` package provides streaming utilities for handling real-time chat responses. The core types are `V0StreamResult`, `V0StreamUpdate`, `V0StreamFinal`, and `V0StreamError`.

## Installation

```bash
npm install v0@canary
```

## Importing

```ts
import { readV0Stream, V0StreamError, V0StreamResult } from 'v0'
// or
import { readV0Stream, V0StreamError, V0StreamResult } from 'v0/browser'
```

## V0StreamResult

The `V0StreamResult` interface exposes:

- `stream` — An `AsyncIterable<V0StreamUpdate>` of streaming updates
- `final` — A `Promise<V0StreamFinal>` with the completed snapshot
- `toResponse()` — Converts the stream to a `Response` for forwarding

```ts
const result = await v0.chats.createStream({ message: 'Build a todo app' })
// result.stream is AsyncIterable<V0StreamUpdate>
// result.final is Promise<V0StreamFinal>
// result.toResponse() returns Response
```

## readV0Stream

`readV0Stream` reconstructs a `V0StreamResult` from an SSE `Response`. Use this when forwarding streaming responses from your server to the client.

```ts
import { readV0Stream } from 'v0'

const result = readV0Stream(response)

for await (const update of result.stream) {
  console.log(update.parts)
}
```

## V0StreamUpdate

Each update contains:

- `status` — `'streaming'`
- `event` — The raw stream event
- `chat` — Optional chat object
- `message` — Optional message object
- `title` — Optional chat title
- `parts` — Current message parts
- `usage` — Optional token usage

## V0StreamFinal

The final result contains all the same fields as `V0StreamUpdate` plus `status: 'done'`.

## V0StreamError

Thrown when a stream emits an error event or terminates abnormally. Contains `code` and `id` fields.

```ts
import { V0StreamError } from 'v0'

try {
  const result = readV0Stream(response)
  for await (const update of result.stream) {
    // process updates
  }
} catch (error) {
  if (error instanceof V0StreamError) {
    console.error(`Stream error: ${error.message}, code: ${error.code}`)
  }
}
```

## diffpatch

The `diffpatch.ts` module provides `diff()` and `patch()` functions for applying JSON patches to stream updates. This is used internally by the streaming system to apply incremental updates.

```ts
import { diff, patch } from 'v0/stream/diffpatch'

const delta = diff(original, modified)
const updated = patch(original, delta)
```
