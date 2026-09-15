---
title: Git Import
description: Import from GitHub
product: v0
type: guide
---

# Git Import

Import projects from GitHub repositories.

## Importing a Repository

```typescript
const result = await v0.chats.createFromRepo({
  repo: {
    url: 'https://github.com/vercel/next.js',
    branch: 'main',
  },
})
```

## Private Repositories

Private repositories connected through Vercel are also supported.
