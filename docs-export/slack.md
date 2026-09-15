---
title: Slack
description: Add v0 to your Slack workspace so your whole team can contribute to production
product: v0
type: integration
related:
  - /docs/github
  - /docs/vercel-integration
---

# Slack

> The bot for Slack is currently in **beta**. If you encounter bugs while using this experimental feature, please report them to the v0 team using the in-app feedback button.

## Get started

1. Install the Slack app at [v0.app/slack/install](https://v0.app/slack/install).
2. Tag `@v0` in your team's Slack channel with a prompt.

The v0 bot for Slack lets anyone on your team contribute to production by mentioning `@v0` in a Slack channel. v0 reads the conversation thread for context, writes the code changes, creates a branch, and opens a pull request — all without leaving Slack.

With the bot for Slack, your team can:

- **Ask v0 to make changes** to any connected GitHub repository
- **Attach images and files** so v0 has additional visual or document context
- **Iterate in threads** — tag `@v0` again in a thread to continue the conversation on the same branch
- **Set a default repo per channel** so nobody has to specify a repo every time

## How it works

When you mention `@v0` in Slack:

1. v0 reacts with a 👀 emoji to acknowledge your message.
2. v0 posts a reply with a link to the v0 chat (for example, "On it.").
3. v0 reads the thread for context, makes the code changes, and creates a branch.
4. v0 opens a pull request with a summary and a link back to the Slack thread.
5. Vercel generates a **preview deployment** on every commit pushed to the branch, so your team can view and QA changes directly in the browser.

## Setup

### Install the Slack app

Visit [v0.app/slack/install](https://v0.app/slack/install) to add v0 to your Slack workspace. Depending on your workspace settings, you may need Slack admin permissions or workspace-level app approval to complete the installation.

### Link your Vercel account

The first time you mention `@v0` in Slack, it will prompt you to link your Vercel account. During this step you select which Vercel team to connect. This determines which repositories and projects v0 can access.

> Each Slack user links their own Vercel account independently. You need a v0 Premium, Plus, or Enterprise plan and access to the GitHub repos you want to work with.

## Usage

Mention `@v0` followed by your request in any channel where the bot is installed:

```
@v0 Add a dark mode toggle to the settings page
```

### Specifying a repository

Use a structured syntax to tell v0 exactly which repository to target:

```
@v0 [repo=acme/dashboard] Add a chart to the analytics page
```

To target a specific branch, include it in the same syntax. If no repo is specified, v0 uses the channel default if one is set, otherwise it asks which repo to use.
