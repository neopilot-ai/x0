---
title: Sharing
description: Share your v0 chat with others to collaborate on generating components
product: v0
type: guide
related:
  - /docs/templates
---

# Sharing

## How to share a chat

To share your chat, click **Invite** in the top-right of the chat header. This opens the **Invite** dialog. From here, you can configure who has access to this chat.

## Sharing options

When you decide to share your chat, you are presented with several options to control who has access.

If you are on a Plus, Business, or Enterprise plan, you can invite individual team members to view or interact with the chat. Additionally, you can set the visibility for the whole chat.

- **Private / Only people with access**: Personal chats show **Private**, while team chats show **Only people with access**. Personal chats are limited to you; team chats are limited to you and individually invited members.
- **Everyone at [team-name]**: Everyone in your Vercel team who has v0 access can access the chat. Turn on **View only** to prevent team members from editing it.
- **Anyone with the link**: Anyone with the URL can access the chat. It will not be indexed by search engines.
- **Anyone on the web**: Anyone can view the chat. It may be indexed by search engines and appear in public galleries.

### Default visibility for new team chats

New chats created in a team workspace use that workspace's default chat visibility. Unless a team Owner changes the setting, new team chats are available to everyone in the team and team members can edit them.

Team Owners can choose **Private**, **Team can view**, or **Team can edit** under **Settings → General → Default Chat Visibility**. Changing the workspace default affects only new chats; existing chats keep their current visibility.

Chat creators can change an individual chat's visibility at any time from the **Invite** dialog. An individual chat's setting takes precedence over the workspace default.

## Access permissions

When inviting individual team members, you can configure the level of access each person has.

- **Can View**: Users with this permission can see the entire chat history but cannot make any changes.
- **Can Edit**: Users with this permission can manage and participate in the chat. They can send and edit prompts, as well as rename the chat, change visibility and sharing settings, and archive or delete it.

### Team Owner access

If your chat is created on a team, anyone with the Vercel **Owner** team role can open the chat by URL and edit or archive it — even if you didn't invite them and the chat is set to **Only people with access**. This is intended for administrative oversight (audits, debugging, takeover for departed teammates).

Notes:

- Team Owner access only applies when the Owner is on the team that owns the chat.
- Teammates without the Owner role still need to be invited (or rely on team visibility) to view or edit a chat set to **Only people with access**.
- Team Owner access is not surfaced in listings — Owners only see teammate chats they navigate to directly.

### Recommended collaboration workflow

While direct edit access is available for close collaboration, we recommend a workflow that encourages individual exploration and preserves the integrity of the original chat.

1. **Invite with "Can View" permissions**: Start by inviting collaborators with "Can View" access. This allows them to see the full prompt history and generated components without making direct changes.
2. **Collaborators Duplicate the Chat**: Your collaborators can then "Duplicate" the chat. This creates their own copy in the team account with the option to keep it linked to the original Vercel project.
3. **Iterate Independently**: In their duplicated version, they can experiment freely without affecting the original chat.

This "View and Duplicate" workflow prevents a "too many cooks in the kitchen" scenario and empowers team members to build upon your work in a non-destructive way.
