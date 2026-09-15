---
title: Teams
description: Collaborate with your team on projects with shared resources
product: v0
type: guide
related:
  - /docs/projects
  - /docs/enterprise
---

# Teams

v0 makes it easy for teams to collaborate on projects, share resources, and manage workflows in one place. Collaboration features like [team templates](#team-templates) are available on [Plus, Business, and Enterprise plans](/docs/pricing#plan-comparison).

## Setting up your team

### 1. Upgrade to a Plus plan

Go to [v0.app/pricing](https://v0.app/pricing) and select the Plus plan. During checkout you can either select an existing Vercel team to upgrade, or create a new team.

**Warning:** If you already have a Vercel Hobby team, any new team created will require a [Vercel Pro subscription](https://vercel.com/pricing) in addition to the selected v0 plan. This comes with an additional $20/mo cost that does not grant additional v0 capabilities.

Your v0 Plus plan will be linked to the corresponding Vercel team, where you can manage members and billing from your Vercel team settings.

### 2. Add team members

You can invite team members and provision v0 access in several ways:

- **After upgrade**: Click **Manage Members** in the confirmation modal.
- **From Vercel**: Invite new team members or allocate v0 access to existing members from [your team's Vercel member settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fmembers&title=Manage+Team+Members).
- **During v0 checkout**: Check **Grant access to all Team members** to assign a v0 seat to existing team members.

### 3. Invite team members to your chats

Once your team is set up, you can [share chats](#sharing-chats) with your team members.

## Features

### Team access

On **v0 Plus plans**, all team members have **Builder** access. This means every member can:

- Create and edit chats and projects
- Create deployments and manage environment variables
- Access shared team projects and templates

Note: Managing integrations requires the **Integrations Manager** permission, which is separate from v0 roles but can be assigned from the same **Manage v0 role** menu. Whether a member can inherently manage integrations without this depends on their [Vercel team role](https://vercel.com/docs/rbac/access-roles) (e.g., Members have this permission by default).

For advanced role-based access control (RBAC) with differentiated roles like v0 Builder, v0 Creator, and v0 Viewer, see [Enterprise](/docs/enterprise).

### Team Owner administrative access

Members with the Vercel **Owner** team role have administrative access to every chat owned by the team — including teammate chats set to **Only people with access** — when they navigate to the chat directly. Owners can view, edit, and archive those chats without being explicitly invited.

This is intended for administrative oversight:

- Owner access applies only on the team that owns the chat. Owners of other teams have no special access.
- Owners do not see teammate chats in the sidebar, library, or project pages; they only get access when they open a chat by URL.
- This is independent of the v0 Builder / Creator / Viewer roles, which control what a member can do but not whose chats they can administer.

### Sharing Chats

You can control who has access to your chats using the Invite dialog.

#### Visibility options

| Option | Description |
| --- | --- |
| Only people with access | Only you and invited users can access |
| Everyone at [team-name] | All members of your team can access; turn on **View only** to prevent edits |
| Anyone with the link | Anyone with the URL can access |
| Anyone on the web | Public, discoverable, and accessible by anyone |

#### Default chat visibility

New chats created in a team workspace are available to the team by default. Team Owners can change this default under **Settings → Workspace → Default Chat Visibility**:

| Default | Who can access a new chat |
| --- | --- |
| Private | Only people with access |
| Team can view | Team members can view; editing remains limited to people with access |
| Team can edit | Team members can view and edit |

Changing the workspace default affects only new chats. Existing chats keep their current visibility, and chat creators can override the default for an individual chat from its **Invite** dialog.

#### Inviting team members

1. Click **Invite** in the top-right corner
2. Search for team members by name or email
3. Choose permission level: **Can View** or **Can Edit**
4. Click **Invite**

### Team Templates

Team templates allow you to create and share reusable UI components and project starters within your organization. Unlike public templates, team templates are only visible to members of your team.

#### Creating Team Templates

You can publish a template under the Publish menu by selecting "Create Template". When you publish a template as a team member, you can choose to make it:

- **Public**: Visible to all v0 users
- **Team-only**: Restricted to your team members

Team templates are created from your projects and can include:

- Complete project starters
- Reusable UI components
- Design patterns and layouts
- Pre-configured settings and environment variables

#### Accessing Team Templates

Team members can access team templates in several places from the [team templates page](https://v0.app/templates/team). Team templates show up alongside your [personal templates](https://v0.app/templates/submissions) and help maintain consistency across team projects.

#### Benefits

- **Consistency**: Ensure all team members use approved design patterns
- **Efficiency**: Jumpstart new projects with pre-built components
- **Knowledge Sharing**: Distribute best practices across the team
- **Version Control**: Update templates and all team members get access to the latest version

### GitHub repository access

When a chat is connected to a GitHub repository, team members must have access to that repository on GitHub in order to collaborate on the chat and generate previews. This is the default behavior for all team plans (Plus, Business, and Enterprise).

If you'd prefer to allow team members to collaborate on chats without connecting GitHub to their Vercel accounts, you can enable **Allow v0 to Act on Behalf of Members** in your [workspace settings](https://v0.app/settings/workspace). When this setting is enabled, v0 can use the workspace's GitHub integration for eligible members who don't have a GitHub connection on their Vercel account, allowing them to access associated chats and generate previews.

**Warning:** If a member has GitHub connected to their Vercel account, v0 uses that connection and respects its repository permissions. v0 intentionally does not fall back to the workspace's GitHub integration when the connected account lacks access. Grant that GitHub account repository access, or have the member remove the GitHub connection from their Vercel account before using this setting.

### Collaboration

| Feature | Description | Availability |
| --- | --- | --- |
| Shared Chat History | Access conversation context across team | Plus, Business, and Enterprise |
| Version History | Track changes and revert when needed | Plus, Business, and Enterprise |
| Team Templates | Create and share reusable templates | Plus, Business, and Enterprise |
| Role-based Access | Assign Builder, Creator, or Viewer roles | Enterprise only |

### Enterprise

Enterprise plans include advanced features:

- **Role-based access control**: Assign v0 Builder, Creator, or Viewer roles to team members
- **Free Viewer seats**: Viewers don't count toward your paid seats
- **SAML SSO** for secure access
- **Audit logs** for compliance
- **Dedicated support** channels

See the [Enterprise documentation](/docs/enterprise) for more details.

### Credits

Each team member receives their own monthly credits:

- Each seat includes $30 in monthly credits
- Monthly credits are individual per user
- Track usage with team-wide analytics
- Monthly credits renew on your billing date -- unused credits roll over for one month

**Shared Credit Pool** (available on Plus, Business, and Enterprise plans) works differently:

- Shared Credit Pool credits are shared among all team members
- They are used after individual monthly credits are exhausted
- Shared Credit Pool credits expire one year after purchase

### Integration with Vercel

Plus plans integrate with Vercel for:

- Unified team management across platforms
- Seamless deployment from v0 to Vercel
- Shared environment variables and secrets
- Consistent access controls

## Best Practices

- **Standardize naming conventions**: Use consistent project naming, create folder structures for organization, and tag projects by department or purpose.
- **Create component libraries**: Document usage guidelines and maintain version control.
- **Build a team template library**: Create team templates for common UI patterns, project starters, and reusable components to ensure consistency and speed up development.
- **Establish workflows**: Define approval processes and set up review cycles.
- **Monitor usage**: Track credit consumption by project and identify high-usage patterns.

## Transferring chats and projects

You can transfer chats between any of your available scopes, either team or personal. When a chat has a linked Vercel project, the project is transferred along with it if you are an [Owner](https://vercel.com/docs/rbac/access-roles#owner-role) of the project's current team.

**Single chat**: Open the chat and select **Transfer Chat** from the chat header menu.

**Bulk transfer**: Go to [Settings → Workspace](https://v0.app/settings/workspace) and choose **Transfer Data** to transfer multiple chats at once.

[Video: Transfer chats](/docs/videos/transfer-chats.mp4)

## Team settings

To access team settings, first make sure you have the correct team selected in the navigation bar, then go to **Settings → Workspace**.

### Members

View and manage your [team members](https://v0.app/settings/members). On Plus plans, all members have the **Builder** role.

### Usage

As an Owner or member with the Billing role, track credit [usage](https://v0.app/settings/usage) across your team:

- View credit consumption over time, per member, and per message
- Track chats, messages, and active users by member or project
- Filter by billing cycle, the last 7/30/90 days, or a custom range
- Download usage reports or visualize them in a new v0 chat

[Learn more about the Usage & Activity dashboard](/docs/usage-dashboard)

### Integrations

Connect external services to your team workspace:

- **Figma**: Paste Figma links directly into v0
- **Snowflake**: Connect your Snowflake account for data access

### API Keys

Manage API keys for programmatic access to v0.
