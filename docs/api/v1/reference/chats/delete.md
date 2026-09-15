---
title: Delete Chat
description: Deletes a specific chat based on the provided chatId. This operation is irreversible and permanently removes the chat and its contents.
badge: "DEL"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Delete Chat



<EndpointDisplay method="delete" path="/chats/{chatId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.delete({
  chatId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X DELETE https://api.v0.dev/v1/chats/123 \
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
    "description": "The unique identifier of the chat to delete. This must be passed as a path parameter in the URL."
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
    "name": "deleted",
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