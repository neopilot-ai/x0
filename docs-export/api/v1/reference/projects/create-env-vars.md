---
title: Create Environment Variables
description: Creates new environment variables for a given project. This endpoint will fail if any of the specified environment variable keys already exist, unless upsert is set to true.
badge: 'POST'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
related:
  - /docs/api/v2/guides/environment-variables
---

# Create Environment Variables

<EndpointDisplay method="post" path="/projects/{projectId}/env-vars" />

<Callout type="warning">
  **Deprecated**: v1 environment variables were connected to v0 Projects, which are deprecated. To add environment variables for a chat, see the [Environment Variables guide](/docs/api/v2/guides/environment-variables).
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

// Create new environment variables (will fail if keys already exist)
const result = await v0.projects.createEnvVars({
projectId: 'project_abc123',
environmentVariables: [
{
key: 'DATABASE_URL',
value: 'postgresql://user:pass@host:5432/db',
},
{
key: 'API_SECRET_KEY',
value: 'sk_1234567890abcdef',
},
],
})

console.log(result)

// Upsert environment variables (will overwrite existing values)
const upsertResult = await v0.projects.createEnvVars({
projectId: 'project_abc123',
upsert: true,
environmentVariables: [
{
key: 'DATABASE_URL',
value: 'postgresql://newuser:newpass@newhost:5432/newdb',
},
],
})

console.log(upsertResult)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X POST https://api.v0.dev/v1/projects/project_abc123/env-vars \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "environmentVariables": [
      {
        "key": "DATABASE_URL",
        "value": "postgresql://user:pass@host:5432/db"
      },
      {
        "key": "API_SECRET_KEY",
        "value": "sk_1234567890abcdef"
      }
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
"description": "The unique identifier of the project where environment variables should be created."
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

#### Body

<APISignature
title=""
parameters={[
{
"name": "environmentVariables",
"type": "object[]",
"required": true,
"description": "An array of environment variables to create with key and value fields.",
"deprecated": false,
"arrayItems": {
"name": "item",
"type": "object",
"required": true,
"description": "",
"deprecated": false,
"properties": [
{
"name": "key",
"type": "string",
"required": true,
"description": "The name of the environment variable.",
"deprecated": false
},
{
"name": "value",
"type": "string",
"required": true,
"description": "The value of the environment variable.",
"deprecated": false
}
]
}
},
{
"name": "upsert",
"type": "boolean",
"required": false,
"description": "Whether to overwrite existing environment variables with the same keys. Defaults to false.",
"deprecated": false
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
"required": false,
"description": "A unique identifier for the environment variable.",
"deprecated": false
},
{
"name": "object",
"type": "'environment_variable'",
"required": false,
"description": "The object type.",
"deprecated": false
},
{
"name": "key",
"type": "string",
"required": false,
"description": "The name of the environment variable.",
"deprecated": false
},
{
"name": "value",
"type": "string",
"required": false,
"description": "The value of the environment variable.",
"deprecated": false
},
{
"name": "decrypted",
"type": "boolean",
"required": false,
"description": "Whether the value is decrypted or encrypted.",
"deprecated": false
},
{
"name": "createdAt",
"type": "number",
"required": false,
"description": "The timestamp when the environment variable was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "number",
"required": false,
"description": "The timestamp when the environment variable was last updated.",
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
