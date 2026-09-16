---
title: Find Chats
description: Retrieves a list of existing chats, with support for pagination and filtering by favorite status, Vercel project, or Git branch. Helps manage and navigate chat history.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Find Chats

<EndpointDisplay method="get" path="/chats" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.find({
limit: '10',
offset: '0',
isFavorite: 'false',
vercelProjectId: 'prj_xxxxx',
branch: 'main',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET "https://api.v0.dev/v1/chats?limit=10&offset=0&isFavorite=false&vercelProjectId=prj_xxxxx&branch=main" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Query Parameters

<APISignature
title=""
parameters={[
{
"name": "limit",
"type": "number",
"required": false,
"description": "Specifies the maximum number of chat records to return in a single response. Useful for paginating results when there are many chats."
},
{
"name": "offset",
"type": "number",
"required": false,
"description": "Determines the starting point for pagination. Used in conjunction with limit to retrieve a specific page of chat results."
},
{
"name": "isFavorite",
"type": "'true' | 'false'",
"required": false,
"description": "Filters chats by their \"favorite\" status. Accepts `\"true\"` or `\"false\"` (as strings, not booleans).\n\n- `\"true\"`: returns only chats marked as favorites.\n- `\"false\"`: returns only non-favorite chats."
},
{
"name": "vercelProjectId",
"type": "string",
"required": false,
"description": "Filters chats by the linked Vercel project ID. Only returns chats associated with the specified Vercel project."
},
{
"name": "branch",
"type": "string",
"required": false,
"description": "Filters chats by the Git branch name. Only returns chats that have an active Git connection with the specified branch as the head."
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
"description": "A unique identifier for the chat.",
"deprecated": false
},
{
"name": "object",
"type": "'chat'",
"required": false,
"description": "Fixed value identifying this object as a chat.",
"deprecated": false
},
{
"name": "shareable",
"type": "boolean",
"required": false,
"description": "Deprecated: Use the `privacy` field instead. A chat is shareable when privacy is public or unlisted.",
"deprecated": true
},
{
"name": "privacy",
"type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
"required": false,
"description": "Defines the visibility of the chat—private, team-only, or public.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "An optional name assigned to the chat by the user.",
"deprecated": false
},
{
"name": "title",
"type": "string",
"required": false,
"description": "Deprecated title field preserved for backward compatibility.",
"deprecated": true
},
{
"name": "createdAt",
"type": "string",
"required": false,
"description": "The ISO timestamp representing when the chat was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The ISO timestamp of the last update to the chat.",
"deprecated": false
},
{
"name": "favorite",
"type": "boolean",
"required": false,
"description": "Indicates whether the chat is marked as a favorite.",
"deprecated": false
},
{
"name": "authorId",
"type": "string",
"required": false,
"description": "The ID of the user who created the chat.",
"deprecated": false
},
{
"name": "projectId",
"type": "string",
"required": false,
"description": "Optional ID of the v0 project associated with this chat.",
"deprecated": true
},
{
"name": "vercelProjectId",
"type": "string",
"required": false,
"description": "Optional ID of the linked Vercel project, if connected.",
"deprecated": false
},
{
"name": "webUrl",
"type": "string",
"required": false,
"description": "Web URL to view this chat in the browser.",
"deprecated": false
},
{
"name": "apiUrl",
"type": "string",
"required": false,
"description": "API URL to access this chat via the API.",
"deprecated": false
},
{
"name": "latestVersion",
"type": "object",
"required": false,
"description": "The most recent generated version of the chat, if available.",
"deprecated": false,
"properties": [
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
}
]
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
