---
title: Create MCP Server OAuth Authorization URL
description: Creates an OAuth authorization URL for an OAuth MCP server. Redirect the user to the returned URL to complete authorization without visiting v0.app.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/guides/oauth-mcp-servers
  - /docs/api/v1/reference/mcp-servers/create
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Create MCP Server OAuth Authorization URL



<EndpointDisplay method="post" path="/mcp-servers/{mcpServerId}/oauth/authorize" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const authorization = await v0.mcpServers.createOAuthAuthorizationUrl({
  mcpServerId: 'mcp_123',
  returnUrl: 'https://your-app.example.com/oauth/v0-mcp/callback',
})

// Redirect the user to authorization.url in your application.
console.log(authorization.url)`}
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

After the user authorizes with the MCP provider, v0 stores the OAuth tokens and redirects to your `returnUrl` with `oauth_success=true` and `mcpServerId`. If authorization fails, v0 redirects to your `returnUrl` with `error` and `error_description`.

## API Signature

### Request

#### Path Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "mcpServerId",
    "type": "string",
    "required": true,
    "description": "The ID of the OAuth MCP server to authorize."
  }
]}
/>

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "returnUrl",
    "type": "string",
    "required": true,
    "description": "An absolute URL in your application where v0 redirects after OAuth completes. HTTPS is required in production.",
    "deprecated": false
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "object",
    "type": "'mcp_server_oauth_authorization'",
    "required": true,
    "description": "Fixed value identifying this object as an MCP server OAuth authorization.",
    "deprecated": false
  },
  {
    "name": "mcpServerId",
    "type": "string",
    "required": true,
    "description": "The MCP server being authorized.",
    "deprecated": false
  },
  {
    "name": "url",
    "type": "string",
    "required": true,
    "description": "The provider authorization URL to redirect the user to.",
    "deprecated": false
  },
  {
    "name": "state",
    "type": "string",
    "required": true,
    "description": "The OAuth state value. This expires after 5 minutes.",
    "deprecated": false
  },
  {
    "name": "expiresAt",
    "type": "string",
    "required": true,
    "description": "The ISO 8601 timestamp when the authorization URL expires.",
    "deprecated": false
  }
]}
/>

## OAuth Callback

Register this redirect URI with the MCP provider:

```txt
https://api.v0.dev/v1/mcp-servers/oauth/callback
```

This callback is handled by v0. Your application should handle the `returnUrl` you pass to this endpoint.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)