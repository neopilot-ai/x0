---
title: Create Vercel Project
description: Links a Vercel project to an existing v0 project. Enables Vercel-related features and deployment integration within the v0 workspace.
badge: 'POST'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Create Vercel Project

<EndpointDisplay method="post" path="/integrations/vercel/projects" />

<Callout type="warning">
  **Deprecated**: This endpoint depends on v0 Projects, which are deprecated. You can still connect a Vercel project directly to a chat with [Create Vercel Project](/docs/api/v2/reference/chats/create-vercel-project).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.integrations.vercel.projects.create()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST https://api.v0.dev/integrations/vercel/projects \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Body

<APISignature
title=""
parameters={[
{
"name": "projectId",
"type": "string",
"required": true,
"description": "The ID of the v0 project to link to the new Vercel project.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "The name to assign to the new Vercel project.",
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
"description": "A unique identifier for the linked Vercel project.",
"deprecated": false
},
{
"name": "object",
"type": "'vercel_project'",
"required": true,
"description": "Fixed value identifying this object as a Vercel project.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "The name of the Vercel project.",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
