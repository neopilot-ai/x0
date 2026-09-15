---
title: Use v0 from an MCP Client
description: Let another agent use v0 through the v0 MCP server
product: v0 API
type: guide
related:
  - /docs/api/v2/guides/integrating-v0-into-agents
  - /docs/api/v2/reference/mcp-servers/create-mcp-server
  - /docs/api/v2/reference/chats/create-chat
---

# Use v0 from an MCP Client



The v0 MCP server lets another agent use v0. Connect it to an IDE, desktop assistant, or agent runtime to create chats, inspect and continue app builds, resolve pending tasks, and get preview URLs from an MCP client.

To give v0 access to an external service's tools instead, [create an MCP server](/docs/api/v2/reference/mcp-servers/create-mcp-server).

The MCP server runs at:

```txt
https://v0.app/api/mcp
```

## 1. Connect your MCP client

Use the remote MCP URL directly if your client supports streamable HTTP MCP servers:

```json
{
  "mcpServers": {
    "v0": {
      "url": "https://v0.app/api/mcp"
    }
  }
}
```

If your client requires a local stdio bridge, use `mcp-remote`:

```json
{
  "mcpServers": {
    "v0": {
      "command": "npx",
      "args": ["mcp-remote", "https://v0.app/api/mcp"]
    }
  }
}
```

The first connection starts an OAuth flow. Sign in to v0, choose the account or team you want the client to use, and approve the connection.

<Callout type="info">
  The MCP server uses OAuth for MCP clients. Do not put a v0 API key in your MCP client configuration.
</Callout>

## 2. Use v0 tools

The v0 MCP server exposes tools backed by these v0 API endpoints:

* Create chat: `POST /v2/chats`
* List chats: `GET /v2/chats`
* Get chat: `GET /v2/chats/{chatId}`
* List messages: `GET /v2/chats/{chatId}/messages`
* Send message: `POST /v2/chats/{chatId}/messages`
* Resolve task: `POST /v2/chats/{chatId}/messages/resolve`
* Get preview: `GET /v2/chats/{chatId}/preview`

Tools that return a chat (such as create chat and get chat) include a ready-to-open `url` for the chat, scoped to the account or team you connected, so you don't have to construct it yourself.

## 3. Try common workflows

Once connected, ask your MCP client to work with v0.

### Create a chat

```txt
Create a v0 chat that builds a React dashboard with charts and filters.
```

### List chats

```txt
List my v0 chats related to React dashboards.
```

### Get chat details

```txt
Show me the details of v0 chat chat_abc123.
```

### List messages in a chat

```txt
List the messages in v0 chat chat_abc123.
```

### Continue an existing chat

```txt
Send a message to chat chat_abc123 asking v0 to add dark mode support.
```

### Resolve a pending task

When v0 pauses for input—such as approving a plan, answering a question, granting a permission, or finishing integration setup—resolve the task to let it continue.

```txt
Approve the plan that v0 proposed in chat chat_abc123.
```

### Get a preview URL

```txt
Get the preview URL for chat chat_abc123.
```

## 4. Reconnect or change accounts

If the client loses access, reconnect the v0 MCP server from your MCP client. If you need to switch users or teams, remove the existing v0 MCP connection in the client and connect to `https://v0.app/api/mcp` again.

## Troubleshooting

**Connection failed**

* Verify the MCP server URL is `https://v0.app/api/mcp`.
* Make sure your MCP client supports remote MCP servers or is configured through `mcp-remote`.

**Authentication failed**

* Reconnect the v0 MCP server in your client.
* If your team requires SSO, complete the re-authentication link returned by the tool response, then retry the request.

**Tool is missing**

* Restart or reconnect your MCP client so it refreshes the server's tool list.
* Check the v0 API v2 reference for the resource you expect the MCP server to use.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)