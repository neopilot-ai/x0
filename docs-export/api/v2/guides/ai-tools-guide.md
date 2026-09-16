---
title: AI Tools
description: AI SDK tools for integrating v0 into autonomous agents
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/integrating-v0-into-agents
  - /docs/api/v2/guides/handling-agent-interactions
  - /docs/api/v2/reference/chats/create-chat
---

# @v0-sdk/ai-tools

The `@v0-sdk/ai-tools` package provides AI SDK tools that allow you to integrate v0's app-generation capabilities into autonomous agents built with the AI SDK.

## Installation

```bash
npm install @v0-sdk/ai-tools v0 ai zod
```

## Usage

```ts
import { generateText } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Create and deploy a React dashboard',
  tools: v0Tools({ apiKey: process.env.V0_API_KEY }),
})
```

## `v0Tools()`

Creates a complete tool set from a v0 client configuration:

```ts
import { v0Tools } from '@v0-sdk/ai-tools'

const tools = v0Tools({
  apiKey: process.env.V0_API_KEY,
  // Same options as createV0Client
})
```

## Tool Categories

The tools are organized into categories accessible via `v0ToolsByCategory`:

```ts
import { v0ToolsByCategory, type V0ToolCategory } from '@v0-sdk/ai-tools'

// Access tools by category
const chatTools = v0ToolsByCategory.chats
const messageTools = v0ToolsByCategory.messages
const mcpServerTools = v0ToolsByCategory.mcpServers
const settingsTools = v0ToolsByCategory.settings
const usageTools = v0ToolsByCategory.usage
const webhookTools = v0ToolsByCategory.webhooks
```

## Tool Types

```ts
type V0ToolCategory = 'chats' | 'mcpServers' | 'messages' | 'settings' | 'usage' | 'webhooks'

type V0ToolName =
  | 'chatsCreate'
  | 'chatsCreateAsync'
  | 'chatsCreateFromFiles'
  | 'chatsCreateFromRepo'
  | 'chatsCreateFromZip'
  | 'chatsCreateStream'
  | 'chatsCreateVercelProject'
  | 'chatsDelete'
  | 'chatsDeploy'
  | 'chatsDownloadFiles'
  | 'chatsDuplicate'
  | 'chatsGet'
  | 'chatsGetConnectStatus'
  | 'chatsGetFiles'
  | 'chatsGetPreview'
  | 'chatsList'
  | 'chatsRestoreMessage'
  | 'chatsResume'
  | 'chatsUpdate'
  | 'chatsUpdateFiles'
  | 'mcpServersCreate'
  | 'mcpServersDelete'
  | 'mcpServersGet'
  | 'mcpServersList'
  | 'mcpServersUpdate'
  | 'messagesGet'
  | 'messagesList'
  | 'messagesResolve'
  | 'messagesResolveAsync'
  | 'messagesResolveStream'
  | 'messagesSend'
  | 'messagesSendAsync'
  | 'messagesSendStream'
  | 'messagesStop'
  | 'settingsGetPreviewHosts'
  | 'settingsSetPreviewHosts'
  | 'usageGetActivity'
  | 'usageGetSummary'
  | 'usageListEvents'
  | 'webhooksCreate'
  | 'webhooksDelete'
  | 'webhooksGet'
  | 'webhooksList'
  | 'webhooksUpdate'
```

## Tool Configuration

```ts
type V0ToolsConfig = Parameters<typeof createV0ClientType>[0] & {
  apiKey?: string
}
```

Pass the same configuration options as `createV0Client`, plus an optional `apiKey`.

## Available Tools

### Chat Tools

| Tool                       | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| `chatsCreate`              | Create a new chat from a prompt. Blocks until the model response is complete. |
| `chatsCreateAsync`         | Create a chat and process in background. Returns immediately with IDs.        |
| `chatsCreateFromFiles`     | Create a chat from inline source files.                                       |
| `chatsCreateFromRepo`      | Create a chat from a GitHub repository.                                       |
| `chatsCreateFromZip`       | Create a chat from a zip archive.                                             |
| `chatsCreateStream`        | Create a chat with SSE streaming.                                             |
| `chatsCreateVercelProject` | Create a Vercel project and attach it to the chat.                            |
| `chatsDelete`              | Delete a chat and all its messages.                                           |
| `chatsDeploy`              | Trigger a Vercel deployment for a chat.                                       |
| `chatsDownloadFiles`       | Download chat source files as a ZIP.                                          |
| `chatsDuplicate`           | Duplicate an existing chat.                                                   |
| `chatsGet`                 | Retrieve a chat by ID.                                                        |
| `chatsGetConnectStatus`    | Get Vercel Connect setup status.                                              |
| `chatsGetFiles`            | Get the files for a chat.                                                     |
| `chatsGetPreview`          | Get the preview URL for a chat.                                               |
| `chatsList`                | List chats with pagination.                                                   |
| `chatsRestoreMessage`      | Restore files from an assistant message.                                      |
| `chatsResume`              | Resume a chat from a stopped task.                                            |
| `chatsUpdate`              | Update chat metadata and title.                                               |
| `chatsUpdateFiles`         | Create, update, or delete files in a chat.                                    |

### Message Tools

| Tool                    | Description                        |
| ----------------------- | ---------------------------------- |
| `messagesSend`          | Send a message to a chat.          |
| `messagesSendAsync`     | Send a message asynchronously.     |
| `messagesSendStream`    | Send a message with streaming.     |
| `messagesGet`           | Get a specific message.            |
| `messagesList`          | List messages in a chat.           |
| `messagesResolve`       | Resolve a task with user input.    |
| `messagesResolveAsync`  | Resolve a task asynchronously.     |
| `messagesResolveStream` | Resolve a task with streaming.     |
| `messagesStop`          | Stop an active message generation. |

### MCP Server Tools

| Tool               | Description                         |
| ------------------ | ----------------------------------- |
| `mcpServersCreate` | Create an MCP server configuration. |
| `mcpServersUpdate` | Update an MCP server.               |
| `mcpServersGet`    | Get an MCP server.                  |
| `mcpServersList`   | List all MCP servers.               |
| `mcpServersDelete` | Delete an MCP server.               |

### Settings Tools

| Tool                      | Description                |
| ------------------------- | -------------------------- |
| `settingsGetPreviewHosts` | Get trusted preview hosts. |
| `settingsSetPreviewHosts` | Set trusted preview hosts. |

### Usage Tools

| Tool               | Description         |
| ------------------ | ------------------- |
| `usageGetActivity` | Get usage activity. |
| `usageGetSummary`  | Get usage summary.  |
| `usageListEvents`  | List usage events.  |

### Webhook Tools

| Tool             | Description       |
| ---------------- | ----------------- |
| `webhooksCreate` | Create a webhook. |
| `webhooksUpdate` | Update a webhook. |
| `webhooksGet`    | Get a webhook.    |
| `webhooksList`   | List webhooks.    |
| `webhooksDelete` | Delete a webhook. |

## Example: Building an Agent

```ts
import { generateText, tool } from 'ai'
import { v0Tools } from '@v0-sdk/ai-tools'

const result = await generateText({
  model: anthropic('claude-3-5-sonnet'),
  prompt: 'Build a project management dashboard',
  tools: {
    ...v0Tools({ apiKey: process.env.V0_API_KEY }),
    // Add custom tools alongside v0 tools
  },
})
```

## Example: Agent with Tool Control

```ts
import { generateObject } from 'ai'
import { v0Tools, type V0ToolsFlat } from '@v0-sdk/ai-tools'

const { object } = await generateObject({
  model: openai('gpt-4o'),
  schema: z.object({
    action: z.enum(['create', 'list']),
  }),
  tools: v0Tools({ apiKey: process.env.V0_API_KEY }),
})

if (object.action === 'create') {
  const chat = await v0Tools.chatsCreate({
    message: 'Build a CRM',
  })
}
```

## Types

```ts
type V0ToolsFlat = Record<V0ToolName, V0GeneratedTool>
type V0ToolsByCategory = {
  chats: Pick<V0ToolsFlat, 'chatsCreate' | ...>
  mcpServers: Pick<V0ToolsFlat, 'mcpServersCreate' | ...>
  messages: Pick<V0ToolsFlat, 'messagesGet' | ...>
  settings: Pick<V0ToolsFlat, 'settingsGetPreviewHosts' | ...>
  usage: Pick<V0ToolsFlat, 'usageGetActivity' | ...>
  webhooks: Pick<V0ToolsFlat, 'webhooksCreate' | ...>
}
```
