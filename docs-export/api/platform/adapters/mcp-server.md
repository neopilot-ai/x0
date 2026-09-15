---
title: MCP Server Adapter
description: Use v0 as an MCP server in IDEs, and manage custom MCP servers via the API
product: v0
type: reference
---

# MCP Server Adapter

The MCP Server adapter works in two directions: use **v0 as an MCP server** inside IDEs through the Model Context Protocol, and **manage your own MCP servers** (custom tools v0 can call during generation) via the `mcpServers` API.

## Using v0 as an MCP server (IDE integration)

Connect v0 to IDEs like Cursor, Claude Desktop, and VS Code through the MCP protocol. The hosted server is available at `https://mcp.v0.dev`.

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

Once connected, the MCP server provides tools for code generation, chat management, preview access, and sandbox control.

## Managing custom MCP servers via the API

Register your own MCP servers (Linear, Notion, Sentry, presets, or fully custom) so v0 can call their tools during generation. Limited to 100 servers per user. See [MCP Integrations](/docs/MCP) for the product workflow.

```typescript
import { v0 } from 'v0'

const server = await v0.mcpServers.create({
  name: 'Linear',
  url: 'https://mcp.linear.example.com',
  enabled: true,
  auth: { type: 'bearer', token: process.env.LINEAR_MCP_TOKEN! },
  scope: 'team',
})

if (server.error) throw new Error(server.error.message)
```

Auth types: `none`, `bearer` (`token`), `custom-headers` (`headers`), `oauth` (`config`, `connected`). Scope is `user` or `team`.

Attach a server to a generation with `mcpServerIds`:

```typescript
const chat = await v0.chats.create({
  message: 'Query the database and show results',
  mcpServerIds: ['mcp_abc123'],
})
```

Full CRUD is available: `v0.mcpServers.create/list/get/update/delete`, mirrored by the `useCreateMcpServer`, `useMcpServers`, `useMcpServer`, `useUpdateMcpServer`, `useDeleteMcpServer` SWR hooks and the `mcpServers*` AI tools.

## Related

- [v0 SDK](/docs/api/platform/packages/v0-sdk)
- [v0 Platform API](/docs/api/platform/overview)
- [MCP Integrations](/docs/MCP)
- [MCP Server Reference](/docs/api/v2/reference/mcp-servers)
