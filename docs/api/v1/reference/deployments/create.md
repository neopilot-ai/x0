---
title: Create Deployment
description: Create a new deployment for a specific chat and version. This will trigger a deployment to Vercel.
badge: "POST"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Create Deployment



<EndpointDisplay method="post" path="/deployments" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.deployments.create({
  chatId: '123',
  versionId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X POST https://api.v0.dev/v1/deployments \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "chatId": "123",
    "versionId": "123"
  }'`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Body

<APISignature
  title=""
  parameters={[
  {
    "name": "projectId",
    "type": "string",
    "required": false,
    "description": "",
    "deprecated": true
  },
  {
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "",
    "deprecated": false
  },
  {
    "name": "versionId",
    "type": "string",
    "required": true,
    "description": "",
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
    "description": "A unique identifier for the deployment.",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'deployment'",
    "required": true,
    "description": "Fixed value identifying this object as a deployment.",
    "deprecated": false
  },
  {
    "name": "inspectorUrl",
    "type": "string",
    "required": true,
    "description": "URL to the deployment inspector.",
    "deprecated": false
  },
  {
    "name": "chatId",
    "type": "string",
    "required": true,
    "description": "The ID of the chat that this deployment is scoped to.",
    "deprecated": false
  },
  {
    "name": "projectId",
    "type": "string",
    "required": false,
    "description": "The ID of the project that this deployment is scoped to.",
    "deprecated": true
  },
  {
    "name": "versionId",
    "type": "string",
    "required": true,
    "description": "The ID of the version that this deployment is scoped to.",
    "deprecated": false
  },
  {
    "name": "apiUrl",
    "type": "string",
    "required": true,
    "description": "The API endpoint URL for accessing this deployment programmatically.",
    "deprecated": false
  },
  {
    "name": "webUrl",
    "type": "string",
    "required": true,
    "description": "The web URL where the deployment can be viewed or managed.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)