---
title: MCP Server Adapter
description: MCP server adapter for IDE integration
product: v0
type: reference
---

# MCP Server Adapter

The MCP Server adapter enables v0 integration with IDEs through the Model Context Protocol (MCP).

## Overview

The MCP Server adapter allows you to connect v0 to IDEs like Cursor, Claude Desktop, and VS Code through the MCP protocol.

## Setup

### Cursor

Add the v0 MCP server to your Cursor settings:

```json
{
  "mcpServers": {
    "v0": {
      "url": "https://mcp.v0.dev"
    }
  }
}
```

### Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "v0": {
      "url": "https://mcp.v0.dev"
    }
  }
}
```

### VS Code

Use the v0 MCP server extension for VS Code integration.

## Usage

Once connected, the MCP server provides tools for:

- Code generation
- Chat management
- Preview access
- Sandbox control

## Endpoints

The MCP server is available at `https://mcp.v0.dev`.

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [v0 Platform API](/docs/api/platform/overview)
