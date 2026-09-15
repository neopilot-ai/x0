---
title: Create MCP Server
description: Creates a new MCP server configuration. Limited to 100 servers per user.
badge: "POST"
---

# Create MCP Server



<EndpointDisplay method="post" path="/mcp-servers" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.mcpServers.create({
  name: 'My Project',
  url: 'https://example.com',
  enabled: true,
  auth: 'none',
  scope: 'user',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/mcp-servers" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","url":"https://example.com","enabled":true,"auth":"none","scope":"user"}'`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Request Body

<APISignature
  title=""
  parameters={[
  {
    "name": "name",
    "type": "string",
    "required": true,
    "description": "Display name for the MCP server.",
    "deprecated": false
  },
  {
    "name": "url",
    "type": "string",
    "required": true,
    "description": "URL endpoint of the MCP server.",
    "deprecated": false
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "Optional description of the MCP server.",
    "deprecated": false
  },
  {
    "name": "enabled",
    "type": "boolean",
    "required": true,
    "description": "Whether the server should be enabled.",
    "deprecated": false
  },
  {
    "name": "auth",
    "type": "'none' | 'bearer' | 'custom-headers' | 'oauth'",
    "required": true,
    "description": "Authentication configuration.",
    "deprecated": false
  },
  {
    "name": "scope",
    "type": "'user' | 'team'",
    "required": true,
    "description": "Scope of the MCP server configuration.",
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
    "description": "Unique identifier for the MCP server.",
    "deprecated": false
  },
  {
    "name": "name",
    "type": "string",
    "required": true,
    "description": "Display name of the MCP server.",
    "deprecated": false
  },
  {
    "name": "url",
    "type": "string",
    "required": true,
    "description": "URL endpoint of the MCP server.",
    "deprecated": false
  },
  {
    "name": "description",
    "type": "string",
    "required": true,
    "description": "Optional description of the MCP server.",
    "deprecated": false
  },
  {
    "name": "createdAt",
    "type": "string",
    "required": true,
    "description": "ISO timestamp of when the server was created.",
    "deprecated": false
  },
  {
    "name": "updatedAt",
    "type": "string",
    "required": true,
    "description": "ISO timestamp of the last update.",
    "deprecated": false
  },
  {
    "name": "userId",
    "type": "string",
    "required": true,
    "description": "ID of the user who created the server.",
    "deprecated": false
  },
  {
    "name": "enabled",
    "type": "boolean",
    "required": true,
    "description": "Whether the MCP server is enabled.",
    "deprecated": false
  },
  {
    "name": "auth",
    "type": "'none' | 'bearer' | 'custom-headers' | 'oauth'",
    "required": true,
    "description": "Authentication configuration for the MCP server.",
    "deprecated": false
  },
  {
    "name": "scope",
    "type": "'user' | 'team'",
    "required": true,
    "description": "Scope of the MCP server configuration.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)