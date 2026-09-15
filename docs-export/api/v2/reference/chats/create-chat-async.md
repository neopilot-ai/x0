---
title: Create Chat (Async)
description: Creates a new chat with a user message and processes it in the background. Returns immediately with the chat ID and message ID. Poll for the assistant message by ID until `finishReason` is non-null.
badge: "POST"
---

# Create Chat (Async)



<EndpointDisplay method="post" path="/chats/async" versionPrefix="/v2" />

<Callout type="info">
  Use `attachments` to provide supporting context such as documents, images, or a few reference files. Each attachment's `url` can be a public HTTPS URL or a base64-encoded data URI.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.chats.createAsync({
  message: 'Hello, world!',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/chats/async" \
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
const result = await v0.chats.createAsync({
  message: 'Use the attached requirements when building the application.',
  attachments: [{ url: 'data:text/plain;base64,' + content }],
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST "https://api.v0.dev/v2/chats/async" \
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
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "Unique chat identifier.",
    "deprecated": false
  },
  {
    "name": "messageId",
    "type": "string",
    "required": true,
    "description": "ID of the assistant message that will receive the response. Poll this message by ID and check its finishReason field to detect completion.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)