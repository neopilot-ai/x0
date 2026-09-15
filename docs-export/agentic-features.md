---
title: Agentic Features
description: v0's intelligent agent capabilities for web search, browser use, terminal commands, error fixing, and external tool integration
product: v0
type: conceptual
related:
  - /docs/terminal-commands
  - /docs/pre-installed-agents
  - /docs/MCP
  - /docs/sandbox
---

# Agentic Features

v0 is an intelligent agent that can autonomously perform complex tasks beyond generating code. It combines web search, browser use, error fixing, terminal commands, and external tool integration into a development assistant that acts on your behalf. Every action runs inside an isolated [sandbox](/docs/sandbox), and you control how much autonomy v0 has.

## Core agent capabilities

### Web search

v0 can search the web in real time when you ask about current information, documentation, or APIs. Results appear inline with clickable source links so you can verify them.

### Browser use

v0 can open the apps it builds, use them, critique designs, debug complex flows, and fix things proactively. While it works, v0 sends you screenshots of what it sees. It can also visit external URLs to capture visual references or inspect a page's layout before recreating it.

### Automatic error fixing

When v0 detects errors in your project, it can diagnose and fix them automatically as part of the generation loop — missing files and dependencies, syntax issues, runtime errors, and import/export problems.

### Fix with v0

When a deployment has errors or warnings, a **Fix with v0** button appears in the deployment popover. Clicking it sends the error logs to v0, which diagnoses the issue and applies a fix automatically. Paid plans get free daily uses on unedited code; after the cap, fixes cost credits like a normal prompt.

See [Deployments — Troubleshooting](/docs/deployments#troubleshooting) for more on resolving deployment issues.

## External tool integration

### Marketplace integrations

v0 integrates with services from the [Vercel Marketplace](https://vercel.com/marketplace), including databases (Neon, Supabase, Upstash), payment providers (Stripe), and AI model platforms. Install and manage them from **Project menu** → **Settings** → **Integrations**. Marketplace integrations can expose tools that v0 calls during generation to query your data or manage resources.

### MCP servers

For services outside the Marketplace, v0 supports the [Model Context Protocol (MCP)](/docs/MCP). Bring your own MCP servers (Linear, Notion, Sentry, and others) or choose from presets. Attach a server to a chat via `mcpServerIds`:

```typescript
import { v0 } from 'v0'

const server = await v0.mcpServers.create({
  name: 'Database MCP',
  url: 'https://mcp.database.example.com',
  auth: { type: 'none' },
  scope: 'team',
})

const chat = await v0.chats.create({
  message: 'Query the database and show results',
  mcpServerIds: ['mcp_abc123'],
})
```

## Terminal commands

v0 can run shell commands inside the [sandbox](/docs/sandbox) to test interactions, inspect your repo, run unit tests, and call platform CLIs. Control autonomy through three [permission modes](/docs/terminal-commands#permission-modes): Ask, Auto, and Full.

## How agent capabilities work

When you ask v0 to perform actions requiring external information or tools, it automatically:

- **Coordinates multiple tasks**: Handles complex multi-step workflows
- **Maintains context**: Remembers previous actions and results throughout the conversation
- **Provides real-time feedback**: Shows progress, screenshots, citations, and tool-execution cards
- **Handles errors gracefully**: Recovers from issues and tries alternative approaches

## Agent control

You have full control over agent execution:

- **Stop**: Interrupt the agent at any time
- **Auto-continue**: v0 progresses through multi-step tasks automatically
- **Task visibility**: Each step the agent takes is visible in the chat

## Getting started

v0 picks the right capability based on what you ask:

- **"Search for the latest React best practices"** triggers a web search.
- **"Open my app and test the signup flow"** launches a browser use session.
- **"Check the latest Vercel deployment logs"** calls the Vercel CLI through the terminal.
- **"Connect to my Supabase database"** sets up a Marketplace integration.
- **"Run the unit tests and fix any failures"** uses the terminal.

## See Also

- [MCP Servers](/docs/api/v2/reference/mcp-servers)
- [Pre-installed agents](/docs/pre-installed-agents)
