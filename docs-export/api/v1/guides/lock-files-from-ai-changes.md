---
title: Lock Files from AI Changes
description: Learn how to protect files from AI modifications in v0 chats
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Lock Files from AI Changes

File locks allow you to protect specific files from AI modifications during code generation, giving you precise control over which parts of your codebase can be changed.

## Overview

File locks in v0 protect specific files from AI modifications during generation. This is useful when you want to:

- **Preserve configuration files** - Keep package.json, tsconfig.json unchanged
- **Protect existing code** - Prevent AI from modifying working components
- **Maintain file structure** - Lock files that shouldn't be altered
- **Control AI scope** - Direct AI attention to specific files only

## Setting File Locks During Initialization

### Lock Individual Files

```typescript
import { v0 } from 'v0-sdk'

// Initialize chat with some files locked
const chat = await v0.chats.init({
  type: 'files',
  files: [
    {
      name: 'src/components/Button.tsx',
      content: buttonCode,
      locked: false, // AI can modify this file
    },
    {
      name: 'package.json',
      content: packageJson,
      locked: true, // AI cannot modify this file
    },
    {
      name: 'tsconfig.json',
      content: tsConfig,
      locked: true, // AI cannot modify this file
    },
  ],
})
```

### Lock All Files from Repository

```typescript
// Import repository with all files locked
const chat = await v0.chats.init({
  type: 'repo',
  repo: {
    url: 'https://github.com/username/my-app',
  },
  lockAllFiles: true, // Prevents AI from modifying any files
})
```

### Lock All Files from Zip

```typescript
// Import zip archive with all files locked
const chat = await v0.chats.init({
  type: 'zip',
  zip: {
    url: 'https://example.com/project.zip',
  },
  lockAllFiles: true, // Protects all imported files
})
```

## Updating File Locks

### Update Files and Lock Status

```typescript
// Update file content and lock status
await v0.chats.updateVersion({
  chatId: 'chat_123',
  versionId: 'version_456',
  files: [
    {
      name: 'src/components/Button.tsx',
      content: updatedButtonCode,
      locked: true, // Lock this file after updating
    },
    {
      name: 'src/utils/helpers.ts',
      content: helperCode,
      locked: false, // Keep this file unlocked
    },
  ],
})
```

### Lock Existing Files

```typescript
// Lock files without changing content
await v0.chats.updateVersion({
  chatId: 'chat_123',
  versionId: 'version_456',
  files: [
    {
      name: 'package.json',
      content: existingPackageJson, // Same content
      locked: true, // Just lock the file
    },
  ],
})
```

## Common Use Cases

### 1. Protect Configuration Files

```typescript
const chat = await v0.chats.init({
  type: 'files',
  files: [
    // Source code - AI can modify
    { name: 'src/App.tsx', content: appCode, locked: false },
    { name: 'src/components/Header.tsx', content: headerCode, locked: false },

    // Configuration - AI cannot modify
    { name: 'package.json', content: packageJson, locked: true },
    { name: 'tsconfig.json', content: tsConfig, locked: true },
    { name: '.env.example', content: envExample, locked: true },
    { name: 'README.md', content: readme, locked: true },
  ],
})
```

### 2. Preserve Working Components

```typescript
const chat = await v0.chats.init({
  type: 'files',
  files: [
    // Working component - protect from changes
    {
      name: 'src/components/WorkingButton.tsx',
      content: workingButtonCode,
      locked: true,
    },

    // New component - AI can build this
    {
      name: 'src/components/NewCard.tsx',
      content: '',
      locked: false,
    },
  ],
})
```

### 3. Import and Selectively Protect

```typescript
// First, import everything unlocked
const chat = await v0.chats.init({
  type: 'repo',
  repo: {
    url: 'https://github.com/username/project',
  },
  lockAllFiles: false,
})

// Then lock specific files
await v0.chats.updateVersion({
  chatId: chat.id,
  versionId: chat.latestVersion.id,
  files: [
    // Lock configuration files only
    { name: 'package.json', content: existingPackageJson, locked: true },
    { name: 'vite.config.ts', content: existingViteConfig, locked: true },
  ],
})
```

## Best Practices

### 1. Lock Configuration Files

```typescript
// ✅ Good: Always lock configuration files
const configFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'next.config.js',
  '.env.example',
  'README.md',
]

const chat = await v0.chats.init({
  type: 'files',
  files: [
    ...sourceFiles.map((f) => ({ ...f, locked: false })),
    ...configFiles.map((f) => ({ ...f, locked: true })),
  ],
})
```

### 2. Protect Working Code

```typescript
// ✅ Good: Lock files that are already working
const chat = await v0.chats.init({
  type: 'files',
  files: [
    // Tested, working components
    { name: 'src/components/Button.tsx', content: buttonCode, locked: true },
    { name: 'src/utils/api.ts', content: apiCode, locked: true },

    // New features AI should build
    { name: 'src/components/Dashboard.tsx', content: '', locked: false },
    { name: 'src/pages/Settings.tsx', content: '', locked: false },
  ],
})
```

### 3. Use Descriptive Comments

```typescript
// ✅ Good: Explain why files are locked
const chat = await v0.chats.init({
  type: 'files',
  files: [
    {
      name: 'src/components/PaymentForm.tsx',
      content: paymentFormCode,
      locked: true, // Critical payment logic - don't modify
    },
    {
      name: 'src/components/UserProfile.tsx',
      content: profileCode,
      locked: false, // Needs UI improvements
    },
  ],
})
```

### 4. Strategic Locking for Large Projects

```typescript
// For large imports, lock everything first, then unlock what AI should modify
const chat = await v0.chats.init({
  type: 'repo',
  repo: {
    url: 'https://github.com/company/large-app',
  },
  lockAllFiles: true, // Protect everything initially
})

// Then unlock specific files for AI to work on
await v0.chats.updateVersion({
  chatId: chat.id,
  versionId: chat.latestVersion.id,
  files: [
    // Unlock only the component that needs work
    {
      name: 'src/components/ProductCard.tsx',
      content: existingProductCard,
      locked: false, // AI can improve this component
    },
  ],
})
```

## File Lock Status

When files are locked:

- ✅ **AI will not modify** the file content during generation
- ✅ **File remains available** for reference and context
- ✅ **You can still manually update** locked files via API
- ✅ **Lock status persists** across chat sessions

When files are unlocked:

- ⚠️ **AI can freely modify** the file content
- ⚠️ **Changes may overwrite** your existing code
- ✅ **AI uses file for context** when generating other files
- ✅ **You can lock again** at any time

File locks give you precise control over what the AI can and cannot change, ensuring your important code stays protected while still allowing AI assistance where you need it.

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
