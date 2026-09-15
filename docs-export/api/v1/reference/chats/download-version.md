---
title: Download version files
description: Download all files for a specific chat version as a zip or tarball archive. Use includeDefaultFiles=true to include all deployment files (package.json, configuration files, etc.) or false/omitted to return only the generated source files.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Download version files



<EndpointDisplay method="get" path="/chats/{chatId}/versions/{versionId}/download" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.chats.downloadVersion({
  chatId: '123',
  versionId: '456',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v1/chats/123/versions/456/download" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -o "version-files.zip"`}
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
    "description": "The unique identifier of the chat containing the version. Provided as a path parameter."
  },
  {
    "name": "versionId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the version to download. Provided as a path parameter."
  }
]}
/>

#### Query Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "format",
    "type": "'zip' | 'tarball'",
    "required": false,
    "description": "The archive format for the download. Choose \"zip\" for broad compatibility or \"tarball\" for Unix/Linux systems."
  },
  {
    "name": "includeDefaultFiles",
    "type": "'true' | 'false'",
    "required": false,
    "description": "When true, includes all default files (package.json, configuration files, etc.) that would be part of a complete deployment. When false or omitted, returns only the generated source files."
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)