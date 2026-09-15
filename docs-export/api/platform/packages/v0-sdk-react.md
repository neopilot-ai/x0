---
title: v0 SDK React
description: React hooks and components for the v0 SDK
product: v0
type: reference
---

# v0 SDK React

The `@v0-sdk/react` package provides React hooks and components for integrating v0 into your applications.

## Installation

```bash
npm install @v0-sdk/react
```

## Usage

### V0SandboxProvider

Provides sandbox context for your React application:

```tsx
import { V0SandboxProvider } from '@v0-sdk/react'

function App() {
  return (
    <V0SandboxProvider>
      <YourApp />
    </V0SandboxProvider>
  )
}
```

### V0SandboxPreview

Render a sandboxed preview of your v0 application:

```tsx
import { V0SandboxPreview } from '@v0-sdk/react'

function Preview() {
  return <V0SandboxPreview chatId="..." />
}
```

### Hooks

- `useV0Sandbox` — Access sandbox state and controls
- `useV0Chat` — Access chat functionality
- `useV0Messages` — Access message history

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [V0SandboxProvider API](/docs/api/v2/reference/chats)
