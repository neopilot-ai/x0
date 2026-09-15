# Agent-Facing Documentation

## Overview

This documentation is designed for AI agents to discover and use the v0 API.

## API Reference

### v2 API
- **Base URL**: `https://api.v0.app/v2`
- **Authentication**: Bearer token (`V0_API_KEY`) or Vercel OIDC on Vercel
- **Endpoints**: See [/docs/api/v2/reference](/docs/api/v2/reference)

### MCP Server
- **Transport**: Streamable HTTP
- **Endpoints**: See [/docs/api/v2/guides/mcp-server](/docs/api/v2/guides/mcp-server)

## SDK
- **v0 SDK**: See [/docs/api/v2/guides/v0-sdk](/docs/api/v2/guides/v0-sdk)
- **React Transport**: See [/docs/api/v2/guides/react-transport](/docs/api/v2/guides/react-transport)
- **AI Tools**: See [/docs/api/v2/guides/ai-tools-guide](/docs/api/v2/guides/ai-tools-guide)
- **Browser Entry**: See [/docs/api/v2/guides/browser-entry](/docs/api/v2/guides/browser-entry)

## Core endpoints

- `GET /v2/chats` - List chats
- `POST /v2/chats` - Create chat
- `GET /v2/chats/:id` - Get chat
- `POST /v2/chats/:id/messages` - Send message
- `GET /v2/chats/:id/preview` - Get preview URL (poll until non-null)
- `POST /v2/chats/:id/deploy` - Trigger a Vercel deployment
- `POST /v2/settings/preview-hosts` - Set trusted preview hosts

## Skills

Attach skills via the `skills` field on chat create / message send (max 3). Design-system skills are `memory` skills:

```typescript
skills: [{ type: 'memory', scope: 'team', skillName: 'acme-ui' }]
```

Other shapes: `{ type: 'remote', id }` (skills.sh), `{ type: 'project', skillName }` (repo skill). SDK builders: `memorySkill()`, `remoteSkill()`, `projectSkill()` from `v0/design-systems`. See [/docs/api/v2/guides/design-systems](/docs/api/v2/guides/design-systems).

## Deployments

Publish with `POST /v2/chats/:id/deploy`, create the project first with `POST /v2/chats/:id/vercel-project`, import repos with `POST /v2/chats/from-repo`. SDK helpers: `publishChat()`, `createVercelProjectForChat()`, `waitForPreview()`, `importRepoAsChat()` from `v0/deployments`. See [/docs/deployments](/docs/deployments).

## Sandbox and preview

Each chat runs in an isolated Vercel Sandbox microVM with a code editor, terminal, and preview URL. SDK: `useV0Sandbox` / `V0SandboxPreview` from `@v0-sdk/react`. See [/docs/sandbox](/docs/sandbox).

## Streaming

`createStream` / `sendStream` / `resolveStream` return a `V0StreamResult` (`stream` async iterable + `final` promise). Resume with `shouldResumeV0Chat`. See [/docs/api/v2/guides/streaming-result](/docs/api/v2/guides/streaming-result) and [/docs/api/v2/guides/resuming-streams](/docs/api/v2/guides/resuming-streams).

## Code Editing

See [/docs/code-editing](/docs/code-editing) for code editor features.

## Terminal Commands

See [/docs/terminal-commands](/docs/terminal-commands) for Bash tool and permission modes.

## Platform API

See [/docs/api/platform/overview](/docs/api/platform/overview) for platform API endpoints.

## Pre-installed Agents

See [/docs/pre-installed-agents](/docs/pre-installed-agents) for available agents.

## Instructions

See [/docs/instructions](/docs/instructions) for configuration.

## Paper Mode

See [/docs/paper](/docs/paper) for paper mode configuration.

## Design Systems

See [/docs/design-systems-2](/docs/design-systems-2) for design system skills.

## Skills.sh

See [/docs/api/v2/guides/skills-sh](/docs/api/v2/guides/skills-sh) for skills.sh integration.
