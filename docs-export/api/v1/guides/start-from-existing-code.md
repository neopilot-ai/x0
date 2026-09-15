---
title: Start from Existing Code
description: Learn how to start v0 chats from existing codebases, repositories, and file structures
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/git-import
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Start from Existing Code



Learn how to bootstrap v0 chats from your existing code, whether it's a GitHub repository, local files, or zip archives.

## Overview

The v0 API supports multiple ways to initialize chats from existing code:

* **GitHub Repositories** - Import directly from public or private repos
* **File Uploads** - Upload individual files with content
* **Zip Archives** - Import from zip file URLs
* **Registry Components** - Use community components

## Importing from GitHub Repositories

### Basic Repository Import

```typescript
import { v0 } from 'v0-sdk'

// Initialize chat from GitHub repository
const chat = await v0.chats.init({
  type: 'repo',
  repo: {
    url: 'https://github.com/username/my-react-app',
    branch: 'main', // optional, defaults to default branch
  },
  name: 'My Imported Project', // optional
})

console.log(`Chat created: ${chat.id}`)
```

### Lock Files from Modification

```typescript
// Initialize with all files locked to prevent AI modification
const chat = await v0.chats.init({
  type: 'repo',
  repo: {
    url: 'https://github.com/username/my-app',
  },
  lockAllFiles: true, // Prevents AI from modifying any files
})
```

## Importing from Files

### Upload Individual Files

```typescript
// Initialize chat with specific files
const chat = await v0.chats.init({
  type: 'files',
  files: [
    {
      name: 'src/components/Button.tsx',
      content: `
        import React from 'react'

        export function Button({ children, onClick }) {
          return (
            <button onClick={onClick} className="btn">
              {children}
            </button>
          )
        }
      `,
      locked: false, // Allow AI to modify this file
    },
    {
      name: 'src/styles/button.css',
      content: `
        .btn {
          padding: 8px 16px;
          border: none;
          border-radius: 4px;
          background: #007bff;
          color: white;
          cursor: pointer;
        }
      `,
      locked: true, // Prevent AI from modifying this file
    },
  ],
})
```

### Upload from URLs

```typescript
// Initialize chat with files from URLs
const chat = await v0.chats.init({
  type: 'files',
  files: [
    {
      name: 'package.json',
      url: 'https://raw.githubusercontent.com/username/repo/main/package.json',
    },
    {
      name: 'README.md',
      url: 'https://raw.githubusercontent.com/username/repo/main/README.md',
      locked: true,
    },
  ],
})
```

## Importing from Zip Archives

```typescript
// Initialize chat from zip file URL
const chat = await v0.chats.init({
  type: 'zip',
  zip: {
    url: 'https://github.com/username/project/archive/refs/heads/main.zip',
  },
  lockAllFiles: false, // Allow AI to modify files
  name: 'Project from Archive',
})
```

## Importing from Community Registries

For specialized use cases, you can import from component registries:

```typescript
// Initialize chat from component registry (e.g., shadcn/ui)
const chat = await v0.chats.init({
  type: 'registry',
  registry: {
    url: 'https://ui.shadcn.com/registry/styles/default/button.json',
  },
  lockAllFiles: false,
})
```

## Chat vs Init vs Create

### When to Use `chats.init()`

Use `chats.init()` when you have existing code and want to start development:

* **Fast** - No AI processing during initialization
* **Free** - Doesn't consume tokens
* **Files-first** - Start with existing code structure

### When to Use `chats.create()`

Use `chats.create()` when starting from scratch:

* **AI-powered** - Generates initial code from prompts
* **Token cost** - Consumes tokens for AI generation
* **Prompt-first** - Start with natural language description

```typescript
// chats.init() - Fast, no tokens, existing code
const initChat = await v0.chats.init({
  type: 'files',
  files: existingFiles,
})

// chats.create() - Slower, uses tokens, generates code
const createChat = await v0.chats.create({
  message: 'Create a React dashboard with charts',
})
```

## Best Practices

### 1. File Organization

```typescript
// ✅ Good: Organized file structure
const chat = await v0.chats.init({
  type: 'files',
  files: [
    { name: 'src/components/Button.tsx', content: '...' },
    { name: 'src/components/Card.tsx', content: '...' },
    { name: 'src/styles/globals.css', content: '...' },
    { name: 'package.json', content: '...', locked: true },
  ],
})
```

### 2. Selective File Locking

```typescript
// ✅ Good: Lock configuration files, allow code modification
const chat = await v0.chats.init({
  type: 'files',
  files: [
    { name: 'src/App.tsx', content: '...', locked: false }, // Allow AI changes
    { name: 'package.json', content: '...', locked: true }, // Protect config
    { name: '.env.example', content: '...', locked: true }, // Protect secrets
  ],
})
```


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)