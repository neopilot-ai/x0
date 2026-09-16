---
title: Assign Project to Chat
description: Links an existing v0 project to a specific chat. Helps group conversations under a shared project context.
badge: 'POST'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Assign Project to Chat

<EndpointDisplay method="post" path="/projects/{projectId}/assign" />

<Callout type="warning">
  **Deprecated**: v0 Projects are deprecated. To connect a chat to Vercel infrastructure, create a Vercel project for the chat with [Create Vercel Project](/docs/api/v2/reference/chats/create-vercel-project). Use [Update Chat](/docs/api/v2/reference/chats/update-chat) to group related chats using custom metadata.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.assign({
projectId: '123',
chatId: '123',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST https://api.v0.dev/v1/projects/123/assign \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "123"
  }'`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Path Parameters

<APISignature
title=""
parameters={[
{
"name": "projectId",
"type": "string",
"required": true,
"description": "The ID of the project to assign."
}
]}
/>

#### Body

<APISignature
title=""
parameters={[
{
"name": "chatId",
"type": "string",
"required": true,
"description": "The ID of the chat to assign the project to.",
"deprecated": false
}
]}
/>

### Response

<APISignature
title=""
parameters={[
{
"name": "object",
"type": "'project'",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "id",
"type": "string",
"required": true,
"description": "",
"deprecated": false
},
{
"name": "assigned",
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
