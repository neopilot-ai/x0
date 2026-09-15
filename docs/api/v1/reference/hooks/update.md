---
title: Update Hook
description: Updates the configuration of an existing webhook, including its name, event subscriptions, or target URL.
badge: "PATCH"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Update Hook



<EndpointDisplay method="patch" path="/hooks/{hookId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.hooks.update({
  hookId: '123',
  name: 'My Updated Hook',
  events: ['chat.created', 'message.created'],
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X PUT https://api.v0.dev/v1/hooks/123 \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Updated Hook",
    "events": ["chat.created", "message.created"],
    "url": "https://example.com"
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
    "name": "hookId",
    "type": "string",
    "required": true,
    "description": "The ID of the webhook to update. Provided as a path parameter."
  }
]}
/>

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "name",
    "type": "string",
    "required": false,
    "description": "A new name for the hook.",
    "deprecated": false
  },
  {
    "name": "events",
    "type": "'chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished'[]",
    "required": false,
    "description": "Updated list of event types to subscribe to.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "'chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished'",
      "required": true,
      "description": "",
      "deprecated": false,
      "properties": []
    }
  },
  {
    "name": "url",
    "type": "string",
    "required": false,
    "description": "A new URL to send webhook payloads to.",
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
    "name": "object",
    "type": "'hook'",
    "required": true,
    "description": "Fixed value identifying this object as a webhook.",
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
    "type": "'chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished'[]",
    "required": true,
    "description": "List of event types this webhook is subscribed to.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "'chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished'",
      "required": true,
      "description": "",
      "deprecated": false,
      "properties": []
    }
  },
  {
    "name": "chatId",
    "type": "string",
    "required": false,
    "description": "Optional ID of the chat that this webhook is scoped to.",
    "deprecated": false
  },
  {
    "name": "url",
    "type": "string",
    "required": true,
    "description": "Target URL that receives event payloads for this webhook.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)