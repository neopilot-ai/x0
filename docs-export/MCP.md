---
title: MCP Integrations
description: Connect external MCP servers and Vercel Marketplace integrations to v0
product: v0
type: guide
---

# MCP Integrations

MCP stands for Model Context Protocol. It allows v0 to connect to external servers that provide tools and capabilities for enhanced interactions.

v0 offers MCP in two ways:

- **Bring-your-own MCP Servers**: You can set up your own MCP server by configuring it or choosing from a preset. This allows you to host your own MCP server or use one provided by a third party.
- **MCP from Marketplace Integrations**: v0 supports tool calls from integrations installed via the Vercel Marketplace. This allows you to connect services like databases, APIs, and other platforms directly to your v0 chats with no additional setup.

## Bring-your-own MCP Servers

Open the **+** menu in the prompt form and select **MCPs** to use your own MCP server.

From the MCP menu, you can configure a custom MCP server or select from a preset. Some presets include:

- **Contentful**: for managing structured content
- **Context7**: for searching documentation and knowledge bases
- **Glean**: for querying internal company data
- **Granola**: for AI meeting notes and transcription
- **Hex**: for data analysis and visualization
- **Linear**: for project management and issue tracking
- **Notion**: for accessing and managing Notion databases and pages
- **PostHog**: for product analytics and feature flags
- **Sanity**: for content management and retrieval
- **Sentry**: for error tracking and monitoring
- **Zapier**: for connecting to thousands of apps and automating workflows

### Configuring an MCP Server

If you decide to not use a preset, you can manually configure your MCP server. v0 supports four kinds of authentication:

- **No Auth**: for public MCP servers that do not require authentication
- **Custom Headers**: for MCP servers that require an API key or other custom network headers for access
- **Bearer Token**: for MCP servers that use bearer token authentication
- **OAuth**: for MCP servers that support OAuth 2.0 for authentication

### Using the MCP in your generation

Currently, MCP servers only provide tools for v0 to use during generation. When you start a new chat or continue an existing one, v0 will automatically consider the connected MCP servers and their tools when generating responses. The generation v0 creates cannot use the MCP tools directly. However, you can pair the MCP with other features like Environment Variables for v0 to use in its generations.

## MCP from Marketplace Integrations

v0 supports tool calls from Vercel Marketplace Integrations, allowing you to connect services from the Vercel Marketplace directly to your v0 chats. These integrations provide v0 with specialized tools and capabilities to interact with external services like databases, APIs, and other platforms.

With Native Integrations, v0 can:

- Query and manage your databases (e.g., Neon, Supabase, Upstash)
- Ask questions about your products and revenue (Stripe)
- Interact with cloud services and APIs
- Access project-specific resources and data
- Execute operations across your integrated services
- Provide context-aware assistance for your connected tools

## Getting Started

**Important**: Enabling remote MCP for an integration may increase per-message costs and can give v0 access to tools that read or change external data. Review the integration's capabilities and configure your global Agent Permissions before making its tools available.

### Connecting Integrations

1. **Open Integrations** — Open **Project menu** → **Settings** → **Integrations**
2. **Install an Integration** — Select an integration from the marketplace, follow the authentication and setup flow, and grant necessary permissions
3. **Configure Integration Settings** — After connecting, click on the integration to manage its settings and configure MCP tool availability

## Availability and approval

MCP tool availability and tool-call approval are separate controls:

1. The integration's **Remote MCP** setting determines whether its tools are available to v0.
2. The chat's global **Ask**, **Auto**, or **Full** permission mode and any Agent Permissions rules determine whether an available tool call runs, asks for confirmation, or is blocked.

Disabling an integration takes precedence because its MCP tools are not added to the agent. No global permission mode can call a tool that is unavailable.

### Integration availability

Native integrations display three Remote MCP settings:

| Setting | Current behavior |
| --- | --- |
| Disabled | The integration stays installed, but its MCP server is inactive and its tools are not made available to v0. |
| Ask for Approval (Manual) | The MCP server is active and its tools are available. This is the default setting for new integrations. |
| Always Run (Auto) | The MCP server is active and its tools are available. |

Manual and Auto are enabled states. In the current runtime, those labels do not override the chat's global permission mode or its Agent Permissions rules.

For a custom MCP server, its enabled or disabled state serves the same availability role.

### Global tool approval

After an MCP tool is available, the global mode applies:

| Global mode | MCP tool behavior |
| --- | --- |
| Ask | Calls matched by an `allow` rule run, calls matched by a `deny` rule are blocked, and calls marked `ask` or not matched by a rule require confirmation. |
| Auto | `allow`, `ask`, and `deny` rules still apply. Unmatched calls generally run automatically; the runtime can request confirmation for tool names its risk check classifies as potentially destructive. |
| Full | Tool approval evaluation is skipped, so MCP calls run without checking user or team `allow`, `ask`, and `deny` rules. |

There is no separate five-second cancellation window after an MCP call. A potentially destructive operation is also not guaranteed to require approval: an `allow` rule or Full mode can let it run without confirmation.

## Managing Integrations

### Configuration Dialog

To manage an integration's settings:

1. Open **Project menu** → **Settings** → **Integrations**
2. Click on a connected integration
3. The **Manage Integration** dialog shows:
   - **Integration Details**: Name, description, and category
   - **Instance Information**: Connected resource name and ID
   - **Documentation Link**: Direct link to Marketplace listing
   - **Remote MCP Toggle**: Configure tool availability
   - **Configure Button**: Access integration-specific settings

### Changing availability

To change an integration's Remote MCP setting:

1. Open the Manage Integration dialog
2. Locate the **Remote MCP** section
3. Select your preferred mode:
   - Click the **X** icon for Disabled
   - Click the **hand** icon for Ask for Approval
   - Click the **checkmark** icon for Always Run
4. Changes take effect immediately

### Disconnecting Integrations

To remove an integration:

1. Open the Manage Integration dialog
2. Click **Configure** to access integration settings
3. Follow the integration's disconnect flow on Vercel
4. The integration will be removed from the project's Integrations settings

## Integration Scoping

Many marketplace MCPs operate globally, but v0 scopes them to specific projects and resources:

- **Project-Specific**: Integrations are linked to your v0 project
- **Resource-Specific**: Database integrations target specific database instances
- **Context-Aware**: v0 automatically provides resource context to ensure commands target the correct service

When v0 uses an integration, it includes context like:

- Resource ID (e.g., specific database instance)
- Integration instance name
- Project associations

This ensures all operations are scoped correctly and prevents accidental cross-project operations.

## Examples

### Database Integration

After connecting a Neon database integration:

```
User: "Show me the schema for my users table"

v0: [Uses neon_query tool to inspect schema]
    "Your users table has these columns:
    - id (uuid, primary key)
    - email (varchar)
    - created_at (timestamp)
    - updated_at (timestamp)"
```

## Related Resources

- Vercel Marketplace - Browse available integrations
- v0 MCP Server - Use v0 as an MCP server in your IDE
