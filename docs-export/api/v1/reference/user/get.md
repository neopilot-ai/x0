---
title: Get User
description: Retrieves information about the authenticated user, including their ID, name, email, and account metadata.
badge: 'GET'
product: v0 API
type: reference
prerequisites:
  - /docs/api/v1/quickstart
---

---

> **Deprecated**: The v1 API has been replaced by v2. See [Migrate from v1 to v2](/docs/api/v2/guides/migrating-from-v1-to-v2) for the current API.

# Get User

<EndpointDisplay method="get" path="/user" />

## Usage

<CustomCodeBlock languages={['TypeScript', 'cURL']} defaultLanguage="TypeScript">
<CodeVariant
language="TypeScript"
title="TypeScript Example"
code={`import { v0 } from 'v0-sdk'

const result = await v0.user.get()

console.log(result)`}
/>

<CodeVariant
language="cURL"
title="cURL Example"
code={`curl -X GET https://api.v0.dev/v1/user \
  -H "Authorization: Bearer $V0_API_KEY" \
  -H "Content-Type: application/json"`}
/>
</CustomCodeBlock>

### Response

<APISignature
title=""
parameters={[
{
"name": "id",
"type": "string",
"required": true,
"description": "A unique identifier for the user.",
"deprecated": false
},
{
"name": "object",
"type": "'user'",
"required": true,
"description": "Fixed value identifying this object as a user.",
"deprecated": false
},
{
"name": "name",
"type": "string",
"required": false,
"description": "Optional full name of the user.",
"deprecated": false
},
{
"name": "email",
"type": "string",
"required": true,
"description": "The user's email address.",
"deprecated": false
},
{
"name": "avatar",
"type": "string",
"required": true,
"description": "URL to the user's avatar image.",
"deprecated": false
},
{
"name": "createdAt",
"type": "string",
"required": true,
"description": "The ISO timestamp representing when the user was created.",
"deprecated": false
},
{
"name": "updatedAt",
"type": "string",
"required": false,
"description": "The ISO timestamp of the last update to the user.",
"deprecated": false
}
]}
/>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
