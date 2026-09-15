---
title: Delete Environment Variables
description: Deletes multiple environment variables for a given project by their IDs.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v2/guides/environment-variables
---

# Delete Environment Variables



<EndpointDisplay method="post" path="/projects/{projectId}/env-vars/delete" />

<Callout type="warning">
  **Deprecated**: v1 environment variables were connected to v0 Projects, which are deprecated. To manage environment variables for a chat, see the [Environment Variables guide](/docs/api/v2/guides/environment-variables).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.deleteEnvVars({
  projectId: 'project_abc123',
  environmentVariableIds: ['env_def456', 'env_ghi789'],
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/projects/project_abc123/env-vars/delete \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "environmentVariableIds": [
      "env_def456",
      "env_ghi789"
    ]
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
    "name": "projectId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the project whose environment variables should be deleted."
  }
]}
/>

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "environmentVariableIds",
    "type": "string[]",
    "required": true,
    "description": "An array of environment variable IDs to delete.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "string",
      "required": true,
      "description": "The unique identifier of the environment variable to delete.",
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
    "name": "object",
    "type": "'list'",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "data",
    "type": "object[]",
    "required": true,
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
          "name": "id",
          "type": "string",
          "required": true,
          "description": "",
          "deprecated": false
        },
        {
          "name": "object",
          "type": "'environment_variable'",
          "required": true,
          "description": "",
          "deprecated": false
        },
        {
          "name": "deleted",
          "type": "'true'",
          "required": true,
          "description": "",
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