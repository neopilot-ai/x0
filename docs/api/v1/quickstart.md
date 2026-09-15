---
title: Quickstart
description: Get started with the v0 API in minutes
product: v0 API
type: guide
related:
  - /docs/api/v1
  - /docs/api/v1/packages/v0-sdk
---

# Quickstart



## v0 SDK

The v0 SDK is a TypeScript library that makes it simple to interact with the v0 API.

## Installation

```bash
pnpm add v0-sdk
```

## Authentication

Get your API key from your [v0 account settings](https://v0.app/settings/keys) and set it as an environment variable:

Add your API key to `.env`:

```bash
V0_API_KEY=your_api_key_here
```

The SDK automatically uses the `V0_API_KEY` environment variable:

```typescript
import { v0 } from 'v0-sdk'

// No initialization needed - uses V0_API_KEY automatically
```

## Use Case 1: Get a Chat URL for Iframe Embedding

Create a chat and embed it directly in your application:

```tsx
// Create a new chat
const chat = await v0.chats.create({
  message: 'Create a responsive navbar with Tailwind CSS'
})

// Use the Demo URL in an iframe
<iframe
  src={chat.latestVersion?.demoUrl}
  width="100%"
  height="600">
</iframe>
```

### Customize the loading background

Demo URLs follow the user's light or dark color scheme while the generated app loads. To use a transparent background instead, add the `loadingBackground` query parameter to the Demo URL:

```tsx
const demoUrl = chat.latestVersion?.demoUrl
if (!demoUrl) {
  throw new Error('Demo URL is not available')
}

const iframeUrl = new URL(demoUrl)
iframeUrl.searchParams.set('loadingBackground', 'transparent')

<iframe src={iframeUrl.toString()} width="100%" height="600" />
```

The parameter accepts `transparent` or any valid CSS color value. Invalid values are ignored.

## Use Case 2: Get Generated Files

Create a chat and access the generated code files:

```typescript
// Create a chat
const chat = await v0.chats.create({
  message: 'Build a todo app with React and TypeScript',
})

// Access the generated files
chat.latestVersion?.files?.forEach((file) => {
  console.log(`File: ${file.name}`)
  console.log(`Content: ${file.content}`)
})
```

## Continue the Conversation

Add follow-up messages to refine the output:

```typescript
// Add a follow-up message
const response = await v0.chats.sendMessage({
  chatId: chat.id,
  message: 'Add dark mode support',
})
```

That's it! You now have everything you need to integrate v0's AI-powered code generation into your application.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)