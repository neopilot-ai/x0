---
title: Create Chat
description: Creates a new chat using a user message, optional system context, and model configuration. Useful for prompting the model within the scope of a specific project.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Create Chat



<EndpointDisplay method="post" path="/chats" />

<Callout type="warning">
  `v0-auto` is deprecated. Requests using it are handled as `v0-pro`. Use `v0-pro` for new integrations.
</Callout>

## Usage

<CustomCodeBlockWithExamples languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript" defaultExample="Sync">
  <ExampleVariant name="Sync" description="Create chat and wait for response">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.create({
  system: 'You are an expert coder',
  message: 'Create a landing page for a new product',
})

console.log(result)`}
    />

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST "https://api.v0.dev/v1/chats" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "system": "You are an expert coder",
    "message": "Create a landing page for a new product"
  }'`}
    />
  </ExampleVariant>

  <ExampleVariant name="Async" description="Create chat without waiting">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

// Create chat without waiting for completion
const chat = await v0.chats.create({
  system: 'You are a helpful assistant',
  message: 'Build a React component for a user profile card',
  responseMode: 'async', // Don't wait for generation to complete
})

console.log('Chat created:', chat.id)

// Poll for completion later
const completed = await v0.chats.getById(chat.id)`}
    />

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST "https://api.v0.dev/v1/chats" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "system": "You are a helpful assistant",
    "message": "Build a React component for a user profile card",
    "responseMode": "async"
  }'`}
    />
  </ExampleVariant>

  <ExampleVariant name="Attachments" description="Create chat with file attachments">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.create({
  system: 'You are a design expert',
  message: 'Recreate this design as a React component',
  attachments: [
    {
      url: 'https://example.com/design-mockup.png',
    },
    {
      url: 'https://example.com/theme.ts',
    },
  ],
})

console.log(result)`}
    />

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST "https://api.v0.dev/v1/chats" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "system": "You are a design expert",
    "message": "Recreate this design as a React component", 
    "attachments": [
      {
        "url": "https://example.com/design-mockup.png"
      },
      {
        "url": "https://example.com/theme.ts"
      }
    ]
  }'`}
    />
  </ExampleVariant>

  <ExampleVariant name="Metadata" description="Create chat with custom metadata">
    <CodeVariant
      language="TypeScript"
      title="TypeScript Example"
      code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.create({
  message: 'Create a dashboard component',
  metadata: {
    userId: 'user_abc123',
    organizationId: 'org_xyz789',
    source: 'mobile-app',
  },
})

// Later, retrieve the metadata
console.log(result.metadata.userId) // 'user_abc123'`}
    />

    <CodeVariant
      language="cURL"
      title="cURL Example"
      code={`curl -X POST "https://api.v0.dev/v1/chats" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Create a dashboard component",
    "metadata": {
      "userId": "user_abc123",
      "organizationId": "org_xyz789",
      "source": "mobile-app"
    }
  }'`}
    />
  </ExampleVariant>
</CustomCodeBlockWithExamples>

## API Signature

### Request

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "message",
    "type": "string",
    "required": true,
    "description": "Creates a new chat using a user message, optional system context, and model configuration. Useful for prompting the model within the scope of a specific project.",
    "deprecated": false
  },
  {
    "name": "attachments",
    "type": "object[]",
    "required": false,
    "description": "A list of files or assets to be included in the conversation context. Useful when the chat or task requires referencing documents, images, or other resources.",
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
          "description": "",
          "deprecated": false
        }
      ]
    }
  },
  {
    "name": "system",
    "type": "string",
    "required": false,
    "description": "Provides system-level context or background for the chat. This is typically used to specify frameworks, tools, or development environments relevant to the task.",
    "deprecated": false
  },
  {
    "name": "chatPrivacy",
    "type": "'public' | 'private' | 'team-edit' | 'team' | 'unlisted'",
    "required": false,
    "description": "Determines the privacy setting of the chat. This can control whether the chat is visible only to the user, to team members, or is public.",
    "deprecated": false
  },
  {
    "name": "projectId",
    "type": "string",
    "required": false,
    "description": "Associates the chat with a specific project in your workspace. Helps organize and group related chats under a common project context.",
    "deprecated": true
  },
  {
    "name": "modelConfiguration",
    "type": "object",
    "required": false,
    "description": "Settings that control how the model behaves in the chat.",
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
    "name": "responseMode",
    "type": "'sync' | 'async' | 'experimental_stream'",
    "required": false,
    "description": "Controls how the response is delivered.\n\n- `\"sync\"`: The response is returned immediately with the HTTP request.\n- `\"async\"`: Returns a message placeholder immediately; use getById to poll for completion status and final output.\n- `\"experimental_stream\"`: Returns content parts as Server-Sent Events for real-time streaming.",
    "deprecated": false
  },
  {
    "name": "designSystemId",
    "type": [
      "string",
      "null"
    ],
    "required": false,
    "description": "The ID of a design system to apply to this chat. Design systems provide consistent styling and components for generated UI.",
    "deprecated": false
  },
  {
    "name": "attachedSkillIds",
    "type": "string[]",
    "required": false,
    "description": "Skill IDs (from skills.sh) to attach. Backwards-compatible alias for `skills` entries of type `remote`. Maximum 3.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "string",
      "required": true,
      "description": "The ID of a skill.",
      "deprecated": false,
      "properties": []
    }
  },
  {
    "name": "skills",
    "type": "('remote' | 'memory' | 'project')[]",
    "required": false,
    "description": "Skills to force-attach to the chat. Supports skills.sh (`remote`), user/team memory (`memory`), and project (`project`) skills. Merged with `attachedSkillIds`. Maximum 3.",
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
    "name": "metadata",
    "type": "Record<string, string>",
    "required": false,
    "description": "Arbitrary key-value data to attach to the chat. Useful for storing additional data about the chat, such as external user IDs. Keys must be 1-40 characters, values must be 1-500 characters, and a maximum of 50 key-value pairs are allowed.",
    "deprecated": false
  },
  {
    "name": "mcpServerIds",
    "type": "string[]",
    "required": false,
    "description": "Array of MCP server IDs to enable for this chat. When provided, only the specified servers will be used. When omitted, falls back to the user's enabled MCP servers. Pass an empty array to explicitly disable all MCP servers.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "string",
      "required": true,
      "description": "The ID of an MCP server.",
      "deprecated": false,
      "properties": []
    }
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