---
title: Get Webhook
description: Retrieves the details of a specific webhook using its ID.
badge: 'GET'
---

# Get Webhook

<EndpointDisplay method="get" path="/hooks/{hookId}" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.webhooks.get({
hookId: 'wh_ghi012',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET "https://api.v0.dev/v2/hooks/chat_abc123" \
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
"name": "hookId",
"type": "string",
"required": true,
"description": "The unique identifier of the webhook to retrieve.",
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
"description": "A unique identifier for the webhook.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "The ISO timestamp representing when the chat was created.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "A user-defined name to label the webhook.",
"deprecated": false
},
{
"name": "events",
"type": "('chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished')[]",
"required": true,
"description": "List of event types this webhook is subscribed to.",
"deprecated": false
},
{
"name": "url",
"type": "string",
"required": true,
"description": "Target URL that receives event payloads for this webhook.",
"deprecated": false
},
{
"name": "chatId",
"type": "string | null",
"required": true,
"description": "Optional ID of the chat that this webhook is scoped to.",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
