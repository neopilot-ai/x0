---
title: Databases
description: Build full-stack applications with v0's database integrations
product: v0
type: integration
related:
  - /docs/external-apis
  - /docs/full-stack-apps
  - /docs/snowflake
---

# Databases

When building applications, it can be useful to add data persistence to properly mock out more complex flows. v0 enables simple, one-click database integrations with popular providers, including [Upstash](https://upstash.com/), [Neon](https://neon.com/), [Supabase](https://supabase.com/), and [Vercel Blob](https://vercel.com/docs/vercel-blob).

For data warehouse workflows, you can also connect [Snowflake](/docs/snowflake) to build data apps, query accessible tables, and deploy apps to Snowflake.

## Setting up a database

You can connect a database to v0 from a chat thread or project.

### From settings

Go to **Project menu** `...` → **Settings** → **Integrations** to see available database options.

- To reuse an existing database, click the arrow to select from previously created stores.
- To add a new one, click **Create** to open the Marketplace and accept the provider's terms.

Once set up, newer generations in this project will be able to use the connected database.

### From a chat thread

You can also connect a database directly from chat:

- Click the suggested action, or
- Ask v0 to add a database integration.

Either path opens the Marketplace with click-through terms for supported providers.

### Managing integrations

Adding an integration provisions a new user account on that service and adds the necessary environment variables to your project. You can manage these integrations through the [Vercel Marketplace](https://vercel.com/marketplace).

When you add an integration requiring an environment variable outside of general setup, you will be prompted in the chat to add the necessary variables. You can also add your own environment variables anytime from **Project menu** `...` → **Settings** → **Environment Variables**.

For SQL-based integrations, v0 can generate and execute SQL. This lets you create, update, and drop tables.

For [AI models](/docs/ai-models), you can set spend limits, auto-top-ups, and other settings during setup. This allows you to control your usage and costs.

## Available providers

- **Neon** — Serverless PostgreSQL
- **Supabase** — PostgreSQL with auth and realtime
- **Upstash for Redis** — Serverless Redis
- **Vercel Blob** — File storage
- **Snowflake** — Data warehouse (see [Snowflake integration](/docs/snowflake))
