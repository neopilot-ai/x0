---
title: Browser Entry
description: Browser-safe SDK entry point for client-side applications
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/v0-sdk
  - /docs/api/v2/guides/resuming-streams
  - /docs/api/v2/guides/custom-chat-interface
---

# Browser Entry

The `v0/browser` entry point provides browser-safe SDK primitives without importing authenticated clients or Vercel OIDC helpers. Use this entry point when building client-side applications that need to interact with the v0 API.

## Installation

```bash
npm install v0
```

## Importing

```ts
import { readV0Stream, V0StreamError, type V0StreamResult } from 'v0/browser'
```

> `v0/browser` intentionally does **not** export the authenticated `v0` client, `createV0Client`, `vercelOidcAuth`, or `fetchPreview` — those live in the main `v0` package and require server-side credentials. Helpers that call the API (e.g. `createSandbox`) accept a structural client object you provide, typically backed by your own API routes.

## What's Exported

The `v0/browser` entry point exports:

- **Generated SDK**: `Chats`, `Messages`, `McpServers`, `Webhooks`, `V0Sdk`
- **Client utilities**: `createClient`, `createConfig`, `mergeHeaders`
- **Streaming**: `readV0Stream`, `V0StreamError`, `V0StreamResult`, `V0StreamEvent`, `V0StreamUpdate`, `V0StreamFinal`, `V0StreamParts`
- **Sandbox**: `V0Sandbox`, `V0SandboxPreview`, `V0SandboxOptions`, `PreviewState`, `createSandbox`, `getSandboxPreview`
- **Code server**: `createCodeServer`, `openFile`, `applyDiff`, `createDiff`, split-view and file-manager helpers
- **Terminal**: `executeBash`, permission modes and rules (`setPermissionMode`, `addRule`, `BUILTIN_ALLOW`, `BUILTIN_DENY`)
- **Design systems**: skill attachments (`memorySkill`, `remoteSkill`, `projectSkill`), `V0Json` types, `validateV0Json`
- **Deployments**: `publishChat`, `waitForPreview`, `importRepoAsChat`
- **Versions**: `Version`, `VersionHistory`, `VersionManager`, `createVersionSnapshot`, `createVersionManager`
- **Screenshots**: `ScreenshotManager`, `createScreenshotManager`, `createScreenshotStateTracker`
- **Agents**: `AgentManager`, `PreInstalledAgent`, `createAgentManager`, `PRE_INSTALLED_AGENTS`
- **Paper**: `PaperConfig`, `PaperDocument`, `PaperSection`, `createPaperDocument`
- **Instructions**: `InstructionsManager`, `createInstructionsManager`, `InstructionTemplate`, `INSTRUCTION_TEMPLATES`
- **Settings**: `SettingsManager`, `createSettingsManager`, `PreviewHost`, `TrustHost`, `TrustHostConfig`

## Usage

### Read a Streamed Response

Point `readV0Stream` at a `Response` from your own streaming API route (which proxies `v0.chats.createStream(...).toResponse()` server-side):

```ts
import { readV0Stream } from 'v0/browser'

const response = await fetch('/api/v0/chats/stream', { method: 'POST', body: JSON.stringify({ message: 'Build a todo app' }) })
const result = readV0Stream(response)

for await (const update of result.stream) {
  console.log(update.parts)
}
```

### Create a Sandbox

`createSandbox` takes any object with a `chats.getPreview` method — pass a thin wrapper over your preview API route:

```ts
import { createSandbox } from 'v0/browser'

const sandbox = createSandbox(
  { chats: { getPreview: ({ chatId }) => fetch(`/api/v0/chats/${chatId}/preview`).then((r) => r.json()) } },
  'chat_abc123',
)
const preview = await sandbox.getPreview()
```

## Security

The browser entry point does not include:
- `createV0Client` / `v0` — Use the main `v0` package instead
- `vercelOidcAuth` — Use the main `v0` package instead
- `fetchPreview` — Use the main `v0` package instead

These functions require server-side authentication and should never be exposed to the browser.
