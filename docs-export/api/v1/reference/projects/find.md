---
title: Find Projects
description: Returns a list of all v0 projects in your workspace. Useful for browsing or managing projects across different chats or use cases.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Find Projects

<EndpointDisplay method="get" path="/projects" />

<Callout type="warning">
  **Deprecated**: v0 Projects are deprecated. Use the Vercel API to [list projects](https://vercel.com/docs/rest-api/projects/retrieve-a-list-of-projects).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.find()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/projects \
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
"description": "A unique identifier for the project.",
"deprecated": false
},
{
"name": "object",
"type": "'project'",
"required": false,
"description": "Fixed value identifying this object as a project.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "The name of the project as defined by the user.",
"deprecated": false
},
{
"name": "privacy",
"type": "'private' | 'team'",
"required": false,
"description": "The privacy setting for the project - either private or team.",
"deprecated": false
},
{
"name": "vercelProjectId",
"type": "string",
"required": false,
"description": "Optional ID of the linked Vercel project, if connected.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": false,
"description": "The ISO timestamp representing when the project was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The ISO timestamp of the most recent update, if available.",
"deprecated": false
},
{
"name": "apiUrl",
"type": "string",
"required": false,
"description": "The API endpoint URL for accessing this project programmatically.",
"deprecated": false
},
{
"name": "webUrl",
"type": "string",
"required": false,
"description": "The web URL where the project can be viewed or managed.",
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
