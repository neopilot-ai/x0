---
title: AI Tools Adapter
description: AI tools adapter for integrating v0 with AI frameworks
product: v0
type: reference
---

# AI Tools Adapter

The AI Tools adapter provides a bridge between v0 and AI frameworks, enabling AI-powered code generation and management.

## Overview

The AI Tools adapter wraps v0 functionality into a format consumable by AI agents and frameworks. It provides:

- Code generation tools
- File manipulation tools
- Terminal command execution
- Sandbox management

## Installation

```bash
npm install @v0-sdk/ai-tools
```

## Usage

```typescript
import { createV0AIAdapter } from '@v0-sdk/ai-tools'

const adapter = createV0AIAdapter({
  apiKey: process.env.V0_API_KEY,
})
```

## Tools

The adapter provides the following tools:

- `generate` — Generate code from prompts
- `edit` — Edit existing code
- `run` — Execute commands in the sandbox
- `preview` — Access application previews
- `sandbox` — Manage sandbox environments

## Configuration

Configure the adapter with your API key and optional settings:

- `apiKey` — v0 API key or Vercel OIDC token
- `baseUrl` — Custom API endpoint
- `timeout` — Request timeout

## Related

- [v0 SDK AI Tools](/docs/api/platform/packages/v0-sdk-ai-tools)
- [MCP Server Adapter](/docs/api/platform/adapters/mcp-server)
