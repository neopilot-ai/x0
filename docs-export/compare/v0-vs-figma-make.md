---
title: v0 vs Figma Make
description: A source-backed comparison of v0 and Figma Make.
product: v0
type: overview
---

# v0 vs Figma Make



*Last reviewed: July 28, 2026 · Owner: v0 Docs*

v0 and Figma Make both turn prompts and visual context into working interfaces. Figma Make now builds functional prototypes and web apps, while v0 centers the workflow on application code, Git branches, and Vercel deployments.

## At a glance

| Area                                   | v0                                                                                                                                                                         | Figma Make                                                                                                                                                                                                                                                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Functional application development** | Builds [full-stack applications](/docs/full-stack-apps) with editable frontend code, backend endpoints, server logic, and database integrations.                                | Creates and edits [functional prototypes and web apps](https://help.figma.com/hc/en-us/articles/31304485164695-Create-and-edit-a-functional-prototype-or-web-app), including interactive UI and published web experiences.                                                                                     |
| **Backend support**                    | Supports Supabase, Neon, Upstash, Vercel services, custom APIs, and other Marketplace integrations.                                                                        | Integrates with [Supabase](https://help.figma.com/hc/en-us/articles/32640822050199-Add-a-backend-to-a-functional-prototype-or-web-app) for secret storage, compute, authentication flows, and a Postgres-backed key-value data layer. Figma Make does not currently set up a full SQL schema in that database. |
| **GitHub workflow**                    | Connects existing repositories, creates a working branch per chat, and opens pull requests against a selected base branch. See [GitHub](/docs/github).                          | Provides a [one-way push to GitHub](https://help.figma.com/hc/en-us/articles/35463818346647-Push-from-Figma-Make-to-GitHub). Make creates the repository, pushes to its default branch, and does not support branch management or syncing GitHub edits back into Make.                                         |
| **Publishing**                         | Publishes to Vercel with preview and production deployments, custom domains, and framework-aware server runtimes. See [Deployments](/docs/deployments).                         | Can [publish functional prototypes and web apps](https://help.figma.com/hc/en-us/articles/31304586129559-Publish-update-or-unpublish-a-Figma-Make-file) to the live web, with audience controls that vary by plan.                                                                                             |
| **Design workflow**                    | Accepts prompts, screenshots, and [Figma designs](/docs/figma), then produces project code that can continue through Git and deployment workflows.                              | Starts from Figma's collaborative design context. A Make preview can be copied into Figma Design as layers, but its functional behavior is not transferred to those design layers.                                                                                                                             |
| **Security and compliance**            | Vercel documents SOC 2 Type 2, ISO 27001:2022, GDPR support, and PCI DSS attestations in its [security and compliance guide](https://vercel.com/docs/security/compliance). | Figma documents its SOC 2 Type II audit and organization-level security controls in [Privacy and security in organizations](https://help.figma.com/hc/en-us/articles/360040056294-Privacy-and-security-in-organizations).                                                                                      |

## Official sources reviewed

* v0: [Full-stack apps](/docs/full-stack-apps), [Figma import](/docs/figma), [GitHub](/docs/github), [Deployments](/docs/deployments), and [Vercel security and compliance](https://vercel.com/docs/security/compliance)
* Figma: [Functional prototypes and web apps](https://help.figma.com/hc/en-us/articles/31304485164695-Create-and-edit-a-functional-prototype-or-web-app), [Supabase backend](https://help.figma.com/hc/en-us/articles/32640822050199-Add-a-backend-to-a-functional-prototype-or-web-app), [GitHub push](https://help.figma.com/hc/en-us/articles/35463818346647-Push-from-Figma-Make-to-GitHub), [publishing](https://help.figma.com/hc/en-us/articles/31304586129559-Publish-update-or-unpublish-a-Figma-Make-file), and [security](https://help.figma.com/hc/en-us/articles/360040056294-Privacy-and-security-in-organizations)

## Ready to build?

<LearnMore href="https://v0.app" icon="arrow">
  Get started with v0
</LearnMore>


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)