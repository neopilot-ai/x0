---
title: Find Vercel Projects
description: Retrieves Vercel projects available to the authenticated user or team scope.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Find Vercel Projects

<EndpointDisplay method="get" path="/integrations/vercel/projects" />

<Callout type="warning">
  **Deprecated**: This method is deprecated. Use the [Vercel API](https://docs.vercel.com/docs/rest-api/reference/endpoints/projects/retrieve-a-list-of-projects) directly to list Vercel projects.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.integrations.vercel.projects.find()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/integrations/vercel/projects \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
/>
</CustomCodeBlock>

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
"description": "A unique identifier for the linked Vercel project.",
"deprecated": false
},
{
"name": "object",
"type": "'vercel_project'",
"required": false,
"description": "Fixed value identifying this object as a Vercel project.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "The name of the Vercel project.",
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
