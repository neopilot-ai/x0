---
title: MCP Server
description: The v0 MCP (Model Context Protocol) server allows you to integrate v0's capabilities directly into your IDE, providing seamless access to v0's AI-powered code generation and assistance.
product: v0 API
type: integration
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/MCP
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# MCP Server



## Overview

The v0 MCP server enables your IDE's AI assistant to:

* Create and manage v0 chats
* Access v0's code generation capabilities
* Leverage v0's design and development expertise
* Integrate v0 workflows into your development process

## Supported IDEs

The v0 MCP server works with any IDE that supports the Model Context Protocol, including:

* **Cursor** - AI-powered code editor
* **Claude Desktop** - Anthropic's Claude desktop application
* **VS Code** (with MCP extensions)
* **Any MCP-compatible IDE**

## Configuration

### Prerequisites

The v0 MCP server authenticates with OAuth—you don't need a v0 API key. You'll need [Node.js](https://nodejs.org/) installed so your IDE can run `npx mcp-remote`.

### IDE Configuration

Add the following configuration to your IDE's MCP settings. The first time your IDE connects, `mcp-remote` opens a browser so you can sign in to v0, choose the account or team the client should use, and approve the connection.

<Callout type="info">
  The MCP server uses OAuth for MCP clients. Do not put a v0 API key in your MCP client configuration.
</Callout>

#### Cursor

Add to your Cursor settings (`~/.cursor/mcp.json`):

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

#### Claude Desktop

Add to your Claude Desktop configuration (`~/.config/claude-desktop/config.json` on Linux/macOS or `%APPDATA%\Claude Desktop\config.json` on Windows):

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

#### VS Code

Install an MCP extension and add the v0 server configuration:

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

## Usage

Once configured, your IDE's AI assistant will have access to v0's MCP tools. You can:

### Create Chats

Ask your AI assistant to create new v0 chats with specific prompts:

```
"Create a v0 chat for building a React dashboard component"
```

### Access Chat Information

Get details about existing chats:

```
"Show me the details of v0 chat ID abc123"
```

### Find Chats

Search through your v0 chats:

```
"Find my v0 chats related to React components"
```

### Send Messages

Continue conversations in existing chats:

```
"Send a message to chat abc123 asking to add dark mode support"
```

### Resolve Tasks

When v0 pauses for input—such as approving a plan, answering a question, or granting a permission—resolve the task to let it continue:

```
"Approve the plan that v0 proposed in chat abc123"
```

### Get Previews

Get a preview URL for a chat's generated app:

```
"Get the preview URL for chat abc123"
```

## Troubleshooting

### Common Issues

**"Command not found: npx"**

* Install Node.js and npm: [https://nodejs.org/](https://nodejs.org/)

**"Connection failed"**

* Check your internet connection
* Verify the MCP server URL: `https://v0.app/api/mcp`
* Ensure your firewall allows outbound connections

**"Authentication failed"**

* Reconnect the v0 MCP server in your client to restart the OAuth flow
* If you need to switch accounts or teams, remove the existing v0 MCP connection in your client and connect again
* If your team requires SSO, complete the re-authentication link returned by the tool response, then retry the request

## Next Steps

After configuring the MCP server, explore the [v0 API documentation](/docs/api/v1/quickstart) to understand the full range of capabilities available through v0's API.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)