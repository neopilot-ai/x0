---
title: create-v0-sdk-app
description: CLI tool to bootstrap v0 applications (v2)
product: v0 API
type: reference
prerequisites:
  - /docs/api/v2/quickstart
related:
  - /docs/api/v2/guides/create-v0-sdk-app
---


---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# create-v0-sdk-app

> **Note**: This page covers the v2 package. The v1 documentation referenced templates like `classic-v0`, `ai-tools-example` and features like NextAuth.js, PostgreSQL with Drizzle ORM, multi-tenant architecture. The v2 package currently only supports the `v0-clone` example. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2).

## Installation

```bash
npx create-v0-sdk-app my-v0-app
```

## Usage

```bash
create-v0-sdk-app [directory] [options]
```

### Options

| Option | Description |
|--------|-------------|
| `-e, --example <name>` | Example to bootstrap (default: `v0-clone`) |
| `--use-pnpm` | Use pnpm as package manager |
| `--use-npm` | Use npm as package manager |
| `--use-yarn` | Use Yarn as package manager |
| `--use-bun` | Use Bun as package manager |
| `--skip-install` | Skip installing packages |

## Currently Available Example

### v0-clone

A full-featured v0 clone built with the v0 SDK, including:
- A complete chat interface with live previews
- AI SDK `useChat` integration with `V0Transport`
- Preview proxy routes
- Vercel deployment configuration

```bash
npx create-v0-sdk-app my-app --example v0-clone
```

## Generated Project Structure

The bootstrapped project includes:
- `app/` - Next.js app directory with chat pages
- `lib/` - v0 client, proxy, and utility code
- `components/` - UI components for the chat interface
- `hooks/` - Custom hooks for settings and chat management
- `api/` - API routes for v0 proxy

## Programmatic Usage

```ts
import { createApp } from 'create-v0-sdk-app'

await createApp({
  appPath: './my-app',
  packageManager: 'pnpm',
  example: 'v0-clone',
  skipInstall: false,
})
```

## Requirements

- Node.js >= 22
- pnpm >= 9 (recommended)

For a complete guide, see [create-v0-sdk-app Guide](/docs/api/v2/guides/create-v0-sdk-app).
