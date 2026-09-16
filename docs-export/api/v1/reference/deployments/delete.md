---
title: Delete Deployment
description: Delete a deployment by ID. This will delete the deployment from Vercel.
badge: 'DEL'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Delete Deployment

<EndpointDisplay method="delete" path="/deployments/{deploymentId}" />

<Callout type="warning">
  **Deprecated**: This method is deprecated. Use the [Vercel API](https://docs.vercel.com/docs/rest-api/reference/endpoints/deployments/delete-a-deployment) directly to delete deployments.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.deployments.delete({
deploymentId: '123',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X DELETE https://api.v0.dev/v1/deployments/123 \
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
"name": "deploymentId",
"type": "string",
"required": true,
"description": "Path parameter \"deploymentId\""
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
"description": "",
"deprecated": false
},
{
"name": "object",
"type": "'deployment'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "deleted",
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
