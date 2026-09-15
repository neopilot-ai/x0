---
title: Create Chat
description: Creates a new chat from a prompt. The request blocks until the model response is complete and returns the chat.
badge: "POST"
---

# Create Chat



<EndpointDisplay method="post" path="/chats" versionPrefix="/v2" />

<Callout type="info">
  Use `attachments` to provide supporting context such as documents, images, or a few reference files. Each attachment's `url` can be a public HTTPS URL or a base64-encoded data URI.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.create({
  message: 'Hello, world!',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/chats" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, world!"}'`}
  />
</CustomCodeBlock>

### With inline attachment content

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const content = Buffer.from('Use brand color #0070f3.').toString('base64')
const result = await v0.chats.create({
  message: 'Use the attached requirements when building the application.',
  attachments: [{ url: 'data:text/plain;base64,' + content }],
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/chats" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Use the attached requirements when building the application.",
    "attachments": [
      {
        "url": "data:text/plain;base64,VXNlIGJyYW5kIGNvbG9yICMwMDcwZjMu"
      }
    ]
  }'`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Request Body

<APISignature
  title=""
  parameters={[
  {
    "name": "message",
    "type": "string",
    "required": true,
    "description": "The prompt or instruction to send to the model.",
    "deprecated": false
  },
  {
    "name": "systemPrompt",
    "type": "string",
    "required": false,
    "description": "System-level context for the chat, such as frameworks or development environment details.",
    "deprecated": false
  },
  {
    "name": "modelConfiguration",
    "type": "object",
    "required": false,
    "description": "Overrides for the model behavior.",
    "deprecated": false,
    "properties": [
      {
        "name": "modelId",
        "type": "'v0-mini' | 'v0-pro' | 'v0-max' | 'v0-max-fast'",
        "required": true,
        "description": "Model to use for the generation.",
        "deprecated": false
      },
      {
        "name": "imageGenerations",
        "type": "boolean",
        "required": true,
        "description": "Enables image generations to generate up to 5 images per version.",
        "deprecated": false
      }
    ]
  },
  {
    "name": "attachments",
    "type": "(object | object)[]",
    "required": false,
    "description": "Files or assets to include with the message. Provide either a URL or data URI, or inline UTF-8 text content.",
    "deprecated": false
  },
  {
    "name": "mcpServerIds",
    "type": "string[]",
    "required": false,
    "description": "MCP server IDs to enable. When omitted, uses default enabled servers.",
    "deprecated": false
  },
  {
    "name": "skills",
    "type": "('remote' | 'memory' | 'project')[]",
    "required": false,
    "description": "Skills to force-attach to the chat. Supports skills.sh (`remote`), user/team memory (`memory`), and project (`project`) skills. Maximum 3.",
    "deprecated": false,
    "variants": [
      {
        "name": "remote",
        "description": "",
        "properties": [
          {
            "name": "type",
            "type": "'remote'",
            "required": true,
            "description": "Discriminator: a skills.sh skill.",
            "deprecated": false
          },
          {
            "name": "id",
            "type": "string",
            "required": true,
            "description": "Skill ID from skills.sh.",
            "deprecated": false
          }
        ]
      },
      {
        "name": "memory",
        "description": "",
        "properties": [
          {
            "name": "type",
            "type": "'memory'",
            "required": true,
            "description": "Discriminator: a user- or team-scoped memory skill.",
            "deprecated": false
          },
          {
            "name": "scope",
            "type": "'user' | 'team'",
            "required": true,
            "description": "Whether the skill lives in user or team memory.",
            "deprecated": false
          },
          {
            "name": "skillName",
            "type": "string",
            "required": true,
            "description": "Name of the memory skill to attach.",
            "deprecated": false
          }
        ]
      },
      {
        "name": "project",
        "description": "",
        "properties": [
          {
            "name": "type",
            "type": "'project'",
            "required": true,
            "description": "Discriminator: a skill defined in the project repo.",
            "deprecated": false
          },
          {
            "name": "skillName",
            "type": "string",
            "required": true,
            "description": "Name of the project skill to attach.",
            "deprecated": false
          }
        ]
      }
    ]
  },
  {
    "name": "privacy",
    "type": "'public' | 'private' | 'team' | 'team-edit' | 'unlisted'",
    "required": false,
    "description": "Visibility setting for the new chat.",
    "deprecated": false
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title for the new chat.",
    "deprecated": false
  },
  {
    "name": "metadata",
    "type": "Record<string, string>",
    "required": false,
    "description": "Arbitrary key-value data to attach to the chat.",
    "deprecated": false
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "chat",
    "type": "object",
    "required": true,
    "description": "",
    "deprecated": false,
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
      }
    ]
  },
  {
    "name": "usage",
    "type": "object",
    "required": true,
    "description": "Model, token usage, and credit cost for the prompt.",
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
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)