---
title: Update MCP Server
description: Updates the configuration of an existing MCP server, including its name, URL, authentication, or enabled status. Supports partial updates.
badge: "PATCH"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v1/guides/oauth-mcp-servers
---

# Update MCP Server



<EndpointDisplay method="patch" path="/mcp-servers/{mcpServerId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.mcpServers.update({
  mcpServerId: 'mcp_123',
  name: 'Updated MCP Server',
  enabled: false,
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X PATCH https://api.v0.dev/v1/mcp-servers/mcp_123 \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated MCP Server",
    "enabled": false
  }'`}
  />
</CustomCodeBlock>

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
    "description": "The ID of the MCP server to update. Provided as a path parameter."
  }
]}
/>

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "A new name for the MCP server. Must be between 1 and 100 characters.",
    "deprecated": false
  },
  {
    "name": "url",
    "type": "string",
    "required": false,
    "description": "A new URL for the MCP server endpoint. Must be a valid URL and use HTTPS in production. Maximum 500 characters.",
    "deprecated": false
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "A new description for the MCP server. Maximum 500 characters.",
    "deprecated": false
  },
  {
    "name": "enabled",
    "type": "boolean",
    "required": false,
    "description": "Whether the MCP server should be enabled.",
    "deprecated": false
  },
  {
    "name": "auth",
    "type": "object",
    "required": false,
    "description": "New authentication configuration for the MCP server.",
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
        "description": "OAuth configuration. Required when type is 'oauth'. The server needs an active user authorization through the v0 API OAuth flow before it can be used.",
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
    "description": "Whether the server should be scoped to the user or a team.",
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