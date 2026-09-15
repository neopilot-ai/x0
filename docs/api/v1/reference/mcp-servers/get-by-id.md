---
title: Get MCP Server
description: Retrieves the details of a specific MCP server using its ID.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Get MCP Server



<EndpointDisplay method="get" path="/mcp-servers/{mcpServerId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.mcpServers.getById({
  mcpServerId: 'mcp_123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/mcp-servers/mcp_123 \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
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
    "description": "The unique identifier of the MCP server to retrieve."
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