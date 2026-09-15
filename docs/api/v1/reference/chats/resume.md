---
title: Resume Message
description: Reconnects to an active assistant message stream in a chat.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Resume Message



<EndpointDisplay method="post" path="/chats/{chatId}/messages/{messageId}/resume" />

## Usage

Use this endpoint when a client disconnects while an assistant message is still
generating, such as after a page refresh. The endpoint reconnects to the
currently running stream for the specified assistant message.

This endpoint does not restart a stopped or completed generation. After calling
the stop endpoint, start a new message instead of calling resume.

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const stream = await v0.chats.resume({
  chatId: 'chat_123',
  messageId: 'msg_123',
})

for await (const event of stream) {
  console.log(event)
}`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -N -X POST https://api.v0.dev/v1/chats/{chatId}/messages/{messageId}/resume \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Accept: text/event-stream"`}
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
    "description": "The unique identifier of the chat containing the message to resume. Provided as a path parameter."
  },
  {
    "name": "messageId",
    "type": "string",
    "required": true,
    "description": "The identifier of the specific message to resume. Provided as a path parameter."
  }
]}
/>

### Response

Returns `text/event-stream`. Each event is sent as `data: <JSON>\n\n`.

<APISignature
  title=""
  parameters={[
  {
    "name": "id",
    "type": "string",
    "required": true,
    "description": "The chat or message identifier for the event.",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'chat' | 'chat.title' | 'chat.name' | 'message.experimental_content.chunk'",
    "required": true,
    "description": "The event type. Chat events contain the current chat state; title/name events contain title deltas; message chunk events contain content deltas.",
    "deprecated": false
  },
  {
    "name": "delta",
    "type": "string | object",
    "required": false,
    "description": "The incremental payload for title/name and message chunk events.",
    "deprecated": false
  },
  {
    "name": "error",
    "type": "string",
    "required": false,
    "description": "An error message if the stream failed while reconnecting.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)