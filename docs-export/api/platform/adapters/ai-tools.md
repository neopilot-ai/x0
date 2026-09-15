---
title: AI Tools Adapter
description: Use v0 API operations as tools inside AI SDK agents via v0Tools()
product: v0
type: reference
---

# AI Tools Adapter

The AI Tools adapter exposes every v0 API operation as an AI SDK-compatible tool, so an autonomous agent can create chats, send messages, deploy, and manage resources. It is implemented by the `@v0-sdk/ai-tools` package (`v0Tools()` / `v0ToolsByCategory()`).

## Installation

```bash
npm install @v0-sdk/ai-tools v0 ai zod
```

## Usage

```typescript
import { generateText } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create and deploy a React dashboard',
  tools: v0Tools({ apiKey: process.env.V0_API_KEY }),
})
```

## Configuration

`v0Tools(config)` accepts the same options as `createV0Client`, plus an optional `apiKey`:

```typescript
import { v0Tools, v0ToolsByCategory } from '@v0-sdk/ai-tools'

const tools = v0Tools({ apiKey: process.env.V0_API_KEY })

// Or grouped by API category:
const { chats, messages, mcpServers, settings, usage, webhooks } = v0ToolsByCategory({
  apiKey: process.env.V0_API_KEY,
})
```

## Tools

One tool per API endpoint, named `<namespace><Operation>`:

| Category | Tools include |
| --- | --- |
| `chats` | `chatsCreate`, `chatsCreateAsync`, `chatsCreateFromFiles`, `chatsCreateFromRepo`, `chatsCreateFromZip`, `chatsCreateStream`, `chatsCreateVercelProject`, `chatsDelete`, `chatsDeploy`, `chatsDownloadFiles`, `chatsDuplicate`, `chatsGet`, `chatsGetConnectStatus`, `chatsGetFiles`, `chatsGetPreview`, `chatsList`, `chatsRestoreMessage`, `chatsResume`, `chatsUpdate`, `chatsUpdateFiles` |
| `messages` | `messagesGet`, `messagesList`, `messagesResolve`, `messagesResolveAsync`, `messagesResolveStream`, `messagesSend`, `messagesSendAsync`, `messagesSendStream`, `messagesStop` |
| `mcpServers` | `mcpServersCreate`, `mcpServersDelete`, `mcpServersGet`, `mcpServersList`, `mcpServersUpdate` |
| `settings` | `settingsGetPreviewHosts`, `settingsSetPreviewHosts` |
| `usage` | `usageGetActivity`, `usageGetSummary`, `usageListEvents` |
| `webhooks` | `webhooksCreate`, `webhooksDelete`, `webhooksGet`, `webhooksList`, `webhooksUpdate` |

## Related

- [v0 SDK AI Tools](/docs/api/platform/packages/v0-sdk-ai-tools)
- [MCP Server Adapter](/docs/api/platform/adapters/mcp-server)
- [AI Tools Guide](/docs/api/v2/guides/ai-tools-guide)
