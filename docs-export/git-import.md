---
title: Import from GitHub
description: Import an existing GitHub repository into v0 and work from an isolated branch
product: v0
type: guide
related:
  - /docs/github
  - /docs/vercel-integration
  - /docs/projects
---

# Import from GitHub

Import a GitHub repository to build against an existing codebase in v0. The import creates a chat with a full development environment; the first code change creates a working branch and preview deployment.

You can also create chats from a repo programmatically:

```typescript
const result = await v0.chats.createFromRepo({
  repo: {
    url: 'https://github.com/vercel/next.js',
    branch: 'main',
  },
})
```

Private repositories connected through Vercel are also supported.

## Before you import

You can import public repositories and private repositories you can access. The [Vercel GitHub App](https://github.com/apps/vercel) must have access to the repository.

> If a repository is missing from the list, grant the Vercel GitHub App access from your [GitHub App settings](https://github.com/settings/installations), then reopen the import dialog.

v0 also supports monorepos. During import, choose the root directory that contains the application you want to run.

## Import a repository

1. Start a new chat.
2. Open the **+** menu in the composer.
3. Select **Import from…** → **Import from GitHub**.
4. Paste a full GitHub repository URL, or select an account or organization and search by repository name.
5. Select **Import**.

## Configure the import

After selecting a repository, choose how it should connect to v0 and Vercel.

### Repository without a Vercel project

If the repository is not connected to a Vercel project, configure:

- **Team:** The Vercel scope that will own the project and chat.
- **Project Name:** The name of the new Vercel project.
- **Base Branch:** The branch the chat starts from and its pull requests target.
- **Root Directory:** The application directory v0 should install, run, and deploy. For a single-app repository, this is usually `./`.

v0 creates the Vercel project as part of the import.

### Repository with a Vercel project

If Vercel projects are already connected to the repository, select the team and project to use. You can also choose to create a new Vercel project.

Connecting an existing project gives the chat access to its configuration:

- Development environment variables for the v0 preview
- Connected integrations
- Framework and root-directory settings
- Preview and production deployments
- Custom domains

You still choose the base branch for the chat. The Vercel project's production branch remains responsible for production deployments.

## What v0 creates

The import does not make another copy of a repository you can write to. It creates:

1. A v0 chat connected to the selected Vercel project.
2. A Vercel Sandbox with the repository checked out at the selected base branch.
3. An isolated working branch when the chat first changes code.
4. A Vercel preview deployment after v0 pushes that working branch.

Generated code changes are committed and pushed automatically. v0 does not push them directly to the base branch.

## Development environment

Imported repositories run in [Vercel Sandbox](https://vercel.com/docs/vercel-sandbox), which provides:

- A full Node.js environment for the repository's development server
- Installation with the repository's package manager and lockfile
- Server-side code, API routes, background processes, and filesystem access
- A terminal and code editor connected to the same workspace

For monorepos, v0 installs and runs the selected root directory while retaining access to the rest of the repository when the application depends on shared workspace packages.

## Import the same repository again

Importing the same repository again creates another chat at the selected base branch. Its first code change creates a separate working branch. The import does not create another GitHub repository. You can connect the new chat to the same Vercel project for a separate stream of work, or select a different project during import.

## Troubleshooting

### v0 cannot access the repository

Check both your GitHub access and the Vercel GitHub App installation. For an organization repository, an organization owner may need to approve the app or authorize it for the repository.

### The wrong application starts in a monorepo

Re-import the repository and select the directory containing the intended application's `package.json`. If the repository is connected to a Vercel project, confirm its Root Directory in the Vercel project settings too.

### The preview is waiting for a code change

The selected base branch may already power production, so v0 waits to create a working-branch preview until the chat changes code. Send a prompt that edits the project and wait for the automatic push.
