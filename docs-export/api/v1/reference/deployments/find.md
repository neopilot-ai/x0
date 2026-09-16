---
title: Find Deployments
description: Find deployments by project and chat IDs. This will return a list of deployments for the given project and chat IDs.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Find Deployments

<EndpointDisplay method="get" path="/deployments" />

<Callout type="warning">
  **Deprecated**: This method is deprecated. Use [Get Chat](/docs/api/v1/reference/chats/get-by-id) to read the chat's `vercelProjectId`, then use the [Vercel API](https://docs.vercel.com/docs/rest-api/reference/endpoints/deployments/list-deployments) to find deployments for that project.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.deployments.find({
chatId: '123',
versionId: '123',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/deployments \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "123",
    "versionId": "123"
  }'`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Query Parameters

<APISignature
title=""
parameters={[
{
"name": "projectId",
"type": "string",
"required": false,
"description": "The ID of the project to find deployments for",
"deprecated": true
},
{
"name": "chatId",
"type": "string",
"required": true,
"description": "The ID of the chat to find deployments for"
},
{
"name": "versionId",
"type": "string",
"required": true,
"description": "The ID of the version to find deployments for"
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
"description": "A unique identifier for the deployment.",
"deprecated": false
},
{
"name": "object",
"type": "'deployment'",
"required": false,
"description": "Fixed value identifying this object as a deployment.",
"deprecated": false
},
{
"name": "inspectorUrl",
"type": "string",
"required": false,
"description": "URL to the deployment inspector.",
"deprecated": false
},
{
"name": "chatId",
"type": "string",
"required": false,
"description": "The ID of the chat that this deployment is scoped to.",
"deprecated": false
},
{
"name": "projectId",
"type": "string",
"required": false,
"description": "The ID of the project that this deployment is scoped to.",
"deprecated": true
},
{
"name": "versionId",
"type": "string",
"required": false,
"description": "The ID of the version that this deployment is scoped to.",
"deprecated": false
},
{
"name": "apiUrl",
"type": "string",
"required": false,
"description": "The API endpoint URL for accessing this deployment programmatically.",
"deprecated": false
},
{
"name": "webUrl",
"type": "string",
"required": false,
"description": "The web URL where the deployment can be viewed or managed.",
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
