---
title: Get Preview URL
description: Returns the preview URL for a chat. If the preview isn't ready, the response is null. Poll this endpoint until the response is non-null.
badge: "GET"
---

# Get Preview URL



<EndpointDisplay method="get" path="/chats/{chatId}/preview" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.getPreview({
  chatId: 'chat_abc123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v2/chats/chat_abc123/preview" \
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
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the chat.",
    "deprecated": false
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "url",
    "type": "string",
    "required": true,
    "description": "The preview URL for this chat.",
    "deprecated": false
  },
  {
    "name": "token",
    "type": "string",
    "required": true,
    "description": "A short-lived token for accessing the preview URL via the x-v0-preview-token header.",
    "deprecated": false
  },
  {
    "name": "expiresAt",
    "type": "string",
    "required": true,
    "description": "The ISO timestamp when token expires.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)