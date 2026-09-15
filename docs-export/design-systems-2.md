---
title: Design Systems
description: Design systems (v2)
product: v0
type: guide
---

# Design Systems

Create and manage design systems for consistent UI across your projects. Design systems created with Design Systems 2.0 are saved as `memory` skills in your team or personal scope.

## Creating a Design System

Define reusable components, colors, typography, and spacing. Design systems are saved as skills that v0 can load when generating code.

```typescript
import { v0 } from 'v0'

const result = await v0.skills.create({
  name: 'acme-ui',
  description: 'ACME UI design system',
  content: {
    components: {
      Button: {
        props: {
          variant: { type: 'string', enum: ['primary', 'secondary'] },
          size: { type: 'string', enum: ['sm', 'md', 'lg'] },
        },
      },
    },
    tokens: {
      colors: {
        primary: '#0066cc',
        secondary: '#6666cc',
      },
    },
  },
  scope: 'team',
})
```

## Applying a Design System

v0 applies your design system when generating code, ensuring visual consistency across all generated components. Pass the skill slug in the `skills` field when creating a chat or sending a message.

```typescript
import { v0 } from 'v0'

const result = await v0.chats.create({
  message: 'Build a dashboard',
  skills: [
    { type: 'memory', name: 'acme-ui' },
  ],
})
```

### Skills Field

The `skills` field accepts up to 3 skills. Each skill can be:

- **`skills.sh`** — Remote skills from skills.sh
- **`memory`** — User/team memory skills (including design-system skills)
- **`project`** — Skills defined in the chat repo

```typescript
const result = await v0.chats.create({
  message: 'Build a dashboard',
  skills: [
    { type: 'memory', name: 'acme-ui', scope: 'team' },
  ],
})
```

## Update a Design System Skill

Ask v0 to update a saved design system skill in any chat. Pass the skill in `skills` so the agent loads the exact design system to edit.

```typescript
const result = await v0.messages.send({
  chatId: 'chat_abc123',
  message: 'Update the Button component to use the new variant',
  skills: [
    { type: 'memory', name: 'acme-ui' },
  ],
})
```

## How Skills Work

Pass up to three skills when you [create a chat](/docs/api/v2/reference/chats/create-chat) or [send a message](/docs/api/v2/reference/messages/send-message). Passing a skill in `skills` loads it for that request instead of asking the agent to decide whether it is relevant.

## Keep a Design System Up to Date

Design Systems 2.0 saves design systems as `memory` skills. Most API integrations use team-scoped skills, so `scope: 'team'` is the usual choice. Replace `acme-ui` with the saved skill's slug and use an API key that can access the team.

`scope: 'user'` is also supported for a design system saved to a personal workspace, though this is less common for API integrations.

The same `skills` shape can be passed to `v0.messages.send()` when applying a design system skill to an existing chat.

## Strict Enforcement

If strict enforcement is not needed, omit `skills` and mention the design system in `message`. The agent can discover a matching skill in the current scope when relevant, but mentioning it does not force that skill to load.

## See Also

- [Keep a design system up to date](/docs/design-systems-2#keep-a-design-system-up-to-date)
- [Skills parameter](/docs/api/v2/reference/messages/send-message)
