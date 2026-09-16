---
title: Create MCP Server
description: Registers a new MCP server with your account. Supports OAuth, bearer token, custom headers, or no authentication. The server URL must use HTTPS in production.
badge: 'POST'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/guides/oauth-mcp-servers
  - /docs/api/v1/reference/mcp-servers/create-oauth-authorization-url
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Create MCP Server

<EndpointDisplay method="post" path="/mcp-servers" />

## Usage

<CustomCodeBlockWithExamples languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript" defaultExample="No Auth">
<ExampleVariant name="No Auth" description="Create server without authentication">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.mcpServers.create({
name: 'My MCP Server',
url: 'https://mcp.example.com/sse',
})

console.log(result)`}
/>

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST https://api.v0.dev/v1/mcp-servers \

-H "Authorization: Bearer $V0_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"name": "My MCP Server",
"url": "https://mcp.example.com/sse"
}'`}
/>
</ExampleVariant>

  <ExampleVariant name="Bearer Auth" description="Create server with bearer token authentication">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

const result = await v0.mcpServers.create({
name: 'Authenticated MCP Server',
url: 'https://mcp.example.com/sse',
description: 'Server with bearer token auth',
auth: {
type: 'bearer',
token: 'your-secret-token',
},
})

console.log(result)`}
/>

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST https://api.v0.dev/v1/mcp-servers \

-H "Authorization: Bearer $V0_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"name": "Authenticated MCP Server",
"url": "https://mcp.example.com/sse",
"description": "Server with bearer token auth",
"auth": {
"type": "bearer",
"token": "your-secret-token"
}
}'`}
/>
</ExampleVariant>

  <ExampleVariant name="Custom Headers" description="Create server with custom headers authentication">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

const result = await v0.mcpServers.create({
name: 'Custom Auth MCP Server',
url: 'https://mcp.example.com/sse',
auth: {
type: 'custom-headers',
headers: {
'X-API-Key': 'your-api-key',
'X-Org-Id': 'org_123',
},
},
})

console.log(result)`}
/>

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST https://api.v0.dev/v1/mcp-servers \

-H "Authorization: Bearer $V0_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"name": "Custom Auth MCP Server",
"url": "https://mcp.example.com/sse",
"auth": {
"type": "custom-headers",
"headers": {
"X-API-Key": "your-api-key",
"X-Org-Id": "org_123"
}
}
}'`}
/>
</ExampleVariant>

  <ExampleVariant name="OAuth" description="Create an OAuth MCP server configuration">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

const result = await v0.mcpServers.create({
name: 'OAuth MCP Server',
url: 'https://mcp.example.com/mcp',
description: 'Server with OAuth authentication',
auth: {
type: 'oauth',
config: {
authorizationUrl: 'https://auth.example.com/oauth/authorize',
tokenUrl: 'https://auth.example.com/oauth/token',
clientId: 'your-client-id',
scopes: ['read'],
usePKCE: true,
resource: 'https://mcp.example.com/mcp',
},
},
})

console.log(result)`}
/>

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST https://api.v0.dev/v1/mcp-servers \

-H "Authorization: Bearer $V0_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
"name": "OAuth MCP Server",
"url": "https://mcp.example.com/mcp",
"description": "Server with OAuth authentication",
"auth": {
"type": "oauth",
"config": {
"authorizationUrl": "https://auth.example.com/oauth/authorize",
"tokenUrl": "https://auth.example.com/oauth/token",
"clientId": "your-client-id",
"scopes": ["read"],
"usePKCE": true,
"resource": "https://mcp.example.com/mcp"
}
}
}'`}
/>
</ExampleVariant>
</CustomCodeBlockWithExamples>

OAuth MCP servers are created disconnected. After creating the server, call [Create MCP Server OAuth Authorization URL](/docs/api/v1/reference/mcp-servers/create-oauth-authorization-url) and redirect the user to the returned provider URL.

## API Signature

### Request

#### Body

<APISignature
title=""
parameters={[
{
"name": "name",
"type": "string",
"required": true,
"description": "A human-readable name for the MCP server. Must be between 1 and 100 characters.",
"deprecated": false
},
{
"name": "url",
"type": "string",
"required": true,
"description": "The URL of the MCP server endpoint. Must be a valid URL and use HTTPS in production. Maximum 500 characters.",
"deprecated": false
},
{
"name": "description",
"type": "string",
"required": false,
"description": "An optional description for the MCP server. Maximum 500 characters.",
"deprecated": false
},
{
"name": "enabled",
"type": "boolean",
"required": false,
"description": "Whether the MCP server should be enabled. Defaults to true.",
"deprecated": false
},
{
"name": "auth",
"type": "object",
"required": false,
"description": "Authentication configuration for the MCP server. Defaults to no authentication.",
"deprecated": false,
"properties": [
{
"name": "type",
"type": "'none' | 'bearer' | 'custom-headers' | 'oauth'",
"required": true,
"description": "The authentication method. Use 'oauth' for OAuth MCP servers, 'bearer' for token-based auth, or 'custom-headers' for key-value header pairs.",
"deprecated": false
},
{
"name": "token",
"type": "string",
"required": false,
"description": "The bearer token. Required when type is 'bearer'. Maximum 1000 characters.",
"deprecated": false
},
{
"name": "headers",
"type": "Record<string, string>",
"required": false,
"description": "Key-value pairs of custom headers. Required when type is 'custom-headers'. Maximum 10 headers.",
"deprecated": false
},
{
"name": "config",
"type": "object",
"required": false,
"description": "OAuth configuration. Required when type is 'oauth'. Tokens are not accepted by this API.",
"deprecated": false,
"properties": [
{
"name": "authorizationUrl",
"type": "string",
"required": true,
"description": "The OAuth authorization endpoint URL.",
"deprecated": false
},
{
"name": "tokenUrl",
"type": "string",
"required": true,
"description": "The OAuth token endpoint URL.",
"deprecated": false
},
{
"name": "registrationUrl",
"type": "string",
"required": false,
"description": "The optional dynamic client registration endpoint URL.",
"deprecated": false
},
{
"name": "clientId",
"type": "string",
"required": true,
"description": "The OAuth client ID.",
"deprecated": false
},
{
"name": "clientSecret",
"type": "string",
"required": false,
"description": "The optional OAuth client secret. This value is stored securely and is never returned by the API.",
"deprecated": false
},
{
"name": "scopes",
"type": "string[]",
"required": false,
"description": "OAuth scopes to request during authorization. Defaults to an empty array.",
"deprecated": false
},
{
"name": "usePKCE",
"type": "boolean",
"required": false,
"description": "Whether to use PKCE for the authorization code flow. Defaults to true.",
"deprecated": false
},
{
"name": "issuer",
"type": "string",
"required": false,
"description": "Optional issuer identifier for mix-up protection.",
"deprecated": false
},
{
"name": "resource",
"type": "string",
"required": false,
"description": "Optional RFC 8707 resource indicator. For MCP servers, this is usually the MCP server URL.",
"deprecated": false
},
{
"name": "clientIdMetadataDocumentSupported",
"type": "boolean",
"required": false,
"description": "Whether the authorization server supports Client ID Metadata Documents.",
"deprecated": false
}
]
}
]
},
{
"name": "scope",
"type": "'user' | 'team'",
"required": false,
"description": "Whether the server is scoped to the user or a team. Defaults to 'user'.",
"deprecated": false
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "id",
"type": "string",
"required": true,
"description": "A unique identifier for the MCP server.",
"deprecated": false
},
{
"name": "object",
"type": "'mcp_server'",
"required": true,
"description": "Fixed value identifying this object as an MCP server.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "The name of the MCP server.",
"deprecated": false
},
{
"name": "url",
"type": "string",
"required": true,
"description": "The URL of the MCP server endpoint.",
"deprecated": false
},
{
"name": "description",
"type": "string",
"required": false,
"description": "The description of the MCP server.",
"deprecated": false
},
{
"name": "enabled",
"type": "boolean",
"required": true,
"description": "Whether the MCP server is currently enabled.",
"deprecated": false
},
{
"name": "auth",
"type": "object",
"required": true,
"description": "The authentication configuration. Only the type is returned; sensitive values are redacted.",
"deprecated": false,
"properties": [
{
"name": "type",
"type": "'none' | 'bearer' | 'custom-headers' | 'oauth'",
"required": true,
"description": "The authentication method used by the server.",
"deprecated": false
}
]
},
{
"name": "scope",
"type": "'user' | 'team'",
"required": true,
"description": "Whether the server is scoped to the user or a team.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "The ISO 8601 timestamp when the server was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The ISO 8601 timestamp when the server was last updated.",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
