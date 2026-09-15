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
npm install v0@canary
```

## Importing

```ts
import { v0, readV0Stream, V0StreamError } from 'v0/browser'
```

## What's Exported

The `v0/browser` entry point exports:

- **Generated SDK**: `Chats`, `Messages`, `McpServers`, `Webhooks`, `V0Sdk`
- **Client utilities**: `createClient`, `createConfig`, `mergeHeaders`
- **Streaming**: `readV0Stream`, `V0StreamError`, `V0StreamResult`, `V0StreamEvent`, `V0StreamUpdate`, `V0StreamFinal`, `V0StreamParts`
- **Sandbox**: `V0Sandbox`, `V0SandboxPreview`, `V0SandboxOptions`, `PreviewState`, `createSandbox`, `getSandboxPreview`
- **Versions**: `Version`, `VersionHistory`, `VersionManager`, `createVersionSnapshot`, `createVersionManager`
- **Screenshots**: `ScreenshotManager`, `createScreenshotManager`, `createScreenshotStateTracker`
- **Agents**: `AgentManager`, `PreInstalledAgent`, `createAgentManager`, `PRE_INSTALLED_AGENTS`
- **Paper**: `PaperConfig`, `PaperDocument`, `PaperSection`, `createPaperDocument`
- **Instructions**: `InstructionsManager`, `createInstructionsManager`, `InstructionTemplate`, `INSTRUCTION_TEMPLATES`
- **Settings**: `SettingsManager`, `createSettingsManager`, `PreviewHost`, `TrustHost`, `TrustHostConfig`

## Usage

### Create a Chat and Stream Response

```ts
import { v0, readV0Stream } from 'v0/browser'

const response = await v0.chats.createStream({
  message: 'Build a todo app',
})
const result = readV0Stream(response)

for await (const update of result.stream) {
  console.log(update.parts)
}
```

### Create a Sandbox

```ts
import { createSandbox, getSandboxPreview } from 'v0/browser'

const sandbox = createSandbox(v0, 'chat_abc123')
const preview = await sandbox.getPreview()
```

## Security

The browser entry point does not include:
- `createV0Client` — Use the main `v0` package instead
- `vercelOidcAuth` — Use the main `v0` package instead
- `fetchPreview` — Use the main `v0` package instead

These functions require server-side authentication and should never be exposed to the browser.
