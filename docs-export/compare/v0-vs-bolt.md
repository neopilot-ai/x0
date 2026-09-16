---
title: v0 vs Bolt
description: A source-backed comparison of v0 and Bolt.
product: v0
type: overview
---

# v0 vs Bolt

_Last reviewed: July 28, 2026 · Owner: v0 Docs_

v0 and Bolt both generate full-stack web projects and connect to GitHub. They differ in their default runtime, hosting model, and the deployment and collaboration tools surrounding the generated code.

## At a glance

| Area                        | v0                                                                                                                                                                         | Bolt                                                                                                                                                                                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Full-stack development**  | Builds [full-stack applications](/docs/full-stack-apps) with frontend code, server logic, API endpoints, and database integrations.                                        | Builds full-stack web applications in a browser-based environment and supports a [built-in database](https://support.bolt.new/cloud/database) with authentication and server functions.                                                       |
| **Backend choices**         | Supports Marketplace integrations and custom code for Supabase, Neon, Upstash, Vercel services, and other providers.                                                       | Uses Bolt Database by default for newer projects and also supports [Supabase](https://support.bolt.new/integrations/supabase) for databases, authentication, and edge functions.                                                              |
| **GitHub workflow**         | Creates chat-specific working branches, commits generated changes, and opens pull requests against a selected base branch. See [GitHub](/docs/github).                     | Can import or create repositories, create and switch branches, commit working changes automatically, and fetch external updates. Branches are [merged in GitHub](https://support.bolt.new/integrations/git), not inside Bolt.                 |
| **Hosting**                 | Publishes to Vercel with preview and production deployments, custom domains, and framework-aware server runtimes. See [Deployments](/docs/deployments).                    | Includes [built-in hosting](https://support.bolt.new/cloud/hosting) for Free and Pro users on a `.bolt.host` domain. Free hosting currently includes 10 GB bandwidth and 333,333 requests per month with a hard cap and a Made in Bolt badge. |
| **Security and compliance** | Vercel documents SOC 2 Type 2, ISO 27001:2022, GDPR support, and PCI DSS attestations in its [security and compliance guide](https://vercel.com/docs/security/compliance). | Bolt's [Trust Center](https://trust.bolt.new/) lists SOC 2 Type 2, GDPR, and CCPA and describes browser-level isolation and encryption controls.                                                                                              |
| **Deployment operations**   | Vercel provides deployment logs, analytics, observability, rollbacks, preview environments, and production controls.                                                       | Bolt Cloud provides publishing and hosting analytics. Free sites stop serving traffic after the account-level monthly hosting cap is reached and resume when usage resets.                                                                    |

## Official sources reviewed

- v0: [Full-stack apps](/docs/full-stack-apps), [GitHub](/docs/github), [Deployments](/docs/deployments), and [Vercel security and compliance](https://vercel.com/docs/security/compliance)
- Bolt: [Hosting](https://support.bolt.new/cloud/hosting), [hosting plans](https://support.bolt.new/cloud/hosting/plans), [GitHub integration](https://support.bolt.new/integrations/git), [Supabase integration](https://support.bolt.new/integrations/supabase), and [Trust Center](https://trust.bolt.new/)

## Ready to build?

<LearnMore href="https://v0.app" icon="arrow">
  Get started with v0
</LearnMore>

---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)
