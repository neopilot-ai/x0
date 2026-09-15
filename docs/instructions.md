---
title: Instructions
description: Custom instructions and prompting
product: v0
type: guide
---

# Instructions

Add custom instructions to guide v0's code generation.

## Setting Instructions

Provide system-level context for your project:

```typescript
const result = await v0.chats.createStream({
  message: 'Build a todo app',
  systemPrompt: 'Use Next.js 14 with App Router and TypeScript',
})
```

## Best Practices

- Keep instructions concise and specific
- Include framework and version requirements
- Specify coding standards and conventions
