---
title: AI Models
description: Model configurations for v0
product: v0
type: guide
---

# AI Models

v0 supports multiple AI models for code generation and chat interactions.

## Available Models

- **v0-mini** - Fast, lightweight model for simple tasks
- **v0-pro** - Balanced model for general use
- **v0-max** - Most capable model for complex tasks
- **v0-max-fast** - High-performance variant

## Configuring Models

```typescript
const result = await v0.chats.createStream({
  message: 'Build a dashboard',
  modelConfiguration: { modelId: 'v0-pro' },
})
```

## Image Generations

Enable image generations to generate up to 5 images per version:

```typescript
const result = await v0.chats.createStream({
  message: 'Create a landing page with images',
  modelConfiguration: { modelId: 'v0-pro', imageGenerations: true },
})
```

## Vercel AI Gateway

v0 includes Vercel AI Gateway integration, which automatically configures your API key using your Vercel account. This gives you access to hundreds of AI models through a single endpoint.
