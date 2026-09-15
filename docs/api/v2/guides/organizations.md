---
title: Organizations
description: Learn how to use the v0 API with Vercel Organizations to offer v0-style chat experiences to your customers.
type: guide
---

# Organizations



This guide explains how a platform customer can use the **v0 API** with **Vercel Organizations** to offer v0-style chat experiences to their own customers.

<Callout type="info">
  **Beta feature**: These endpoints are in private beta and there may be breaking changes.
</Callout>

## The model

The integration uses three layers:

| Layer            | Purpose                                  | Used for                                                                                |
| ---------------- | ---------------------------------------- | --------------------------------------------------------------------------------------- |
| **Parent team**  | The billing anchor for the organization  | Creating the organization, owning the parent v0 API key, and managing child-team limits |
| **Organization** | The container that groups customer teams | Rollup billing, spend management, team lifecycle                                        |
| **Child team**   | The isolation boundary for each customer | Customer-scoped v0 chats, API keys, usage, and limits                                   |

**Recommended mapping**: one child team per customer account or workspace.

## Prerequisites

Before using this flow:

1. The parent team must be on **Enterprise Flex Commit**.
2. The parent team owner must have the **v0 Builder** role.
   * Can be granted at `vercel.com/team-slug/~/settings/members`
3. Recommended: use a dedicated Vercel system user for organization automation.
   * Create the Vercel API token and parent v0 API key as this same user.
   * Use those credentials to create the organization, create child teams, create child-team API keys, and manage spend limits.
   * Add this user to the parent team and grant it `OrgAdmin`.
4. Create a Vercel API token at [vercel.com/account/settings/tokens](https://vercel.com/account/settings/tokens) with **Full Account** scope.
   * This should be done by the system user or parent team owner that will manage organization automation.
5. The parent team must be allowlisted for Organizations and v0 API access.

## Setup flow

### 1. Create an organization

Create a Vercel Organization attached to the Enterprise Flex Commit parent team.

```typescript
const organization = await fetch("https://api.vercel.com/v1/organizations", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    teamId: "team_parent",
    slug: "acme-platform",
  }),
}).then((res) => res.json())
```

### 2. Confirm OrgAdmin access

Confirm that the Vercel user whose API token and parent v0 API key will manage child-team API keys and spend limits has the `OrgAdmin` permission on the parent team. If you use a system user, check that user.

Open the parent team's Members settings at `https://vercel.com/<team-slug>/~/settings/members`, select the user, and grant `OrgAdmin` if it is missing.

### 3. Create a parent v0 API key

Create a parent-team API key at [v0.app/settings/keys](https://v0.app/settings/keys). Use the same Vercel user that owns the Vercel API token for organization automation.

Use this key to:

* Create API keys for child teams
* Set organization and child-team spend limits

<Callout type="warn">
  Store the key immediately. v0 only stores a hash, so lost keys cannot be recovered.
</Callout>

### 4. Create customer teams

For each customer, create a new Vercel team under the organization.

```typescript
const customerTeam = await fetch("https://api.vercel.com/v1/teams", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    organizationId: organization.organizationId,
    slug: "acme-customer-123",
    name: "Acme Customer 123",
  }),
}).then((res) => res.json())
```

Store the returned `teamId`; it becomes the customer's child team for v0 isolation, usage, and limits.

### 5. Create a child-team v0 API key

Use the parent v0 API key to create an API key scoped to the child team.

```typescript
const childApiKey = await fetch(
  `https://api.v0.dev/v2/organizations/${organization.organizationId}/teams/${customerTeam.id}/api-keys`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PARENT_V0_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Production Key",
    }),
  },
).then((res) => res.json())
```

The response returns the child team's API key once. Store it as a customer-scoped secret.

### 6. Use the child-team key for chats

Use the child team's API key to create a customer-scoped SDK client, then use that client for the customer's chat operations.

```typescript
import { createV0Client } from 'v0'

const customerV0 = createV0Client({ auth: childApiKey.key })
const result = await customerV0.chats.create({
  message: 'Create a landing page',
  metadata: {
    internalUserId: 'user_123',
  },
})

if (result.error) throw new Error(result.error.message)

const chat = result.data.chat
```

Chat and message responses include usage data. Use the returned usage payload for real-time customer usage tracking.

## Billing and spend limits

* Child-team invoices roll up to the parent team.
* Organization-level spend limits apply by default to child teams.
* Team-level spend limits override the organization-level limit.
* Limits reset monthly.
* There are no separate usage endpoints. Usage is returned directly in chat and message responses.

Use organization-level limits for broad guardrails and team-level limits for customer-specific caps.

## Access and isolation

| Credential                | Can do                                       | Cannot do                                 |
| ------------------------- | -------------------------------------------- | ----------------------------------------- |
| **Parent v0 API key**     | Create child-team API keys and manage limits | Create or manage chats inside child teams |
| **Child-team v0 API key** | Create and manage chats for that child team  | Access other child teams                  |

Metadata can be used for attribution and analytics, but it is **not** an access-control boundary. The team remains the isolation boundary.

## What to store

Store these values securely:

| Value                 | Where it comes from | Why it matters                            |
| --------------------- | ------------------- | ----------------------------------------- |
| `organizationId`      | Organizations API   | Used for organization-scoped v0 API calls |
| `teamId` per customer | Vercel team         | Maps customers to child teams             |
| Parent v0 API key     | v0 settings         | Creates child keys and manages limits     |
| Child-team v0 API key | v0 API key endpoint | Used for that customer's chat operations  |

## Important notes

* Do **not** use the Vercel invite API for this flow. Usage should be attributed to teams, not individual invited users.
* Keep the parent team separate from internal-use teams when possible.
* Treat API keys as unrecoverable secrets.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)