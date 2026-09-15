---
title: Get Chat Files
description: Returns the source files for a chat.
badge: "GET"
---

# Get Chat Files



<EndpointDisplay method="get" path="/chats/{chatId}/files" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.getFiles({
  chatId: 'chat_abc123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v2/chats/chat_abc123/files" \
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
    "name": "files",
    "type": "object[]",
    "required": true,
    "description": "All source files in the chat.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "object",
      "required": true,
      "description": "A single source file in the chat.",
      "deprecated": false,
      "properties": [
        {
          "name": "path",
          "type": "string",
          "required": true,
          "description": "Project-relative file path, e.g. \"app/page.tsx\".",
          "deprecated": false
        },
        {
          "name": "content",
          "type": "string",
          "required": true,
          "description": "Content of the file.",
          "deprecated": false
        },
        {
          "name": "encoding",
          "type": "'utf8' | 'base64'",
          "required": true,
          "description": "How `content` is encoded. `utf8` for text files; `base64` for binary files.",
          "deprecated": false
        }
      ]
    }
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)