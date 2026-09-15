---
title: Get Project by Chat ID
description: Retrieves the v0 project associated with a given chat. Useful for determining the context or scope of a chat session.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Get Project by Chat ID



<EndpointDisplay method="get" path="/chats/{chatId}/project" />

<Callout type="warning">
  **Deprecated**: v0 Projects are deprecated. Use [Get Chat](/docs/api/v2/reference/chats/get-chat) to read chat metadata and `vercelProjectId`. For Vercel project details, use the Vercel API to [find a project by ID or name](https://vercel.com/docs/rest-api/projects/find-a-project-by-id-or-name).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.getByChatId({
  chatId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/projects/chat/123 \
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
    "description": "The ID of the chat to retrieve the associated project for."
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
    "description": "A unique identifier for the project.",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'project'",
    "required": true,
    "description": "Fixed value identifying this object as a project.",
    "deprecated": false
  },
  {
    "name": "name",
    "type": "string",
    "required": true,
    "description": "The name of the project as defined by the user.",
    "deprecated": false
  },
  {
    "name": "privacy",
    "type": "'private' | 'team'",
    "required": true,
    "description": "The privacy setting for the project - either private or team.",
    "deprecated": false
  },
  {
    "name": "vercelProjectId",
    "type": "string",
    "required": false,
    "description": "Optional ID of the linked Vercel project, if connected.",
    "deprecated": false
  },
  {
    "name": "createdAt",
    "type": "string",
    "required": true,
    "description": "The ISO timestamp representing when the project was created.",
    "deprecated": false
  },
  {
    "name": "updatedAt",
    "type": "string",
    "required": false,
    "description": "The ISO timestamp of the most recent update, if available.",
    "deprecated": false
  },
  {
    "name": "apiUrl",
    "type": "string",
    "required": true,
    "description": "The API endpoint URL for accessing this project programmatically.",
    "deprecated": false
  },
  {
    "name": "webUrl",
    "type": "string",
    "required": true,
    "description": "The web URL where the project can be viewed or managed.",
    "deprecated": false
  },
  {
    "name": "description",
    "type": "string",
    "required": false,
    "description": "The description of the project.",
    "deprecated": false
  },
  {
    "name": "instructions",
    "type": "string",
    "required": false,
    "description": "The instructions for the project.",
    "deprecated": false
  },
  {
    "name": "chats",
    "type": "object[]",
    "required": true,
    "description": "List of all chats that are associated with this project.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "object",
      "required": true,
      "description": "Summary of a chat, including metadata like privacy, author, latest version, and URLs.",
      "deprecated": false,
      "properties": [
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
          "description": "The most recent generated version of the chat, if available.",
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
            }
          ]
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