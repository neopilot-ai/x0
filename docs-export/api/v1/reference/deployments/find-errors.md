---
title: Find Deployment Errors
description: Retrieves a list of errors that occurred during a specific deployment. Useful for diagnosing and debugging deployment issues.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Find Deployment Errors

<EndpointDisplay method="get" path="/deployments/{deploymentId}/errors" />

<Callout type="warning">
  **Deprecated**: This method is deprecated. Use the [Vercel API](https://docs.vercel.com/docs/rest-api/reference/endpoints/deployments/get-deployment-events) directly to inspect deployment errors.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.deployments.findErrors({
deploymentId: '123',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/deployments/123/errors \
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
"description": "The unique identifier of the deployment to inspect for errors. Provided as a path parameter."
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "error",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "fullErrorText",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "errorType",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "formattedError",
"type": "string",
"required": false,
"description": "",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
