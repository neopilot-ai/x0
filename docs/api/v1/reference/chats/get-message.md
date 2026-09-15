---
title: Get Chat Message
description: Retrieves detailed information about a specific message within a chat, including content, files, model configuration, and demo URLs.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Get Chat Message



<EndpointDisplay method="get" path="/chats/{chatId}/messages/{messageId}" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.getMessage()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/chats/{chatId}/messages/{messageId} \
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
    "description": "The unique identifier of the chat containing the message. Provided as a path parameter."
  },
  {
    "name": "messageId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the message to retrieve. Provided as a path parameter."
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
    "description": "A unique identifier for the message.",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'message'",
    "required": true,
    "description": "Fixed value identifying this object as a message.",
    "deprecated": false
  },
  {
    "name": "content",
    "type": "string",
    "required": true,
    "description": "The main text content of the message.",
    "deprecated": false
  },
  {
    "name": "experimental_content",
    "type": "any[] | any[][]",
    "required": false,
    "description": "The parsed content of the message as an array structure containing AST nodes. This is an experimental field that may change.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "any[] | any[]",
      "required": true,
      "description": "",
      "deprecated": false,
      "properties": []
    }
  },
  {
    "name": "createdAt",
    "type": "string",
    "required": true,
    "description": "The ISO timestamp representing when the message was created.",
    "deprecated": false
  },
  {
    "name": "updatedAt",
    "type": "string",
    "required": false,
    "description": "The ISO timestamp representing when the message was last updated.",
    "deprecated": false
  },
  {
    "name": "type",
    "type": "'message' | 'forked-block' | 'forked-chat' | 'open-in-v0' | 'refinement' | 'added-environment-variables' | 'added-integration' | 'deleted-file' | 'moved-file' | 'renamed-file' | 'edited-file' | 'replace-src' | 'reverted-block' | 'fix-with-v0' | 'auto-fix-with-v0' | 'sync-git' | 'pull-changes' | 'fix-cve' | 'answered-questions'",
    "required": true,
    "description": "Indicates the format or category of the message, such as plain text or code.",
    "deprecated": false
  },
  {
    "name": "role",
    "type": "'user' | 'assistant'",
    "required": true,
    "description": "Specifies whether the message was sent by the user or the assistant.",
    "deprecated": false
  },
  {
    "name": "finishReason",
    "type": "'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other' | 'unknown'",
    "required": false,
    "description": "The reason why the message generation finished.",
    "deprecated": false
  },
  {
    "name": "apiUrl",
    "type": "string",
    "required": true,
    "description": "API URL to access this message via the API.",
    "deprecated": false
  },
  {
    "name": "authorId",
    "type": [
      "string",
      "null"
    ],
    "required": true,
    "description": "The ID of the user who sent the message.",
    "deprecated": false
  },
  {
    "name": "parentId",
    "type": [
      "string",
      "null"
    ],
    "required": false,
    "description": "The ID of the parent message.",
    "deprecated": false
  },
  {
    "name": "attachments",
    "type": "object[]",
    "required": false,
    "description": "",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "object",
      "required": true,
      "description": "",
      "deprecated": false,
      "properties": [
        {
          "name": "url",
          "type": "string",
          "required": true,
          "description": "The URL where the attachment file can be accessed.",
          "deprecated": false
        },
        {
          "name": "name",
          "type": "string",
          "required": false,
          "description": "The original filename of the attachment.",
          "deprecated": false
        },
        {
          "name": "contentType",
          "type": "string",
          "required": false,
          "description": "The MIME type of the attachment file (e.g., image/png, application/pdf).",
          "deprecated": false
        },
        {
          "name": "size",
          "type": "number",
          "required": true,
          "description": "The size of the attachment file in bytes.",
          "deprecated": false
        },
        {
          "name": "content",
          "type": "string",
          "required": false,
          "description": "The base64-encoded content of the attachment file, if available.",
          "deprecated": false
        },
        {
          "name": "type",
          "type": "'screenshot' | 'figma' | 'zip'",
          "required": false,
          "description": "Optional v0-specific attachment type for enhanced processing.",
          "deprecated": false
        }
      ]
    }
  },
  {
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "The ID of the chat to which this message belongs.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)