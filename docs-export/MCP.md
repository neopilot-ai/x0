---
title: MCP
description: MCP server integration
product: v0
type: guide
---

# MCP

Integrate MCP servers with v0 for extended tool capabilities.

## Creating MCP Servers

```typescript
await v0.mcpServers.create({
  name: 'Linear',
  url: 'https://mcp.linear.com',
  auth: { type: 'none' },
  scope: 'user',
})
```

## Available Endpoints

- Create, list, get, update, and delete MCP servers
- Configure authentication (none, bearer, custom-headers, oauth)
- Set scope to user or team
