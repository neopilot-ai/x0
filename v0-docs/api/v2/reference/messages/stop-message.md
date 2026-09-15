---
title: Stop Message
description: Stops an in-flight assistant message generation. The agent aborts at the next safe point and the message is marked finished.
badge: "POST"
---

# Stop Message



<EndpointDisplay method="post" path="/chats/{chatId}/messages/{messageId}/stop" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.messages.stop({
  chatId: 'chat_abc123',
  messageId: 'msg_xyz789',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/chats/chat_abc123/messages/chat_abc123/stop" \
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
  },
  {
    "name": "messageId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the assistant message to stop.",
    "deprecated": false
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "messageId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the stopped message.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)