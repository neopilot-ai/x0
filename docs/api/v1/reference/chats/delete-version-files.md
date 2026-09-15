---
title: Delete Chat Version Files
description: Deletes source files from a specific chat version (block). Files are removed from the version and a new source version is created.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Delete Chat Version Files



<EndpointDisplay method="post" path="/chats/{chatId}/versions/{versionId}/files/delete" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.deleteVersionFiles({
  chatId: 'chat_abc123',
  versionId: 'version_xyz789',
  filePaths: ['components/old-component.tsx', 'lib/unused-utils.ts'],
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/chats/{chatId}/versions/{versionId}/files/delete \\
  -H "Authorization: Bearer $V0_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"filePaths": ["components/old-component.tsx", "lib/unused-utils.ts"]}'`}
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
    "description": "The unique identifier of the chat containing the version to delete files from."
  },
  {
    "name": "versionId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the version (block) to delete files from."
  }
]}
/>

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "filePaths",
    "type": "string[]",
    "required": true,
    "description": "Array of file paths to delete (e.g., [\"components/test.tsx\", \"lib/utils.ts\"]). Must contain at least one file path.",
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
    "description": "A list of files that remain in this version after deletion.",
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
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)