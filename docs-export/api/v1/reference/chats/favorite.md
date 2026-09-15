---
title: Favorite Chat
description: Marks or unmarks a chat as a favorite using its `chatId`. This helps with organizing and quickly accessing important chats.
badge: "PUT"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Favorite Chat



<EndpointDisplay method="put" path="/chats/{chatId}/favorite" />

<Callout type="warning">
  **Deprecated**: Favorite management is not supported in v0 API v2. Client-side favorite management can be implemented by setting custom chat metadata with [Update Chat](/docs/api/v2/reference/chats/update-chat), then reading it with [Get Chat](/docs/api/v2/reference/chats/get-chat) or [List Chats](/docs/api/v2/reference/chats/list-chats).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.favorite({
  chatId: '123',
  isFavorite: true,
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/chats/123/favorite \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "isFavorite": true
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
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the chat to update. Provided as a path parameter."
  }
]}
/>

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "isFavorite",
    "type": "boolean",
    "required": true,
    "description": "Specifies whether the chat should be marked as a favorite.\n\n- `\"true\"`: mark as favorite\n- `\"false\"`: remove from favorites",
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
    "description": "",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'chat'",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "favorited",
    "type": "boolean",
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