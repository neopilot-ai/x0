---
title: Full-Stack Apps
description: Build full-stack apps with v0
product: v0
type: guide
prerequisites:
  - /docs/quickstart
related:
  - /docs/databases
  - /docs/external-apis
  - /docs/deployments
---

# Full-Stack Apps

v0 can transform prototypes into full-stack applications. In a new chat or existing generation, ask v0 to implement features that require data persistence, API calls, or backend logic.

v0 defaults to Next.js, which offers advantages like server actions and API routes for colocating frontend and backend code. While v0 can use other frameworks, Next.js provides the most reliable results.

When building full-stack applications, v0 can:

- Leverage [React Server Components](https://react.dev/reference/rsc/server-components) (RSCs) for improved performance and SEO
- Create backend endpoints using Next.js App Router conventions
- Connect to databases like [Supabase](https://supabase.com), [Neon](https://neon.com), and [Upstash](https://upstash.com) without ORMs by default

## Integrations

Leveraging the [Vercel marketplace](https://vercel.com/marketplace), v0 has access to integrations that add databases, queues, blob storage, AI models, and more through **Project menu** → **Settings** → **Integrations**. You can prompt v0 to add integrations, add them manually, or v0 can prompt you to create the resource when necessary.

### Supported integrations

- [**Databases**](/docs/databases): Supabase, Blob, Neon, Upstash.
- [**AI**](/docs/ai-models): Grok, fal, Deep Infra.

## Environment variables

In each project, you can configure secure environment variables that v0 will have access to. These can be used for external integrations with LLM providers and APIs.

Client-side environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in browser code.

## Incremental development workflow

When building full-stack applications, take an incremental approach.

### Start with UI

Create your component layout and design:

<PromptLink text="Create a modern task management dashboard with a sidebar, task list, and add task form" />

### Add data layer

Prompt v0 to add database schema and API routes, e.g. "Add a Supabase database with tables for tasks, users, and projects. Include API routes for managing tasks."

### Implement core features

Add authentication, CRUD operations, or real-time updates, e.g. "Add user authentication so users can only see and manage their own tasks."

### Enhance functionality

Build on existing features with detailed instructions, e.g. "Add the ability to edit and delete tasks, plus real-time updates when team members make changes."

### Optimize and polish

Add performance improvements and advanced features, e.g. "Add task filtering by status and due date, plus optimize with caching and image optimization."

### Best practices

- Duplicate existing generations to add logic instead of combining UI and logic in a single prompt
- Use popular, well-documented libraries in your prompts
- Provide detailed implementation instructions to avoid incorrect assumptions

Deploy full-stack apps to Vercel with one click — see [Deployments](/docs/deployments).

## Solutions

See how v0 can help with different use cases:

- [AI Website Builder](https://v0.app/solutions/ai-website-builder) - Turn prompts, screenshots, or Figma files into live websites
- [AI Code Generator](https://v0.app/solutions/ai-code-generator) - Generate production-ready full-stack apps from natural language prompts
- [AI UI Design Generator](https://v0.app/solutions/ai-ui-design-generator) - Generate production-ready UI from designs, screenshots, or prompts
