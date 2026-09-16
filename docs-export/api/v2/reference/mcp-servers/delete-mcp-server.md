---
title: Delete MCP Server
description: Deletes an MCP server and cleans up associated OAuth tokens. This action is irreversible.
badge: 'DEL'
---

# Delete MCP Server

<EndpointDisplay method="delete" path="/mcp-servers/{mcpServerId}" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.mcpServers.delete({
mcpServerId: 'srv_jkl345',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X DELETE "https://api.v0.dev/v2/mcp-servers/chat_abc123" \
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
"description": "The unique identifier of the MCP server to delete.",
"deprecated": false
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "success",
"type": "'true'",
"required": true,
"description": "",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
