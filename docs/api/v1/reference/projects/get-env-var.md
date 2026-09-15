---
title: Get Environment Variable
description: Retrieves a specific environment variable for a given project by its ID, including its value.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v2/guides/environment-variables
---

# Get Environment Variable



<EndpointDisplay method="get" path="/projects/{projectId}/env-vars/{environmentVariableId}" />

<Callout type="warning">
  **Deprecated**: v1 environment variables were connected to v0 Projects, which are deprecated. To read environment variables for a chat, see the [Environment Variables guide](/docs/api/v2/guides/environment-variables).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.projects.getEnvVar({
  projectId: 'project_abc123',
  environmentVariableId: 'env_def456',
  decrypted: 'true',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/projects/project_abc123/env-vars/env_def456?decrypted=true \
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
    "description": "The unique identifier of the project that owns the environment variable."
  },
  {
    "name": "environmentVariableId",
    "type": "string",
    "required": true,
    "description": "The unique identifier of the environment variable to retrieve."
  }
]}
/>

#### Query Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "decrypted",
    "type": "'true' | 'false'",
    "required": false,
    "description": "Whether to return decrypted values. Defaults to false (encrypted)."
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "object",
    "type": "'environment_variable'",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "data",
    "type": "object",
    "required": true,
    "description": "",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)