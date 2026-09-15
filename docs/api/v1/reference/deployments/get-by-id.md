---
title: Get Deployment
description: Get a deployment by ID. This will return the details of the deployment, including the inspector URL, chat ID, project ID, version ID, API URL, and web URL.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

# Get Deployment



<EndpointDisplay method="get" path="/deployments/{deploymentId}" />

<Callout type="warning">
  **Deprecated**: This method is deprecated. Use the [Vercel API](https://docs.vercel.com/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url) directly to get deployments.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.deployments.getById({
  deploymentId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/deployments/123 \
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
    "name": "deploymentId",
    "type": "string",
    "required": true,
    "description": "Path parameter \"deploymentId\""
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