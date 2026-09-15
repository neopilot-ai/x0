---
title: v0 SDK
description: TypeScript SDK for the v0 API — clients, streaming, and helper modules
product: v0
type: reference
---

# v0 SDK

The `v0` package provides SDK access to the v0 API, plus streaming utilities and helper modules. For the full client guide, see the [v0 SDK guide](/docs/api/v2/guides/v0-sdk).

## Installation

```bash
npm install v0
```

## Usage

### Default client

The default client reads `V0_API_KEY` from the environment, falling back to project-scoped Vercel OIDC auth on Vercel:

```typescript
import { v0 } from 'v0'

const response = await v0.chats.create({
  message: 'Build me a cool personal website',
})

if (response.error) throw new Error(response.error.message)
console.log(`Created chat ${response.data.chat.id}`)
```

### Custom client

```typescript
import { createV0Client } from 'v0'

const v0 = createV0Client({
  auth: process.env.V0_API_KEY!,
  ...(process.env.V0_BASE_URL ? { baseUrl: process.env.V0_BASE_URL } : {}),
})
```

`auth` accepts an API key string or a per-request callback for tokens that must be fetched or refreshed.

## API namespaces

The client wraps these generated endpoint namespaces (see [v0 API v2](/docs/api/v2)):

- `chats` — create (incl. streaming, from-repo/files/zip, async), get, update, delete, duplicate, deploy, preview, files, Vercel project
- `messages` — send (incl. streaming/async), resolve tasks, list/get, stop, restore, resume
- `mcpServers` — create, list, get, update, delete
- `webhooks` — create, list, get, update, delete
- `settings` — get/set trusted preview hosts
- `usage` — activity, summary, events

Streaming variants (`createStream`, `resume`, `sendStream`, `resolveStream`) return a `V0StreamResult` — see [Streaming result](/docs/api/v2/guides/streaming-result).

## Helper modules

Beyond the generated client, the SDK ships helper modules:

- `sandbox` / `sandbox/*` — sandbox previews and Vercel Sandbox integration
- `code-server` — browser-based editor sessions, diffs, split views, file management
- `terminal` — Bash execution with Ask/Auto/Full permission modes and rules
- `design-systems` — skill attachments, `v0.json` types and validation
- `deployments` — publish, preview polling, repo-import helpers
- `versions`, `screenshots`, `agents`, `paper`, `instructions`, `settings` — small utilities
- `stream` — `V0StreamResult`, `readV0Stream`, diff/patch utilities
- `browser` — browser-safe entry point (no authenticated client or OIDC helpers)

## Authentication

Set the `V0_API_KEY` environment variable, pass `auth` explicitly, or deploy on Vercel for automatic OIDC auth. See the [v0 SDK guide](/docs/api/v2/guides/v0-sdk).

## Related

- [v0 API Overview](/docs/api/v2)
- [v0 React Package](/docs/api/platform/packages/v0-sdk-react)
- [v0 AI Tools Package](/docs/api/platform/packages/v0-sdk-ai-tools)
