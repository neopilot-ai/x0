---
title: Update Chat
description: Updates a chat's title, privacy, or metadata.
badge: "PATCH"
---

# Update Chat



<EndpointDisplay method="patch" path="/chats/{chatId}" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.update({
  chatId: 'chat_abc123',
  title: 'Updated chat title',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X PATCH "https://api.v0.dev/v2/chats/chat_abc123" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated chat title"}'`}
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

#### Request Body

<APISignature
  title=""
  parameters={[
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "A new title to assign to the chat.",
    "deprecated": false
  },
  {
    "name": "privacy",
    "type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
    "required": false,
    "description": "Updated visibility setting for the chat.",
    "deprecated": false
  },
  {
    "name": "metadata",
    "type": "Record<string, string | null> | null",
    "required": false,
    "description": "User-defined key-value metadata. Merged with existing entries. Pass `null` for a value to delete that key, or pass `null` for the whole field to delete all entries. Maximum 50 active entries.",
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
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)