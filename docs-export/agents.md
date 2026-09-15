# Agent-Facing Documentation

## Overview

This documentation is designed for AI agents to discover and use the v0 API.

## API Reference

### v2 API
- **Base URL**: `https://api.v0.app/v2`
- **Authentication**: Bearer token
- **Endpoints**: See [/docs/api/v2/reference](/docs/api/v2/reference)

### MCP Server
- **Transport**: Streamable HTTP
- **Endpoints**: See [/docs/api/v2/guides/mcp-server](/docs/api/v2/guides/mcp-server)

## SDK
- **v0 SDK**: See [/docs/api/v2/guides/v0-sdk](/docs/api/v2/guides/v0-sdk)
- **React Transport**: See [/docs/api/v2/guides/react-transport](/docs/api/v2/guides/react-transport)
- **AI Tools**: See [/docs/api/v2/guides/ai-tools-guide](/docs/api/v2/guides/ai-tools-guide)
- **Browser Entry**: See [/docs/api/v2/guides/browser-entry](/docs/api/v2/guides/browser-entry)

## Search

Use the v0 API to search and retrieve information:
- `GET /v2/chats` - List chats
- `POST /v2/chats` - Create chat
- `GET /v2/chats/:id` - Get chat
- `POST /v2/chats/:id/messages` - Send message
- `GET /v2/chats/:id/preview` - Get preview URL
- `POST /v2/settings/preview-hosts` - Set trusted preview hosts

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
