---
title: v0 SDK
description: The v0 SDK package for accessing the v0 API
product: v0
type: reference
---

# v0 SDK

The `@v0-sdk/react` and `v0` packages provide SDK access to the v0 Platform API.

## Installation

```bash
npm install v0 @v0-sdk/react
```

## Usage

### Client

Create a v0 client to access the Platform API:

```typescript
import { createClient } from 'v0'

const client = createClient({
  apiKey: process.env.V0_API_KEY,
})
```

### React Hooks

Use the `@v0-sdk/react` package for React integration:

```tsx
import { V0SandboxProvider, V0SandboxPreview } from '@v0-sdk/react'
```

## Endpoints

The SDK wraps all Platform API endpoints including:

- Projects
- Chats
- Deployments
- Integrations
- Hooks
- Rate Limits
- User
- Reports

## Authentication

Authentication is handled via `V0_API_KEY` or Vercel OIDC. See [Authentication](/docs/api/v2/guides/authentication).

## Related

- [v0 API Overview](/docs/api/v2)
- [v0 React Package](/docs/api/platform/packages/v0-sdk-react)
- [v0 AI Tools Package](/docs/api/platform/packages/v0-sdk-ai-tools)
