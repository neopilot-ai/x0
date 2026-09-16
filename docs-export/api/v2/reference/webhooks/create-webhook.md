---
title: Create Webhook
description: Creates a new webhook that listens for specific events. Supports optional association with a chat.
badge: 'POST'
---

# Create Webhook

<EndpointDisplay method="post" path="/hooks" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0'

const result = await v0.webhooks.create({
name: 'My Project',
events: 'example',
url: 'https://example.com',
chatId: 'chat_abc123',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST "https://api.v0.dev/v2/hooks" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Project","events":"example","url":"https://example.com","chatId":"chat_abc123"}'`}
/>
</CustomCodeBlock>

## API Signature

### Request

#### Request Body

<APISignature
title=""
parameters={[
{
"name": "name",
"type": "string",
"required": true,
"description": "A human-readable name for the webhook.",
"deprecated": false
},
{
"name": "events",
"type": "('chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished')[]",
"required": true,
"description": "List of event types the webhook should subscribe to.",
"deprecated": false
},
{
"name": "url",
"type": "string",
"required": true,
"description": "The target URL to receive the webhook payloads.",
"deprecated": false
},
{
"name": "chatId",
"type": "string | null",
"required": true,
"description": "The ID of a chat to scope the webhook to.",
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
