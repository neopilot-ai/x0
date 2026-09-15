---
title: v1 Quickstart
description: Get started with the v1 API (Deprecated)
product: v0 API
type: guide
related:
  - /docs/api/v2/quickstart
  - /docs/api/v2/guides/migrating-from-v1-to-v2
---

# v1 Quickstart (Deprecated)

> **Warning**: The v1 API has been deprecated. All features have been replaced by the v2 API. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current quickstart.

## v1 SDK (Deprecated)

The v1 SDK used `v0-sdk` with a `V0` class. This has been replaced by the `v0` package.

### Installation (Deprecated)

```bash
npm install v0-sdk
```

### Authentication (Deprecated)

```bash
V0_API_KEY=your_api_key_here
```

```ts
import { V0 } from 'v0-sdk'
const v0 = new V0({ apiKey: process.env.V0_API_KEY })
```

### Usage (Deprecated)

```ts
import { V0 } from 'v0-sdk'

const chat = await v0.chats.create({
  message: 'Create a todo app',
})
```

## Migrate to v2

The v2 API is simpler and more powerful:

```bash
npm install v0@canary
```

```ts
import { v0 } from 'v0'

const response = await v0.chats.create({
  message: 'Build me a personal website',
})
```

See [v2 Quickstart](/docs/api/v2/quickstart) for the complete guide.
