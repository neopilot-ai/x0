---
title: Get Usage Summary
description: Returns credit usage for the active billing scope. Team owners and billing members receive team-wide usage by default; other team members receive their own usage.
badge: "GET"
---

# Get Usage Summary



<EndpointDisplay method="get" path="/usage/summary" versionPrefix="/v2" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
  <CodeVariant
    language="TypeScript"
    title="TypeScript Example"
    code={`import { v0 } from 'v0'

const result = await v0.usage.getSummary()

console.log(result)`}
  />

  <CodeVariant
    language="cURL"
    title="cURL Example"
    code={`curl -X GET "https://api.v0.dev/v2/usage/summary" \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
  />
</CustomCodeBlock>

## API Signature

### Request

#### Query Parameters

<APISignature
  title=""
  parameters={[
  {
    "name": "start",
    "type": "string",
    "required": false,
    "description": "Inclusive ISO 8601 start timestamp. Defaults to seven days ago.",
    "deprecated": false
  },
  {
    "name": "end",
    "type": "string",
    "required": false,
    "description": "Exclusive ISO 8601 end timestamp. Defaults to the current time.",
    "deprecated": false
  },
  {
    "name": "userId",
    "type": "string",
    "required": false,
    "description": "Filter usage by user. Team owners and billing members may select any team member; other callers may select only themselves.",
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
    "type": "'usage_summary'",
    "required": true,
    "description": "Object type identifier.",
    "deprecated": false
  },
  {
    "name": "range",
    "type": "object",
    "required": true,
    "description": "Time range covered by the response.",
    "deprecated": false,
    "properties": [
      {
        "name": "start",
        "type": "string",
        "required": true,
        "description": "Inclusive ISO 8601 start timestamp.",
        "deprecated": false
      },
      {
        "name": "end",
        "type": "string",
        "required": true,
        "description": "Exclusive ISO 8601 end timestamp.",
        "deprecated": false
      }
    ]
  },
  {
    "name": "scope",
    "type": "object",
    "required": true,
    "description": "Authorized billing scope used for this response.",
    "deprecated": false,
    "properties": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Billing scope identifier.",
        "deprecated": false
      },
      {
        "name": "type",
        "type": "'team' | 'personal'",
        "required": true,
        "description": "Billing scope type.",
        "deprecated": false
      },
      {
        "name": "isTeamWide",
        "type": "boolean",
        "required": true,
        "description": "Whether the response includes usage for the entire team.",
        "deprecated": false
      },
      {
        "name": "userId",
        "type": "string",
        "required": false,
        "description": "User attribution applied to the response, when filtered.",
        "deprecated": false
      }
    ]
  },
  {
    "name": "credits",
    "type": "object",
    "required": true,
    "description": "Credits consumed during the selected range.",
    "deprecated": false,
    "properties": [
      {
        "name": "plan",
        "type": "number",
        "required": true,
        "description": "Credits consumed from included plan credits.",
        "deprecated": false
      },
      {
        "name": "onDemand",
        "type": "number",
        "required": true,
        "description": "Credits consumed from on-demand credits.",
        "deprecated": false
      },
      {
        "name": "total",
        "type": "number",
        "required": true,
        "description": "Total credits consumed.",
        "deprecated": false
      }
    ]
  },
  {
    "name": "daily",
    "type": "object[]",
    "required": true,
    "description": "Daily credit totals in chronological order.",
    "deprecated": false,
    "arrayItems": {
      "name": "item",
      "type": "object",
      "required": true,
      "description": "",
      "deprecated": false,
      "properties": [
        {
          "name": "date",
          "type": "string",
          "required": true,
          "description": "UTC date in YYYY-MM-DD format.",
          "deprecated": false
        },
        {
          "name": "credits",
          "type": "object",
          "required": true,
          "description": "Credits consumed during the selected range.",
          "deprecated": false,
          "properties": [
            {
              "name": "plan",
              "type": "number",
              "required": true,
              "description": "Credits consumed from included plan credits.",
              "deprecated": false
            },
            {
              "name": "onDemand",
              "type": "number",
              "required": true,
              "description": "Credits consumed from on-demand credits.",
              "deprecated": false
            },
            {
              "name": "total",
              "type": "number",
              "required": true,
              "description": "Total credits consumed.",
              "deprecated": false
            }
          ]
        }
      ]
    }
  },
  {
    "name": "dataAsOf",
    "type": "string",
    "required": false,
    "description": "Timestamp of the reporting snapshot backing this response.",
    "deprecated": false
  }
]}
/>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)