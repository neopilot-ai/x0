---
title: create-v0-sdk-app
description: CLI tool to bootstrap v0 applications
product: v0 API
type: guide
related:
  - /docs/api/v2/quickstart
  - /docs/api/v2/guides/custom-chat-interface
---

# create-v0-sdk-app

`create-v0-sdk-app` is a command-line tool that bootstraps a complete v0 application with one command. It generates a full chat interface with live previews using the v0 SDK.

## Installation

```bash
npx create-v0-sdk-app my-v0-app
```

Or use it directly:

```bash
npm install -g create-v0-sdk-app
create-v0-sdk-app my-v0-app
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
| `-h, --help` | Display help message |
| `-v, --version` | Output the current version |

### Examples

Currently, the `v0-clone` example is available:

```bash
npx create-v0-sdk-app my-app --example v0-clone
```

The `v0-clone` example creates a full-featured v0 clone built with the v0 SDK, including:
- A complete chat interface with live previews
- AI SDK `useChat` integration with `V0Transport`
- Preview proxy routes
- Vercel deployment configuration

## Generated Project Structure

The bootstrapped project includes:
- `app/` - Next.js app directory with chat pages
- `lib/` - v0 client, proxy, and utility code
- `components/` - UI components for the chat interface
- `hooks/` - Custom hooks for settings and chat management
- `api/` - API routes for v0 proxy

## Example: Customizing the Generated App

After bootstrapping, customize the chat interface by modifying:

1. **`app/chat.tsx`** - The main chat component
2. **`lib/proxy.ts`** - The v0 proxy route handler
3. **`lib/v0-client.ts`** - The v0 client configuration
4. **`components/`** - UI components

## Programmatic Usage

`create-v0-sdk-app` ships as a CLI binary only (no library entrypoint), so `createApp` cannot be imported from the published package. To scaffold programmatically, invoke the CLI from a script:

```bash
npx create-v0-sdk-app ./my-app --example v0-clone
```

The underlying `createApp({ appPath, packageManager, example, skipInstall })` helper lives in the package source (`src/create-app.ts`) alongside the CLI.

## Package Manager

The CLI auto-detects your package manager from the presence of `bun.lock`, `pnpm-lock.yaml`, `yarn.lock`, or `package-lock.json`. You can override this with `--use-pnpm`, `--use-npm`, `--use-yarn`, or `--use-bun`.

## Requirements

- Node.js >= 22
- pnpm >= 9 (recommended)
