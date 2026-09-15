---
title: Delete Project
description: Deletes a specific project based on the provided projectId. This operation marks the project as deleted and is irreversible.
badge: "DEL"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Delete Project



<EndpointDisplay method="delete" path="/projects/{projectId}" />

<Callout type="warning">
  **Deprecated**: v0 Projects are deprecated. Use the Vercel API to [delete a project](https://vercel.com/docs/rest-api/projects/delete-a-project).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.delete({
  projectId: 'abcd1234',
  deleteAllChats: true,
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X DELETE "https://api.v0.dev/v1/projects/abcd1234?deleteAllChats=true" \
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
    "name": "projectId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the project to delete. This must be passed as a path parameter in the URL."
  }
]}
/>

#### Query Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "deleteAllChats",
    "type": "boolean",
    "required": false,
    "description": "If true, deletes all the chats associated with the given project ID. Deleting is permanent. Defaults to false."
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
    "description": "The unique identifier of the deleted project.",
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
    "name": "deleted",
    "type": "'true'",
    "required": true,
    "description": "Confirmation that the project has been deleted.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)