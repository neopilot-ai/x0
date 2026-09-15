---
title: create-v0-sdk-app
description: Scaffold a v0 SDK app from an example template with one command
product: v0
type: reference
---

# create-v0-sdk-app

The `create-v0-sdk-app` CLI scaffolds a new v0 SDK project from an example template (currently `v0-clone`, a full-featured v0 clone built with the v0 SDK). Templates are downloaded from `vercel/v0-sdk/examples`.

## Installation

```bash
npx create-v0-sdk-app my-app
```

If no directory is given, the CLI prompts for a project name (default `my-v0-app`).

## Usage

```bash
create-v0-sdk-app [directory] [options]
```

## Options

- `-e, --example <example-name>` — example to bootstrap with. Available: `v0-clone`
- `--use-pnpm` — bootstrap using pnpm (recommended)
- `--use-npm` — bootstrap using npm
- `--use-yarn` — bootstrap using Yarn
- `--use-bun` — bootstrap using Bun
- `--skip-install` — skip installing packages
- `-v, --version` — output the version
- `-h, --help` — display help

## Getting started

After scaffolding, the generated app provides standard scripts:

```bash
cd my-app
npm run dev    # starts the web app and preview proxy
npm run build  # builds both apps for production
npm run start  # runs both built apps in production mode
```

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [v0 React Package](/docs/api/platform/packages/v0-sdk-react)
