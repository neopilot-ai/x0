---
title: Sandbox
description: Per-chat isolated execution environment powered by Vercel Sandbox (Firecracker microVMs)
product: v0
type: guide
related:
  - /docs/api/v2/guides/accessing-previews
  - /docs/api/v2/guides/custom-chat-interface
  - /docs/api/v2/reference/chats/get-preview-url
  - /docs/api/v2/guides/v0-sdk
---

# Sandbox

v0 runs each generated application in a per-chat sandbox — an isolated execution environment powered by **Vercel Sandbox** (Firecracker microVMs) that provides safe preview, testing, and development capabilities without affecting production resources.

## How the Sandbox Works

Each chat creates an isolated sandbox environment. When v0 generates an application, it runs in this sandbox:

1. **Per-chat isolation** — Every chat gets its own sandbox, keeping generated apps separate from each other
2. **Secure execution** — Generated code runs in a restricted environment
3. **Preview access** — Sandboxed apps are accessible via preview URLs for inspection and embedding
4. **Resource isolation** — Each sandbox has its own compute resources, preventing cross-chat interference

## Where You See the Sandbox

The sandbox is accessed through several interfaces:

- **Preview tab** — View and interact with the running application
- **Console panel** — Access Logs and Terminal tabs
- **Code editor** — Edit code directly in the sandboxed environment

## What Runs Inside

Inside each sandbox:

- **Node.js** runtime (and other frameworks)
- **pnpm, npm, yarn, bun** package managers
- **Framework-aware dev server** — Starts automatically
- **Environment variables** — Configured for the project
- **Isolated filesystem** — Persists between sessions

The default working directory is `/vercel/sandbox`. The sandbox runs as the `vercel-sandbox` user.

## Sandbox Network Policy

The sandbox has a defined network policy that controls outbound connections. The network policy restricts access to ensure the sandbox operates securely.

## Isolation Boundaries

- **Per-chat** — Each chat gets its own isolated sandbox
- **Per user/team** — Sandboxes are scoped to the user or team
- **From production** — Sandboxed applications are completely isolated from production resources

## Sandbox Lifecycle

Sandboxes have a defined lifecycle:

- **30-minute lifetime** — Sandboxes are automatically created when needed
- **Auto-extension** — Sandboxes extend by 10 minutes when you interact with them
- **24-hour cap** — Maximum sandbox lifetime before restart

### Filesystem Persistence

The sandbox filesystem persists between sessions within the lifetime of the chat. Files created during the session are preserved even when the sandbox restarts.

## Media

- [Sandbox Startup Video](https://v0.app/docs/videos/sandbox-startup.mp4)
- [Console Video](https://v0.app/docs/videos/console.mp4)

## Sandbox vs Preview

| Feature     | Sandbox                        | Preview               |
| ----------- | ------------------------------ | --------------------- |
| Environment | Vercel Sandbox (microVM)       | Standalone deployment |
| Access      | Code editor, Terminal, Console | iframe URL            |
| Isolation   | Per-chat                       | Per-deployment        |
| Persistence | Filesystem between sessions    | Read-only             |
| Execution   | Running dev server             | Built static site     |
