---
title: Resume Chat Stream
description: Resumes consumption of the active assistant generation as Server-Sent Events. If the latest message has already finished, returns a closing chat-state event. The response is `text/event-stream`; each event is `data: <JSON>\n\n` where the JSON conforms to ChatStreamEvent.
badge: "POST"
---

# Resume Chat Stream



<EndpointDisplay method="post" path="/chats/{chatId}/resume" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.resume({
  chatId: 'chat_abc123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/chats/chat_abc123/resume" \
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

### Response (Stream)

The response is a `text/event-stream`. Each event is `data: <JSON>\n\n` where the JSON conforms to one of the following event types:

<APISignature
  title=""
  parameters={[
  {
    "name": "event",
    "type": "'chat' | 'chat.title' | 'message.parts.chunk' | 'message.usage' | 'error'",
    "required": true,
    "description": "A single Server-Sent Events payload emitted by streaming chat endpoints. Each SSE event is `data: <JSON>\\n\\n` where the JSON conforms to one of the union members.",
    "deprecated": false,
    "variants": [
      {
        "name": "chat",
        "description": "Initial and final chat-state event. Emitted once at stream open with the freshly-created chat, and once at stream close with the chat including the completed assistant message.",
        "properties": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Unique chat identifier.",
            "deprecated": false
          },
          {
            "name": "title",
            "type": "string",
            "required": false,
            "description": "Chat title, if generated.",
            "deprecated": false
          },
          {
            "name": "privacy",
            "type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
            "required": true,
            "description": "Visibility setting of the chat.",
            "deprecated": false
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "description": "ISO timestamp of when the chat was created.",
            "deprecated": false
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": false,
            "description": "ISO timestamp of when the chat was last updated.",
            "deprecated": false
          },
          {
            "name": "authorId",
            "type": "string",
            "required": true,
            "description": "ID of the user who created the chat.",
            "deprecated": false
          },
          {
            "name": "vercelProjectId",
            "type": "string",
            "required": false,
            "description": "Associated Vercel project ID, if any.",
            "deprecated": false
          },
          {
            "name": "metadata",
            "type": "Record<string, string>",
            "required": true,
            "description": "User-defined key-value metadata.",
            "deprecated": false
          },
          {
            "name": "writePermission",
            "type": "boolean",
            "required": true,
            "description": "Whether the caller has write access to this chat.",
            "deprecated": false
          },
          {
            "name": "object",
            "type": "'chat'",
            "required": true,
            "description": "Discriminator: a chat-state snapshot.",
            "deprecated": false
          }
        ]
      },
      {
        "name": "chat.title",
        "description": "Emitted when the chat title is (re)generated.",
        "properties": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Chat ID.",
            "deprecated": false
          },
          {
            "name": "object",
            "type": "'chat.title'",
            "required": true,
            "description": "Discriminator.",
            "deprecated": false
          },
          {
            "name": "delta",
            "type": "string",
            "required": true,
            "description": "Full title string at this point in the stream.",
            "deprecated": false
          }
        ]
      },
      {
        "name": "message.parts.chunk",
        "description": "Incremental update to the assistant message content.",
        "properties": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Assistant message ID.",
            "deprecated": false
          },
          {
            "name": "object",
            "type": "'message.parts.chunk'",
            "required": true,
            "description": "Discriminator.",
            "deprecated": false
          },
          {
            "name": "delta",
            "type": "unknown",
            "required": true,
            "description": "jsondiffpatch delta to apply against the running public `Message.parts` array. Apply each delta in order to reconstruct the complete current parts snapshot.",
            "deprecated": false
          }
        ]
      },
      {
        "name": "message.usage",
        "description": "Final model, token usage, and credit cost for the assistant message produced by this stream. Emitted once after the message finishes generating, before the closing state event.",
        "properties": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Assistant message ID this usage applies to.",
            "deprecated": false
          },
          {
            "name": "object",
            "type": "'message.usage'",
            "required": true,
            "description": "Discriminator.",
            "deprecated": false
          },
          {
            "name": "usage",
            "type": "object",
            "required": true,
            "description": "Model identifier, token usage, and credit cost. Token and credit values are zero on user messages and on assistant messages that have not generated tokens.",
            "deprecated": false,
            "properties": [
              {
                "name": "model",
                "type": "string | null",
                "required": true,
                "description": "Model identifier used for the assistant message, or null when not applicable or unavailable.",
                "deprecated": false
              },
              {
                "name": "tokens",
                "type": "object",
                "required": true,
                "description": "Token counts for this message.",
                "deprecated": false,
                "properties": [
                  {
                    "name": "input",
                    "type": "number",
                    "required": true,
                    "description": "Prompt input value (non-cached).",
                    "deprecated": false
                  },
                  {
                    "name": "output",
                    "type": "number",
                    "required": true,
                    "description": "Completion output value.",
                    "deprecated": false
                  },
                  {
                    "name": "cacheRead",
                    "type": "number",
                    "required": true,
                    "description": "Cache-read input value.",
                    "deprecated": false
                  },
                  {
                    "name": "cacheWrite",
                    "type": "number",
                    "required": true,
                    "description": "Cache-write input value.",
                    "deprecated": false
                  },
                  {
                    "name": "total",
                    "type": "number",
                    "required": true,
                    "description": "Sum of input, output, cacheRead, and cacheWrite.",
                    "deprecated": false
                  }
                ]
              },
              {
                "name": "creditsCost",
                "type": "object",
                "required": true,
                "description": "Credit cost for this message.",
                "deprecated": false,
                "properties": [
                  {
                    "name": "input",
                    "type": "number",
                    "required": true,
                    "description": "Prompt input value (non-cached).",
                    "deprecated": false
                  },
                  {
                    "name": "output",
                    "type": "number",
                    "required": true,
                    "description": "Completion output value.",
                    "deprecated": false
                  },
                  {
                    "name": "cacheRead",
                    "type": "number",
                    "required": true,
                    "description": "Cache-read input value.",
                    "deprecated": false
                  },
                  {
                    "name": "cacheWrite",
                    "type": "number",
                    "required": true,
                    "description": "Cache-write input value.",
                    "deprecated": false
                  },
                  {
                    "name": "total",
                    "type": "number",
                    "required": true,
                    "description": "Sum of input, output, cacheRead, and cacheWrite.",
                    "deprecated": false
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "name": "error",
        "description": "Emitted when a stream error occurs after the SSE response begins.",
        "properties": [
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Assistant message ID or chat ID, depending on what is in scope when the error is raised.",
            "deprecated": false
          },
          {
            "name": "object",
            "type": "'error'",
            "required": true,
            "description": "Discriminator.",
            "deprecated": false
          },
          {
            "name": "message",
            "type": "string",
            "required": true,
            "description": "Human-readable stream error message.",
            "deprecated": false
          },
          {
            "name": "code",
            "type": "string",
            "required": false,
            "description": "Optional machine-readable stream error code.",
            "deprecated": false
          }
        ]
      }
    ]
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)