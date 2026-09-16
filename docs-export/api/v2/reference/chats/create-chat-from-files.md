---
title: Create Chat From Files
description: Creates a new chat from inline source files.
badge: 'POST'
---

# Create Chat From Files

<EndpointDisplay method="post" path="/chats/from-files" versionPrefix="/v2" />

<Callout type="warning">
  `chats.createFromFiles` imports the supplied files as an existing application; it does not scaffold a Next.js application or generate missing files. Provide a complete, runnable project, including its package and framework configuration. To generate an application from instructions, use [`chats.create`](/docs/api/v2/reference/chats/create-chat). To provide documents or a few reference files as context, use `attachments` with `chats.create` or `chats.createAsync`.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.chats.createFromFiles({
files: [
{
name: 'package.json',
content: JSON.stringify({
scripts: { dev: 'next dev', build: 'next build' },
dependencies: {
next: 'latest',
react: 'latest',
'react-dom': 'latest',
},
}),
},
{
name: 'app/layout.jsx',
content:
'export default function Layout({ children }) { return <html lang="en"><body>{children}</body></html> }',
},
{
name: 'app/page.jsx',
content: 'export default function Page() { return <h1>Hello</h1> }',
},
],
title: 'Imported project',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST "https://api.v0.dev/v2/chats/from-files" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "files": [
      {
        "name": "package.json",
        "content": "{\"scripts\":{\"dev\":\"next dev\",\"build\":\"next build\"},\"dependencies\":{\"next\":\"latest\",\"react\":\"latest\",\"react-dom\":\"latest\"}}"
      },
      {
        "name": "app/layout.jsx",
        "content": "export default function Layout({ children }) { return <html lang=\"en\"><body>{children}</body></html> }"
      },
      {
        "name": "app/page.jsx",
        "content": "export default function Page() { return <h1>Hello</h1> }"
      }
    ],
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
"name": "files",
"type": "object[]",
"required": true,
"description": "Source files used to seed the new chat.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "name",
"type": "string",
"required": true,
"description": "Path of the file in the project.",
"deprecated": false
},
{
"name": "content",
"type": "string",
"required": true,
"description": "UTF-8 text content of the file.",
"deprecated": false
}
]
}
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
