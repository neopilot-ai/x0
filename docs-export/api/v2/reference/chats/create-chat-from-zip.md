---
title: Create Chat From ZIP
description: Creates a new chat from a zip archive.
badge: 'POST'
---

# Create Chat From ZIP

<EndpointDisplay method="post" path="/chats/from-zip" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.chats.createFromZip({
url: 'https://example.com',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST "https://api.v0.dev/v2/chats/from-zip" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'`}
/>
</CustomCodeBlock>

### From ZIP URL

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.chats.createFromZip({
url: 'https://example.com/archive.zip',
title: 'Imported project',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST "https://api.v0.dev/v2/chats/from-zip" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/archive.zip",
    "title": "Imported project"
  }'`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Request Body

<APISignature
title=""
parameters={[
{
"name": "url",
"type": "string",
"required": true,
"description": "Zip archive used to seed the new chat.",
"deprecated": false
},
{
"name": "privacy",
"type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
"required": false,
"description": "Visibility setting for the new chat.",
"deprecated": false
},
{
"name": "title",
"type": "string",
"required": false,
"description": "Title for the new chat.",
"deprecated": false
},
{
"name": "metadata",
"type": "Record<string, string>",
"required": false,
"description": "Arbitrary key-value data to attach to the chat.",
"deprecated": false
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "chat",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "Unique chat identifier.",
"deprecated": false
},
{
"name": "title",
"type": "string",
"required": false,
"description": "Chat title, if generated.",
"deprecated": false
},
{
"name": "privacy",
"type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
"required": true,
"description": "Visibility setting of the chat.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "ISO timestamp of when the chat was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "ISO timestamp of when the chat was last updated.",
"deprecated": false
},
{
"name": "authorId",
"type": "string",
"required": true,
"description": "ID of the user who created the chat.",
"deprecated": false
},
{
"name": "vercelProjectId",
"type": "string",
"required": false,
"description": "Associated Vercel project ID, if any.",
"deprecated": false
},
{
"name": "metadata",
"type": "Record<string, string>",
"required": true,
"description": "User-defined key-value metadata.",
"deprecated": false
},
{
"name": "writePermission",
"type": "boolean",
"required": true,
"description": "Whether the caller has write access to this chat.",
"deprecated": false
}
]
},
{
"name": "usage",
"type": "object",
"required": true,
"description": "Model, token usage, and credit cost for the prompt.",
"deprecated": false,
"properties": [
{
"name": "model",
"type": "string | null",
"required": true,
"description": "Model identifier used for the assistant message, or null when not applicable or unavailable.",
"deprecated": false
},
{
"name": "tokens",
"type": "object",
"required": true,
"description": "Token counts for this message.",
"deprecated": false,
"properties": [
{
"name": "input",
"type": "number",
"required": true,
"description": "Prompt input value (non-cached).",
"deprecated": false
},
{
"name": "output",
"type": "number",
"required": true,
"description": "Completion output value.",
"deprecated": false
},
{
"name": "cacheRead",
"type": "number",
"required": true,
"description": "Cache-read input value.",
"deprecated": false
},
{
"name": "cacheWrite",
"type": "number",
"required": true,
"description": "Cache-write input value.",
"deprecated": false
},
{
"name": "total",
"type": "number",
"required": true,
"description": "Sum of input, output, cacheRead, and cacheWrite.",
"deprecated": false
}
]
},
{
"name": "creditsCost",
"type": "object",
"required": true,
"description": "Credit cost for this message.",
"deprecated": false,
"properties": [
{
"name": "input",
"type": "number",
"required": true,
"description": "Prompt input value (non-cached).",
"deprecated": false
},
{
"name": "output",
"type": "number",
"required": true,
"description": "Completion output value.",
"deprecated": false
},
{
"name": "cacheRead",
"type": "number",
"required": true,
"description": "Cache-read input value.",
"deprecated": false
},
{
"name": "cacheWrite",
"type": "number",
"required": true,
"description": "Cache-write input value.",
"deprecated": false
},
{
"name": "total",
"type": "number",
"required": true,
"description": "Sum of input, output, cacheRead, and cacheWrite.",
"deprecated": false
}
]
}
]
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
