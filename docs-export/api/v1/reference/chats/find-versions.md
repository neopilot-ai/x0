---
title: Find Chat Versions
description: Retrieves a list of all versions (iterations) for a specific chat, ordered by creation date (newest first). Supports cursor-based pagination and includes version status and demo URLs.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Find Chat Versions

<EndpointDisplay method="get" path="/chats/{chatId}/versions" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.findVersions()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/chats/{chatId}/versions \
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
"name": "chatId",
"type": "string",
"required": true,
"description": "The unique identifier of the chat to retrieve versions for. Provided as a path parameter."
}
]}
/>

#### Query Parameters

<APISignature
title=""
parameters={[
{
"name": "limit",
"type": "number",
"required": false,
"description": "Specifies the maximum number of version records to return in a single response. Useful for paginating results when there are many versions."
},
{
"name": "cursor",
"type": "string",
"required": false,
"description": "Base64 encoded cursor containing pagination data"
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
"description": "A unique identifier for the version.",
"deprecated": false
},
{
"name": "object",
"type": "'version'",
"required": false,
"description": "Fixed value identifying this object as a version.",
"deprecated": false
},
{
"name": "status",
"type": "'pending' | 'completed' | 'failed'",
"required": false,
"description": "The current status of the version generation process.",
"deprecated": false
},
{
"name": "demoUrl",
"type": "string",
"required": false,
"description": "Optional URL for previewing the generated output.",
"deprecated": false
},
{
"name": "screenshotUrl",
"type": "string",
"required": false,
"description": "An authenticated URL to retrieve a screenshot of this version. Fetching this URL requires the same Authorization: Bearer header as all other API calls — it cannot be used directly as an `<img>` `src`. To display it in a browser, proxy the request server-side and forward the Authorization header. Append `?ignoreCache=1` to bypass the one-week screenshot cache.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": false,
"description": "The date and time when the version was created, in ISO 8601 format.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The date and time when the version was last updated, in ISO 8601 format.",
"deprecated": false
}
]
}
},
{
"name": "pagination",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "hasMore",
"type": "boolean",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "nextCursor",
"type": "string",
"required": false,
"description": "",
"deprecated": false
},
{
"name": "nextUrl",
"type": "string",
"required": false,
"description": "",
"deprecated": false
}
]
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
