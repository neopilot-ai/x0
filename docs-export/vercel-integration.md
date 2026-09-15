---
title: Vercel Integration
description: How v0 and Vercel work in tandem
product: v0
type: integration
related:
  - /docs/deployments
  - /docs/github
  - /docs/custom-domains
---

# Vercel Integration

Vercel is a cloud platform that makes it easy to build, deploy, and scale modern web applications. Vercel enables you to deploy your v0 applications with a single click.

## How do v0 and Vercel accounts differ?

They're one and the same — v0 accounts are just Vercel accounts. Both share the concept of accounts and teams, and manage projects (and chats in v0's case) within the teams you are a member of.

Where v0 differs is that you can also create chats and projects in your account rather than only within teams. This is your Personal scope, which has access to either the v0 Free or v0 Premium plans.

Most of your account details can be managed from your [Vercel account settings](https://vercel.com/account/settings) (e.g. account email). Settings within v0 pertain almost exclusively to v0, with the exception of some, such as billing items (payment methods and invoices are shared with Vercel) and your default team setting, which is linked to its respective Vercel setting.

## What is a Vercel Project, and how does v0 connect to it?

[Projects](/docs/projects) on Vercel represent applications that you have deployed to the Vercel platform. The first time you deploy a v0 chat, a corresponding Vercel Project is automatically created.

v0 integrates with Vercel Projects in several ways:

- **Publishing:** Select **Publish** in v0 to create a Vercel project when needed and update its production deployment. For GitHub-backed projects, publishing merges the chat's pull request into its base branch before Vercel builds production.
- **Environment Variables:** Environment variables are inherited from the connected Vercel project. When connecting an integration from v0, its necessary environment variables are automatically added to the Vercel project and shared with v0, so your app can use live integrations while building and testing in v0, not just after deployment.
  - The v0 preview window can only access variables from the Development environment. As such, sensitive environment variables are inaccessible to v0 previews.
- **GitHub Integration:** v0 and your Vercel project share the same GitHub repository connection, if one exists. See [how v0's GitHub connection works](/docs/github) for more details.
- **Domains:** Custom domains available to assign to your v0 application are inherited from your Vercel Project and team.

## Do I need Vercel Pro to use v0?

No, Vercel Pro does not provide any additional v0 features. However, it does provide additional Vercel role options to your team members, giving greater control of deployed v0 projects through the Vercel project dashboard.

Be aware of [Vercel limits](https://vercel.com/docs/limits) that may impact your v0 use, such as project and deployment limits. For example, a team on the Vercel Hobby plan is limited to a maximum of 200 projects.

To cancel your Vercel Pro plan, downgrade from your team's Vercel billing settings. Be aware that downgrading from Pro to Hobby will **kick all other members from the team**, regardless of their v0 access. After downgrading, they can be re-invited back as Viewers with the v0 Builder role.

## Managing v0 access and roles via your Vercel team

### v0 Plus and Business plans

- The only v0 role you can assign is v0 Builder, which provides full v0 functionality.
- The Vercel roles you can assign depend on your Vercel plan. For example, on v0 Plus with a Vercel Hobby plan, you have one Owner, and every other member may only be a Viewer with the v0 Builder role.

### v0 Enterprise plans

- You can assign three v0 roles: v0 Builder, v0 Creator, and v0 Viewer, managed from your team's Vercel member settings or v0 member settings.
- The Vercel roles available are still determined by your Vercel plan.
