---
title: OAuth MCP Servers
description: Configure OAuth-authenticated MCP servers with the v0 API
product: v0 API
type: guide
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/reference/mcp-servers/create
  - /docs/api/v1/reference/mcp-servers/create-oauth-authorization-url
  - /docs/api/v1/reference/mcp-servers/update
  - /docs/api/v1/reference/chats/create
---

# OAuth MCP Servers



Use OAuth MCP servers when an MCP provider requires a user authorization flow before v0 can call its tools. The v0 API stores the MCP server configuration, creates a provider authorization URL, stores tokens from the OAuth callback, and redirects back to your application.

## 1. Register the OAuth client

Register v0 as an OAuth client with your MCP provider.

Use this redirect URI for v0 API OAuth flows:

```txt
https://api.v0.dev/v1/mcp-servers/oauth/callback
```

If the provider supports Client ID Metadata Documents, use this URL as the client ID:

```txt
https://v0.app/api/chat/integrations/oauth/client-metadata.json
```

If the provider requires dynamic client registration or a manually registered OAuth app, use the provider's registration flow and save the resulting client ID and optional client secret.

## 2. Create the MCP server

Create the MCP server with `auth.type` set to `oauth`. The `resource` value is usually the MCP server URL and is sent as an RFC 8707 resource indicator during authorization.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const server = await v0.mcpServers.create({
  name: 'Linear',
  url: 'https://mcp.linear.app/mcp',
  auth: {
    type: 'oauth',
    config: {
      authorizationUrl: 'https://linear.app/oauth/authorize',
      tokenUrl: 'https://api.linear.app/oauth/token',
      clientId: 'your-client-id',
      scopes: ['read'],
      usePKCE: true,
      resource: 'https://mcp.linear.app/mcp',
    },
  },
})

console.log(server.id)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/mcp-servers \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Linear",
    "url": "https://mcp.linear.app/mcp",
    "auth": {
      "type": "oauth",
      "config": {
        "authorizationUrl": "https://linear.app/oauth/authorize",
        "tokenUrl": "https://api.linear.app/oauth/token",
        "clientId": "your-client-id",
        "scopes": ["read"],
        "usePKCE": true,
        "resource": "https://mcp.linear.app/mcp"
      }
    }
  }'`}
  />
</CustomCodeBlock>

The server is created disconnected. The API response redacts secret values and returns only the authentication type.

## 3. Create an authorization URL

Create an authorization URL for the MCP server and redirect the user to it from your application. The `returnUrl` is an absolute URL in your application.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { redirect } from 'next/navigation'
import { v0 } from 'v0-sdk'

const authorization = await v0.mcpServers.createOAuthAuthorizationUrl({
  mcpServerId: 'mcp_123',
  returnUrl: 'https://your-app.example.com/oauth/v0-mcp/callback',
})

redirect(authorization.url)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/mcp-servers/mcp_123/oauth/authorize \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "returnUrl": "https://your-app.example.com/oauth/v0-mcp/callback"
  }'`}
  />
</CustomCodeBlock>

The authorization URL expires after 5 minutes.

## 4. Handle the return URL

After the user authorizes with the MCP provider, v0 stores the OAuth tokens and redirects to your `returnUrl`.

On success, v0 appends:

```txt
?oauth_success=true&mcpServerId=mcp_123
```

On failure, v0 appends:

```txt
?error=access_denied&error_description=The+user+denied+access&mcpServerId=mcp_123
```

After authorization, v0 can attach the stored OAuth token when it calls the MCP server. If the token expires and the provider issued a refresh token, v0 refreshes it automatically.

## 5. Use the server in chats

Pass the MCP server ID when creating a chat or sending a message.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const chat = await v0.chats.create({
  message: 'Use Linear context to summarize my active issues',
  mcpServerIds: ['mcp_123'],
})

await v0.chats.sendMessage({
  chatId: chat.id,
  message: 'Create a project plan from those issues',
  mcpServerIds: ['mcp_123'],
})`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/chats \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Use Linear context to summarize my active issues",
    "mcpServerIds": ["mcp_123"]
  }'

curl -X POST https://api.v0.dev/v1/chats/chat_123/messages \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a project plan from those issues",
    "mcpServerIds": ["mcp_123"]
  }'`}
  />
</CustomCodeBlock>

If the user has not authorized the server yet, v0 will not load its tools for the chat.

## Updating OAuth configuration

Use `v0.mcpServers.update()` to replace the stored OAuth configuration.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

await v0.mcpServers.update({
  mcpServerId: 'mcp_123',
  auth: {
    type: 'oauth',
    config: {
      authorizationUrl: 'https://auth.example.com/oauth/authorize',
      tokenUrl: 'https://auth.example.com/oauth/token',
      clientId: 'updated-client-id',
      scopes: ['read', 'write'],
      usePKCE: true,
      resource: 'https://mcp.example.com/mcp',
    },
  },
})`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X PATCH https://api.v0.dev/v1/mcp-servers/mcp_123 \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "auth": {
      "type": "oauth",
      "config": {
        "authorizationUrl": "https://auth.example.com/oauth/authorize",
        "tokenUrl": "https://auth.example.com/oauth/token",
        "clientId": "updated-client-id",
        "scopes": ["read", "write"],
        "usePKCE": true,
        "resource": "https://mcp.example.com/mcp"
      }
    }
  }'`}
  />
</CustomCodeBlock>

If the provider changes client IDs, scopes, or token endpoints, create a new authorization URL and have the user authorize the MCP server again.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)