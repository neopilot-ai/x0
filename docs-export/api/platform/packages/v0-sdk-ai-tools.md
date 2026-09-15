---
title: v0 SDK AI Tools
description: Agent-ready tool definitions for every v0 API endpoint
product: v0
type: reference
---

# v0 SDK AI Tools

The `@v0-sdk/ai-tools` package exposes the v0 API as agent-ready tool definitions (e.g. for AI SDK `ToolSet` usage). Each tool wraps one API endpoint with a Zod input schema.

## Installation

```bash
npm install @v0-sdk/ai-tools
```

## Usage

```typescript
import { generateText } from 'ai'
import { v0Tools, v0ToolsByCategory } from '@v0-sdk/ai-tools'

// All tools, built from client config (same options as createV0Client, plus apiKey)
const tools = v0Tools({ apiKey: process.env.V0_API_KEY })

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create and deploy a React dashboard',
  tools,
})

// Or grouped by API category
const { chats, messages, mcpServers, settings, usage, webhooks } = v0ToolsByCategory({
  apiKey: process.env.V0_API_KEY,
})
```

## Exports

- `v0Tools(config)` — builds the full tool set (`V0ToolsFlat`)
- `v0ToolsByCategory(config)` — builds tools grouped by category (`V0ToolsByCategory`)
- Types: `V0ToolCategory`, `V0ToolsByCategory`, `V0ToolsConfig`, `V0ToolsFlat`

## Tool categories

| Category | Tools include |
| --- | --- |
| `chats` | `chatsCreate`, `chatsCreateAsync`, `chatsCreateFromFiles`, `chatsCreateFromRepo`, `chatsCreateFromZip`, `chatsCreateStream`, `chatsCreateVercelProject`, `chatsDelete`, `chatsDeploy`, `chatsDownloadFiles`, `chatsDuplicate`, `chatsGet`, … |
| `messages` | `messagesSend`, `messagesSendStream`, `messagesResolve`, `messagesList`, `messagesGet`, `messagesStop`, … |
| `mcpServers` | `mcpServersCreate`, `mcpServersList`, `mcpServersGet`, `mcpServersUpdate`, `mcpServersDelete` |
| `settings` | `settingsGetPreviewHosts`, `settingsSetPreviewHosts` |
| `usage` | `usageGetActivity`, `usageGetSummary`, `usageListEvents` |
| `webhooks` | `webhooksCreate`, `webhooksList`, `webhooksGet`, `webhooksUpdate`, `webhooksDelete` |

Chat-creation tools accept the same fields as the API, including `message`, `systemPrompt`, `modelConfiguration`, `attachments`, `mcpServerIds`, and `skills`.

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [AI Tools Adapter](/docs/api/platform/adapters/ai-tools)
- [AI Tools Guide](/docs/api/v2/guides/ai-tools-guide)
