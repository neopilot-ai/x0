---
title: Get Chat Version
description: Retrieves detailed information about a specific version of a chat, including all files with their content and lock status.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Get Chat Version

<EndpointDisplay method="get" path="/chats/{chatId}/versions/{versionId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.getVersion()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/chats/{chatId}/versions/{versionId} \
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
"description": "The unique identifier of the chat containing the version. Provided as a path parameter."
},
{
"name": "versionId",
"type": "string",
"required": true,
"description": "The unique identifier of the version to retrieve. Provided as a path parameter."
}
]}
/>

#### Query Parameters

<APISignature
title=""
parameters={[
{
"name": "includeDefaultFiles",
"type": "'true' | 'false'",
"required": false,
"description": "When true, includes all default files (package.json, configuration files, etc.) that would be part of a ZIP download. When false or omitted, returns only the generated source files."
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
"description": "A unique identifier for the version.",
"deprecated": false
},
{
"name": "object",
"type": "'version'",
"required": true,
"description": "Fixed value identifying this object as a version.",
"deprecated": false
},
{
"name": "status",
"type": "'pending' | 'completed' | 'failed'",
"required": true,
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
"required": true,
"description": "The date and time when the version was created, in ISO 8601 format.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The date and time when the version was last updated, in ISO 8601 format.",
"deprecated": false
},
{
"name": "files",
"type": "object[]",
"required": true,
"description": "A list of files that were generated or included in this version.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "Detailed representation of a file, including its content and lock status.",
"deprecated": false,
"properties": [
{
"name": "object",
"type": "'file'",
"required": true,
"description": "Fixed value identifying this object as a file.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "The name of the file, including its extension.",
"deprecated": false
},
{
"name": "content",
"type": "string",
"required": true,
"description": "The full contents of the file as a raw string.",
"deprecated": false
},
{
"name": "locked",
"type": "boolean",
"required": true,
"description": "Whether the file is locked to prevent AI from overwriting it during new version generation.",
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
