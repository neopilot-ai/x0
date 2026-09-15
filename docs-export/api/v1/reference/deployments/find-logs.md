---
title: Find Deployment Logs
description: Retrieves logs for a specific deployment. Supports filtering by timestamp to fetch only recent logs.
badge: "GET"
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.
# Find Deployment Logs



<EndpointDisplay method="get" path="/deployments/{deploymentId}/logs" />

<Callout type="warning">
  **Deprecated**: This method is deprecated. Use the [Vercel API](https://docs.vercel.com/docs/rest-api/reference/endpoints/deployments/get-deployment-events) directly to inspect deployment logs.
</Callout>

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0-sdk'

const result = await v0.deployments.findLogs({
  deploymentId: '123',
})

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET https://api.v0.dev/v1/deployments/123/logs \
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
    "description": "The unique identifier of the deployment to retrieve logs for. Provided as a path parameter."
  }
]}
/>

#### Query Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "since",
    "type": "number",
    "required": false,
    "description": "A UNIX timestamp (in seconds) used to filter logs. Returns only log entries generated after the specified time."
  }
]}
/>

### Response

<APISignature
  title=""
  parameters={[
  {
    "name": "logs",
    "type": "object[]",
    "required": true,
    "description": "Array of log entries.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "object",
      "required": true,
      "description": "",
      "deprecated": false,
      "properties": [
        {
          "name": "createdAt",
          "type": "string",
          "required": true,
          "description": "Log creation timestamp.",
          "deprecated": false
        },
        {
          "name": "deploymentId",
          "type": "string",
          "required": true,
          "description": "Deployment ID.",
          "deprecated": false
        },
        {
          "name": "id",
          "type": "string",
          "required": true,
          "description": "Log entry ID.",
          "deprecated": false
        },
        {
          "name": "text",
          "type": "string",
          "required": true,
          "description": "Log message content.",
          "deprecated": false
        },
        {
          "name": "type",
          "type": "'stdout' | 'stderr'",
          "required": true,
          "description": "Output stream type.",
          "deprecated": false
        },
        {
          "name": "level",
          "type": "'error' | 'warning' | 'info'",
          "required": false,
          "description": "Log severity level.",
          "deprecated": false
        },
        {
          "name": "object",
          "type": "'deployment_log'",
          "required": true,
          "description": "Object type identifier.",
          "deprecated": false
        }
      ]
    }
  },
  {
    "name": "nextSince",
    "type": "number",
    "required": false,
    "description": "Timestamp for pagination.",
    "deprecated": false
  },
  {
    "name": "object",
    "type": "'list'",
    "required": true,
    "description": "Object type identifier.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)