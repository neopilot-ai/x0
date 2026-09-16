---
title: Fork Chat
description: Creates a new chat fork (duplicate) from a specific version within an existing chat.
badge: 'POST'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Fork Chat

<EndpointDisplay method="post" path="/chats/{chatId}/fork" />

<Callout type="warning">
  `v0-auto` is deprecated. Requests using it are handled as `v0-pro`. Use `v0-pro` for new integrations.
</Callout>

<Callout type="info">
  `Fork Chat` only supports chats created through v0 API v1. To duplicate a chat created in v0 web or v0 API v2, use [Duplicate Chat](/docs/api/v2/reference/chats/duplicate-chat).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.fork({
chatId: '123',
})

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST https://api.v0.dev/v1/chats/123/fork \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "123"
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
"description": "The unique identifier of the chat to fork. Provided as a path parameter."
}
]}
/>

#### Body

<APISignature
title=""
parameters={[
{
"name": "versionId",
"type": "string",
"required": false,
"description": "The identifier of the specific chat version to fork from. If omitted, the latest version will be used.",
"deprecated": false
},
{
"name": "privacy",
"type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
"required": false,
"description": "Determines the privacy setting of the forked chat. This can control whether the chat is visible only to the user, to team members, or is public.",
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
"description": "A unique identifier for the chat.",
"deprecated": false
},
{
"name": "object",
"type": "'chat'",
"required": true,
"description": "Fixed value identifying this object as a chat.",
"deprecated": false
},
{
"name": "shareable",
"type": "boolean",
"required": true,
"description": "Deprecated: Use the `privacy` field instead. A chat is shareable when privacy is public or unlisted.",
"deprecated": true
},
{
"name": "privacy",
"type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
"required": true,
"description": "Defines the visibility of the chat—private, team-only, or public.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "An optional name assigned to the chat by the user.",
"deprecated": false
},
{
"name": "title",
"type": "string",
"required": false,
"description": "Deprecated title field preserved for backward compatibility.",
"deprecated": true
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "The ISO timestamp representing when the chat was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The ISO timestamp of the last update to the chat.",
"deprecated": false
},
{
"name": "favorite",
"type": "boolean",
"required": true,
"description": "Indicates whether the chat is marked as a favorite.",
"deprecated": false
},
{
"name": "authorId",
"type": "string",
"required": true,
"description": "The ID of the user who created the chat.",
"deprecated": false
},
{
"name": "projectId",
"type": "string",
"required": false,
"description": "Optional ID of the v0 project associated with this chat.",
"deprecated": true
},
{
"name": "vercelProjectId",
"type": "string",
"required": false,
"description": "Optional ID of the linked Vercel project, if connected.",
"deprecated": false
},
{
"name": "webUrl",
"type": "string",
"required": true,
"description": "Web URL to view this chat in the browser.",
"deprecated": false
},
{
"name": "apiUrl",
"type": "string",
"required": true,
"description": "API URL to access this chat via the API.",
"deprecated": false
},
{
"name": "latestVersion",
"type": "object",
"required": false,
"description": "Full details of the most recent generated version, if available.",
"deprecated": false,
"properties": [
{
"name": "id",
"type": "string",
"required": true,
"description": "A unique identifier for the version.",
"deprecated": false
},
{
"name": "object",
"type": "'version'",
"required": true,
"description": "Fixed value identifying this object as a version.",
"deprecated": false
},
{
"name": "status",
"type": "'pending' | 'completed' | 'failed'",
"required": true,
"description": "The current status of the version generation process.",
"deprecated": false
},
{
"name": "demoUrl",
"type": "string",
"required": false,
"description": "Optional URL for previewing the generated output.",
"deprecated": false
},
{
"name": "screenshotUrl",
"type": "string",
"required": false,
"description": "An authenticated URL to retrieve a screenshot of this version. Fetching this URL requires the same Authorization: Bearer header as all other API calls — it cannot be used directly as an `<img>` `src`. To display it in a browser, proxy the request server-side and forward the Authorization header. Append `?ignoreCache=1` to bypass the one-week screenshot cache.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "The date and time when the version was created, in ISO 8601 format.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The date and time when the version was last updated, in ISO 8601 format.",
"deprecated": false
},
{
"name": "files",
"type": "object[]",
"required": true,
"description": "A list of files that were generated or included in this version.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "Detailed representation of a file, including its content and lock status.",
"deprecated": false,
"properties": [
{
"name": "object",
"type": "'file'",
"required": true,
"description": "Fixed value identifying this object as a file.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": true,
"description": "The name of the file, including its extension.",
"deprecated": false
},
{
"name": "content",
"type": "string",
"required": true,
"description": "The full contents of the file as a raw string.",
"deprecated": false
},
{
"name": "locked",
"type": "boolean",
"required": true,
"description": "Whether the file is locked to prevent AI from overwriting it during new version generation.",
"deprecated": false
}
]
}
}
]
},
{
"name": "url",
"type": "string",
"required": true,
"description": "The canonical URL to access this chat.",
"deprecated": true
},
{
"name": "messages",
"type": "object[]",
"required": true,
"description": "All messages exchanged in the chat, including user and assistant entries.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "Summary of a single message within a chat, including role, content, type, timestamp, and API URL.",
"deprecated": false,
"properties": [
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
}
]
}
},
{
"name": "files",
"type": "object[]",
"required": false,
"description": "Optional array of files associated with the chat context.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "lang",
"type": "string",
"required": true,
"description": "Programming language used in the file (e.g., JavaScript, Python).",
"deprecated": false
},
{
"name": "meta",
"type": "object",
"required": true,
"description": "A key-value map of metadata associated with the file (e.g., path, type).",
"deprecated": false
},
{
"name": "source",
"type": "string",
"required": true,
"description": "The origin or identifier of the file source (e.g., path or upload label).",
"deprecated": false
}
]
}
},
{
"name": "demo",
"type": "string",
"required": false,
"description": "Deprecated demo URL used for previewing the chat result.",
"deprecated": true
},
{
"name": "text",
"type": "string",
"required": true,
"description": "The main user prompt or instruction that started the chat.",
"deprecated": false
},
{
"name": "modelConfiguration",
"type": "object",
"required": false,
"description": "The configuration used to generate responses in this chat.",
"deprecated": false,
"properties": [
{
"name": "modelId",
"type": "'v0-auto' | 'v0-mini' | 'v0-pro' | 'v0-max' | 'v0-max-fast'",
"required": false,
"description": "Model to use for the generation. `v0-auto` is deprecated and falls back to `v0-pro`.",
"deprecated": false
},
{
"name": "imageGenerations",
"type": "boolean",
"required": false,
"description": "Enables image generations to generate up to 5 images per version.",
"deprecated": false
},
{
"name": "thinking",
"type": "boolean",
"required": false,
"description": "Enables thinking to generate a response in multiple steps.",
"deprecated": false
}
]
},
{
"name": "permissions",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "write",
"type": "boolean",
"required": true,
"description": "If true, the user has write access to the chat.",
"deprecated": false
}
]
},
{
"name": "metadata",
"type": "Record<string, string>",
"required": true,
"description": "Arbitrary key-value data associated with this chat.",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
