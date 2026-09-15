---
title: Stop Message
description: Stops an in-flight message generation in a chat. Useful for cancelling a streaming response that is still being generated.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Stop Message



<EndpointDisplay method="post" path="/chats/{chatId}/messages/{messageId}/stop" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.stopMessage({
  chatId: 'chat_abc123',
  messageId: 'msg_xyz789',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/chats/{chatId}/messages/{messageId}/stop \
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
    "description": "The unique identifier of the chat containing the message to stop. Provided as a path parameter."
  },
  {
    "name": "messageId",
    "type": "string",
    "required": true,
    "description": "The identifier of the specific message to stop. Provided as a path parameter."
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "success",
    "type": "true",
    "required": true,
    "description": "Indicates that the stop signal was sent successfully.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)