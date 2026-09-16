---
title: Vercel Connect
description: Connect your v0 apps and agents to third-party services — no API keys required
product: v0
type: integration
related:
  - /docs/external-apis
  - /docs/databases
  - /docs/full-stack-apps
---

# Vercel Connect

> Vercel Connect in v0 is currently in **beta**. If you encounter bugs, please report them to the v0 team using the in-app feedback button.

v0-generated apps and agents can access third-party services – Slack, GitHub, Notion, Salesforce, and more – through [Vercel Connect](https://vercel.com/docs/connect). You authorize a service once in your browser, and your app receives short-lived, automatically refreshed tokens at runtime. There are no API keys to find, paste, rotate, or leak.

## Connect vs. environment variables

|                      | Environment variables           | Vercel Connect                                              |
| -------------------- | ------------------------------- | ----------------------------------------------------------- |
| **Credential**       | A static key pasted per project | OAuth tokens issued and refreshed for you                   |
| **Acts as**          | One shared key for everyone     | Each signed-in user, or a shared app identity               |
| **Receiving events** | You configure provider webhooks | Verified webhooks delivered to your app by Connect          |
| **Rotation**         | Manual                          | Automatic refresh; revoke anytime from the dashboard or API |

Keep [environment variables](/docs/external-apis) for configuration that isn't a service credential.

## What you can build

- **Apps that act as the signed-in user.** _"Build me a dashboard of my open GitHub pull requests."_ Each viewer authorizes GitHub themselves and sees their own data.
- **Agents that work your tools.** _"Build me a Slack agent that sends me a daily summary of my merged PRs."_ v0 connects Slack and GitHub, and the agent posts on schedule.
- **Bots that respond to events.** Connect delivers the service's webhooks (Slack mentions, messages, DMs) straight to your app. You never touch the provider's webhook settings.

## Setting up a connection

Describe what you want to build; v0 handles the wiring.

1. v0 proposes the services it needs and asks for your approval.
2. A setup card opens the authorization flow in your browser, where you sign in to the service.
3. When you finish, the chat resumes and v0 keeps building with the connection attached.

## Whose account does the app use?

v0 chooses between two authorization models based on what you asked for:

- **Your users' accounts** – each person authorizes the service themselves, and the app acts with their permissions.
- **A shared app account** – one credential the whole app acts through, as itself; this is how bots and scheduled agents run.

## Managing connections

Connections attached to a project are listed in **Project menu** → **Settings** → **Integrations**, with links out to each Connect client in the Vercel dashboard. From the Connect dashboard you can revoke access and review event delivery.

Tokens are encrypted and short-lived, and never appear in your code, environment variables, or chat.
