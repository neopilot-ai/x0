---
title: Projects
description: Projects in v0 are one app shared between many chats
product: v0
type: guide
related:
  - /docs/teams
  - /docs/deployments
---

# Projects

Vercel Projects in v0 are one, cohesive app that many chats can contribute to. One Project shares deployment, hosting, domains, and environment variables for the chats connected to it.

## How chats connect to Projects

Each v0 chat is connected to a Project.

When creating a new chat for an existing Project, the chat will be connected to the selected Project.

If you create a new chat without a Project, a new Project will be created the first time you publish the chat.

## Viewing your Projects

View your Projects from the **Projects** tab from the v0 sidebar.

## Finding Projects and chats

Use the **command palette** (`Cmd+K` on Mac, `Ctrl+K` on Windows/Linux) to search across all your chats and Vercel Projects. Results update as you type and are grouped by workspace. Select a result to navigate directly to it.

For searching across files within the code editor, use `Shift+Cmd+F` / `Shift+Ctrl+F`. See [Code Editing](/docs/code-editing) for more editor shortcuts.

## Project settings

![Project Settings Video](https://v0.app/docs/videos/project-settings.mp4)

Each project has its own settings that apply to all chats within it. Access these by opening the settings menu from the chat or Project page.

### Vercel Project

This tab provides a high-level summary of your project. Here, you can see the connected Vercel project and control Production visibility settings.

### Integrations

Connect your project to third-party services to give your Project access to external data and functionality. Available integrations include databases like Upstash for Redis and Neon for Serverless Postgres, backend services like Supabase, and AI model providers. This allows v0 to interact with these services directly, for example, to query a database or use a specific AI model for a task.

### Environment variables

Securely store sensitive information like API keys, tokens, and other credentials. These variables are encrypted and made available to v0 within the project's scope, so you don't have to expose them directly in your prompts.

### GitHub

View the current GitHub repository connection, or create a new repository if one doesn't already exist.

### Template

Publish or update your chat as a Template for your team or the v0 community.

### Domains

Manage custom domains for your Production deployment.

## Multiple chats, same Project

You can connect multiple chats to the same Project. This is useful when working different parts of one Project, exploring different approaches to the same part of a Project, or working as a team.

When multiple chats share a Project, deploying from any of them updates the same production URL. The Project that a chat is linked to will be shown at the top of the chat.
