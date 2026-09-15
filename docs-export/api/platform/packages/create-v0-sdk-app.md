---
title: create-v0-sdk-app
description: The CLI tool for creating v0 SDK projects
product: v0
type: reference
---

# create-v0-sdk-app

The `create-v0-sdk-app` CLI tool scaffolds a new v0 SDK project.

## Installation

```bash
npx create-v0-sdk-app my-app
```

## Usage

```bash
create-v0-sdk-app [project-name] [options]
```

## Options

- `--template` — Specify a project template
- `--typescript` — Use TypeScript (default)
- `--css` — Specify CSS framework

## Getting Started

After creating a project, install dependencies and start the development server:

```bash
cd my-app
npm install
npm run dev
```

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [v0 React Package](/docs/api/platform/packages/v0-sdk-react)
