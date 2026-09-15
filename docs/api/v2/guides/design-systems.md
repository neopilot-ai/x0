---
title: Design Systems
description: Learn how to use design system skills with the v0 API v2
product: v0 API
type: guide
related:
  - /docs/design-systems-2
  - /docs/api/v2/reference/chats/create-chat
  - /docs/api/v2/reference/messages/send-message
---

# Design Systems



Design systems work like other skills in the v0 API. You can mention one in a prompt and let the agent decide when it is relevant, or pass it in the `skills` field to make v0 load it for a request.

Design systems created with [Design Systems 2.0](/docs/design-systems-2) are saved as skills in your team or personal scope. They teach v0 about your components, props, tokens, setup, and starter app.

## Use a design system skill

Attach a saved design system when creating a chat so v0 can load its instructions and apply any starter setup before building the app:

```typescript
import { v0 } from 'v0'

const result = await v0.chats.create({
  message: 'Build an analytics dashboard with filters and charts.',
  skills: [
    {
      type: 'memory',
      scope: 'team',
      skillName: 'acme-ui',
    },
  ],
})

if (result.error) throw new Error(result.error.message)

console.log('Created chat:', result.data.chat.id)
```

Design Systems 2.0 saves design systems as `memory` skills. Most API integrations use team-scoped skills, so `scope: 'team'` is the usual choice. Replace `acme-ui` with the saved skill's slug and use an API key that can access the team.

`scope: 'user'` is also supported for a design system saved to a personal workspace, though this is less common for API integrations.

The same `skills` shape can be passed to `v0.messages.send()` when applying a design system skill to an existing chat.

## Update a design system skill

Ask v0 to update a saved design system skill in any chat. Pass the skill in `skills` so the agent loads the exact design system to edit, and include the new package version, updated GitHub sources, release notes, migration guide, and any breaking changes:

```typescript
import { v0 } from 'v0'

const result = await v0.messages.send({
  chatId: 'chat_abc123',
  message: `Update Acme UI to v2.3.

Release notes: https://acme.example.com/ui/releases/v2.3
Migration guide: https://acme.example.com/ui/migrate-to-v2.3
The Button component renamed its type prop to variant.`,
  skills: [
    {
      type: 'memory',
      scope: 'team',
      skillName: 'acme-ui',
    },
  ],
})

if (result.error) throw new Error(result.error.message)
```

v0 updates the saved skill and re-checks its starter app so the change does not introduce a regression. The API key must have permission to edit the skill in its team or personal scope.

Updating the skill does not change existing projects. To bring an existing project up to date, continue its chat with the updated skill and describe the migration you want v0 to make.

See [Keep a design system up to date](/docs/design-systems-2#keep-a-design-system-up-to-date) for the complete Design Systems 2.0 workflow.

## How skills work

Pass up to three skills when you [create a chat](/docs/api/v2/reference/chats/create-chat) or [send a message](/docs/api/v2/reference/messages/send-message). Passing a skill in `skills` loads it for that request instead of asking the agent to decide whether it is relevant.

Each entry identifies where v0 should find the skill:

| Type      | Shape                                  | Use                                                                           |
| --------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| `memory`  | `{ type: 'memory', scope, skillName }` | A skill saved in team or personal memory, including Design Systems 2.0 skills |
| `remote`  | `{ type: 'remote', id }`               | A public skill from [skills.sh](https://skills.sh)                            |
| `project` | `{ type: 'project', skillName }`       | A skill defined in the repository connected to the chat                       |

<Callout type="warn">
  Skills are not supported when authenticating with a Vercel OIDC project principal. Use a v0 API key scoped to the user or team that owns the skill.
</Callout>

If strict enforcement is not needed, omit `skills` and mention the design system in `message`. The agent can discover a matching skill in the current scope when relevant, but mentioning it does not force that skill to load.


---

For a semantic overview of all documentation, see [/docs/sitemap.md](/docs/sitemap.md)

For an index of all available documentation, see [/docs/llms.txt](/docs/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/docs/agents.md](/docs/agents.md)