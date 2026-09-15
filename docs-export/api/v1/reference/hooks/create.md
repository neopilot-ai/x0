---
title: Create Hook
description: Creates a new webhook that listens for specific events. Supports optional association with a chat.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Create Hook



<EndpointDisplay method="post" path="/hooks" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.hooks.create({
  name: 'My Hook',
  events: ['chat.created', 'message.created'],
  url: 'https://example.com',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/hooks \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Hook",
    "events": ["chat.created", "message.created"],
    "url": "https://example.com"
  }'`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "name",
    "type": "string",
    "required": true,
    "description": "A human-readable name for the hook.",
    "deprecated": false
  },
  {
    "name": "events",
    "type": "'chat.created' | 'chat.updated' | 'chat.deleted' | 'message.created' | 'message.updated' | 'message.deleted' | 'message.finished'[]",
    "required": true,
    "description": "List of event types the hook should subscribe to.",
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
    "description": "The ID of a chat to scope the hook to.",
    "deprecated": false
  },
  {
    "name": "url",
    "type": "string",
    "required": true,
    "description": "The target URL to receive the webhook payloads.",
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