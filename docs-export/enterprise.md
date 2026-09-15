---
title: Enterprise
description: Manage v0 seats, access, SSO, and privacy in your Vercel Enterprise account
product: v0
type: guide
related:
  - /docs/teams
  - /docs/security
  - /docs/account
---

# Enterprise

## Managing seats and access

To manage v0 seats and grant access in your Vercel account:

1. Log in to your [v0 account](https://v0.app).
2. Select your team from the scope selector on the top-left corner.
3. Click on the scope selector again and select **Manage Members**. This navigates you to your Vercel team's members page.

You can grant v0 access to team members by clicking the three dots to the right of their role and selecting **Manage v0 role**.

### Assign or revoke access

- To assign access: Find the team member in the list and assign the desired v0 role.
- To revoke access: Find the team member in the list and choose "No v0 access".

### Choosing the right role

v0 has a role and access control system that is separate from your team roles in Vercel:

- **v0 Builder**: v0 Creator access + can create deployments and manage environment variables on any Vercel project connected to v0.
- **v0 Creator**: Can create chats + projects, add sources, and build in v0.
- **v0 Viewer**: View-only access to collaborate on chats with other users.

> The v0 Builder role is **team-wide**: a Builder can create deployments and manage environment variables on **every** Vercel project in the team connected to v0. Assign v0 Builder only to users who should be able to act on all v0-connected projects.

Note: Managing integrations requires the **Integrations Manager** permission, a separate team-level permission. Members with the Vercel **Member** role inherently have this permission.

For Vercel team management:

- **Viewer**: Assign the Viewer role with v0 access for most users.
- **Owner**: Use the Owner role only for admins who need full control.

## Activating your account

To use v0 with your Enterprise plan, make sure you're logged into the correct Vercel account before accepting the invite:

1. Accept the invite.
2. Switch to your Enterprise team on the v0 navigation bar.

## Configuring single sign-on (SSO)

Once v0 is enabled for your team, **admins** can manage access using [Directory Sync](https://vercel.com/docs/directory-sync) and [Access Groups](https://vercel.com/docs/rbac/access-groups) to provision v0 roles from your identity provider (IdP).

1. Create an **Access Group** with a v0 role from your team's Access Group settings.
2. Map a **Directory Sync** group (e.g. from Okta SCIM) to the Access Group you created.
3. Everyone in the synced group automatically receives the configured v0 access.

You can assign **Team roles**, **Team permissions**, **Project roles**, and **v0 roles** in the same **Access Group** so that a single **IdP group** grants both team and v0 permissions.

## Privacy settings

### Chats

Members can control chat visibility using **Only people with access**, **Everyone at [team-name]**, **Anyone with the link**, or **Anyone on the web**.

Owners on v0 Enterprise teams can disable the **Anyone with the link** and **Anyone on the web** options using the **Restrict Chat Sharing** setting in workspace settings.

- **Only people with access**: Only the chat owner and individually invited team members can access the chat.
- **Everyone at [team-name]**: Makes the chat available to the entire team. Turn on **View only** to prevent editing.
- **Anyone with the link**: Anyone with the URL can access the chat. It will not be indexed by search engines.
- **Anyone on the web**: Anyone can view the chat. It may be indexed by search engines and appear in public galleries.

> Members with the Vercel **Owner** team role can view, edit, and archive every chat owned by the team, including teammate chats set to **Only people with access**, when they navigate to the chat directly.

Learn more about [v0's enterprise security features](/docs/security#enterprise-security-features).
