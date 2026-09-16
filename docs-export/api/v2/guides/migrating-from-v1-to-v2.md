---
title: Migrate from v1 to v2
description: Guide to migrating from the v1 API to v2
product: v0 API
type: guide
related:
  - /docs/api/v2/quickstart
  - /docs/api/v2/guides/v0-sdk
  - /docs/api/v2/guides/react-transport
---

# Migrate from v1 to v2

The v2 API has been significantly redesigned. This guide covers the key changes and how to migrate your code.

## Package Changes

| v1                 | v2                                 |
| ------------------ | ---------------------------------- |
| `v0-sdk`           | `v0`                               |
| `@v0-sdk/react`    | `@v0-sdk/react` (different API)    |
| `@v0-sdk/ai-tools` | `@v0-sdk/ai-tools` (different API) |

## Install

```bash
# Remove v1
npm uninstall v0-sdk

# Install v2
npm install v0 @v0-sdk/react @v0-sdk/ai-tools
```

## SDK Client

### v1

```ts
import { V0 } from 'v0-sdk'
const v0 = new V0({ apiKey: process.env.V0_API_KEY })
```

### v2

```ts
import { createV0Client, v0 } from 'v0'

// Option 1: Default client (reads V0_API_KEY)
const v0 = v0

// Option 2: Custom client
const v0 = createV0Client({ auth: process.env.V0_API_KEY! })
```

## Chat Creation

### v1

```ts
const chat = await v0.chats.init({
  type: 'files',
  files: [{ name: 'src/App.tsx', content: appCode }],
})

const chat = await v0.chats.create({
  initialMessage: 'Create a todo app',
})
```

### v2

```ts
// From files
const result = await v0.chats.createFromFiles({
  files: [{ name: 'src/App.tsx', content: appCode }],
})

// From prompt
const result = await v0.chats.createStream({
  message: 'Create a todo app',
})
```

## Sending Messages

### v1

```ts
const response = await v0.chats.sendMessage(chatId, { message: 'Add dark mode' })
```

### v2

```ts
const result = await v0.messages.send({ chatId, message: 'Add dark mode' })
const result = await v0.messages.sendStream({ chatId, message: 'Add dark mode' })
```

## Listing Chats

### v1

```ts
const chats = await v0.chats.find()
```

### v2

```ts
const result = await v0.chats.list()
```

## Deployments

### v1

```ts
const deployment = await v0.deployments.create({
  chatId: chat.id,
  versionId: chat.latestVersion.id,
})
```

### v2

```ts
await v0.chats.deploy({ chatId: 'chat_xxx' })
```

## Projects

### v1

```ts
const project = await v0.projects.create({ name: 'My App' })
const projects = await v0.projects.find()
```

### v2

Projects do not exist as a separate resource in v2. Use `v0.chats.list({ vercelProjectId: '...' })` to filter chats by project.

## React Components

### v1

```tsx
import { StreamingMessage, CodeBlock, ThinkingSection } from '@v0-sdk/react'
```

### v2

```tsx
import { useChat } from '@ai-sdk/react'
import { V0Transport } from '@v0-sdk/react'

const { messages, input, handleInputChange, handleSubmit } = useChat({
  transport: new V0Transport({ urls: { ... } }),
})
```

## AI Tools

### v1

```ts
const tools = v0ToolsByCategory({ apiKey: process.env.V0_API_KEY })
// tools.project, tools.chat, tools.deployment, tools.user, tools.hook
```

### v2

```ts
const tools = v0Tools({ apiKey: process.env.V0_API_KEY })
// All tools available directly
// Or use v0ToolsByCategory.chats, v0ToolsByCategory.messages, etc.
```

## Key Removals

The following v1 APIs do not exist in v2:

- `v0.projects` - No longer a separate resource
- `v0.deployments` - Replaced by `v0.chats.deploy()`
- `v0.user` - Not available
- `V0` class - Replaced by `createV0Client()`
- `v0.chats.init()` - Replaced by `v0.chats.createFromFiles()`
- `v0.chats.sendMessage()` - Replaced by `v0.messages.send()`
- `StreamingMessage`, `CodeBlock`, `ThinkingSection`, `TaskSection` components
- `useStreamingChat`, `useCodeHighlight` hooks
- Templates: `classic-v0`, `ai-tools-example` - Only `v0-clone` is available

## Full Migration Example

### v1 Code

```ts
import { V0 } from 'v0-sdk'
import { useStreamingChat } from '@v0-sdk/react'

const v0 = new V0({ apiKey: process.env.V0_API_KEY })
const { messages, sendMessage } = useStreamingChat({ apiKey: process.env.V0_API_KEY })

const chat = await v0.chats.init({
  type: 'files',
  files: myFiles,
})
```

### v2 Code

```ts
import { v0 } from 'v0'
import { useChat } from '@ai-sdk/react'
import { V0Transport } from '@v0-sdk/react'

const transport = new V0Transport({
  urls: {
    create: '/api/v0/chats/create',
    send: (id) => `/api/v0/chats/${id}/send`,
    resume: (id) => `/api/v0/chats/${id}/resume`,
  },
})
const { messages, input, handleInputChange, handleSubmit } = useChat({ transport })

const result = await v0.chats.createFromFiles({ files: myFiles })
```
