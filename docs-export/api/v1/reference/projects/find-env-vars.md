---
title: Find Environment Variables
description: Retrieves all environment variables for a given project.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v2/guides/environment-variables
---

# Find Environment Variables

<EndpointDisplay method="get" path="/projects/{projectId}/env-vars" />

<Callout type="warning">
  **Deprecated**: v1 environment variables were connected to v0 Projects, which are deprecated. To read environment variables for a chat, see the [Environment Variables guide](/docs/api/v2/guides/environment-variables).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.findEnvVars({
projectId: 'project_abc123',
decrypted: 'false',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/projects/project_abc123/env-vars?decrypted=true \
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
"name": "projectId",
"type": "string",
"required": true,
"description": "The unique identifier of the project whose environment variables should be retrieved."
}
]}
/>

#### Query Parameters

<APISignature
title=""
parameters={[
{
"name": "decrypted",
"type": "'true' | 'false'",
"required": false,
"description": "Whether to return decrypted values. Defaults to false (encrypted)."
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "object",
"type": "'list'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "data",
"type": "object[]",
"required": true,
"description": "",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": false,
"description": "A unique identifier for the environment variable.",
"deprecated": false
},
{
"name": "object",
"type": "'environment_variable'",
"required": false,
"description": "The object type.",
"deprecated": false
},
{
"name": "key",
"type": "string",
"required": false,
"description": "The name of the environment variable.",
"deprecated": false
},
{
"name": "value",
"type": "string",
"required": false,
"description": "The value of the environment variable.",
"deprecated": false
},
{
"name": "decrypted",
"type": "boolean",
"required": false,
"description": "Whether the value is decrypted or encrypted.",
"deprecated": false
},
{
"name": "createdAt",
"type": "number",
"required": false,
"description": "The timestamp when the environment variable was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "number",
"required": false,
"description": "The timestamp when the environment variable was last updated.",
"deprecated": false
}
]
}
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
