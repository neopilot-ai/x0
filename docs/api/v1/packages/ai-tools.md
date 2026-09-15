---
title: @v0-sdk/ai-tools
description: AI SDK tools for the v0 API (v2)
product: v0 API
type: reference
prerequisites:
  - /docs/api/v2/quickstart
related:
  - /docs/api/v2/guides/ai-tools-guide
  - /docs/api/v2/guides/integrating-v0-into-agents
---

# @v0-sdk/ai-tools

> **Note**: This page covers the v2 package. The v1 documentation referenced `v0ToolsByCategory` as a function call with categories and tool names like `createChat`, `createProject`, `createDeployment`. These have been replaced by `v0Tools()` and `v0ToolsByCategory` (an object) with different tool names. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2).

## Installation

```bash
npm install @v0-sdk/ai-tools v0 ai zod
```

## Quick Start

```typescript
import { generateText } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create a new React todo app project',
  tools: v0Tools({ apiKey: process.env.V0_API_KEY }),
})
```

## Core Exports

### `v0Tools()`

Creates a complete tool set from a v0 client configuration:

```ts
const tools = v0Tools({ apiKey: process.env.V0_API_KEY })
```

### `v0ToolsByCategory` (Object)

Tools organized by category:

```ts
import { v0ToolsByCategory } from '@v0-sdk/ai-tools'

const chatTools = v0ToolsByCategory.chats
const messageTools = v0ToolsByCategory.messages
const mcpServerTools = v0ToolsByCategory.mcpServers
const settingsTools = v0ToolsByCategory.settings
const usageTools = v0ToolsByCategory.usage
const webhookTools = v0ToolsByCategory.webhooks
```

## Tool Categories

### Chats

```ts
const tools = v0ToolsByCategory.chats
// chatsCreate, chatsCreateAsync, chatsCreateFromFiles, chatsCreateFromRepo,
// chatsCreateFromZip, chatsCreateStream, chatsCreateVercelProject,
// chatsDelete, chatsDeploy, chatsDownloadFiles, chatsDuplicate,
// chatsGet, chatsGetConnectStatus, chatsGetFiles, chatsGetPreview,
// chatsList, chatsRestoreMessage, chatsResume, chatsUpdate, chatsUpdateFiles
```

### Messages

```ts
const tools = v0ToolsByCategory.messages
// messagesGet, messagesList, messagesResolve, messagesResolveAsync,
// messagesResolveStream, messagesSend, messagesSendAsync,
// messagesSendStream, messagesStop
```

### MCP Servers

```ts
const tools = v0ToolsByCategory.mcpServers
// mcpServersCreate, mcpServersDelete, mcpServersGet, mcpServersList, mcpServersUpdate
```

### Settings

```ts
const tools = v0ToolsByCategory.settings
// settingsGetPreviewHosts, settingsSetPreviewHosts
```

### Usage

```ts
const tools = v0ToolsByCategory.usage
// usageGetActivity, usageGetSummary, usageListEvents
```

### Webhooks

```ts
const tools = v0ToolsByCategory.webhooks
// webhooksCreate, webhooksDelete, webhooksGet, webhooksList, webhooksUpdate
```

## Example: Building an Agent

```ts
import { generateText } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: anthropic('claude-3-5-sonnet'),
  prompt: 'Build a project management dashboard',
  tools: {
    ...v0Tools({ apiKey: process.env.V0_API_KEY }),
  },
})
```

## Migrate from v1

| v1 (Deprecated) | v2 (Current) |
|-----------------|--------------|
| `v0ToolsByCategory({ apiKey })` (function) | `v0ToolsByCategory` (object) |
| `tools.project` | Does not exist |
| `tools.chat` | `v0ToolsByCategory.chats` |
| `tools.deployment` | Does not exist |
| `tools.user` | Does not exist |
| `tools.hook` | `v0ToolsByCategory.webhooks` |
| `createProject`, `findProjects` | Use `chatsCreate`, `chatsList` |
| `createDeployment`, `findDeployments` | Use `chatsDeploy`, `chatsGetPreview` |
| `getUser`, `getUserBilling` | Not available |
| `createHook`, `findHooks` | `webhooksCreate`, `webhooksList` |

For a complete v2 guide, see [AI Tools Guide](/docs/api/v2/guides/ai-tools-guide).
