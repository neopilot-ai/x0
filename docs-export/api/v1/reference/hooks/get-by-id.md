---
title: Get Hook
description: Retrieves the details of a specific webhook using its ID.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Get Hook



<EndpointDisplay method="get" path="/hooks/{hookId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.hooks.getById({
  hookId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/hooks/123 \
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
    "description": "The unique identifier of the hook to retrieve."
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