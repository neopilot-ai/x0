---
title: Snowflake
description: Connect v0 to Snowflake to build apps and dashboards with your warehouse data
product: v0
type: integration
related:
  - /docs/databases
  - /docs/deployments
  - /docs/MCP
---

# Snowflake

> The Snowflake integration is currently in **beta**. A team owner must configure a Snowflake account for your v0 team before members can connect.

The Snowflake integration lets you build data apps with the data your Snowflake role can access. After you connect Snowflake, v0 can inspect schemas, query tables, generate dashboards or reports, preview connected apps, and deploy apps to Snowflake.

## Step 1: Prepare your Snowflake account

Before your team can connect v0 or deploy apps to Snowflake, a Snowflake account admin must enable the Snowflake App Runtime and grant the Vercel integration access to the roles that will use it.

### Enable App Runtime

1. In Snowsight, select your name in the lower-left corner, then **Settings**.
2. Under **Account**, select **Apps**.
3. If the page shows **App development is not set up**, click **Begin Setup** and complete the setup flow.

See [Snowflake App Runtime account admin setup](https://docs.snowflake.com/en/developer-guide/snowflake-app-runtime/account-admin-setup) for full details.

### Grant roles access to the Vercel integration

Only Snowflake users with one of the permitted roles will be able to connect. On the **Apps** page:

1. Click the **Integrations** tab.
2. Find the **Vercel** card. If it shows **Not created yet**, click **Setup**.
3. In the **Setup Vercel** dialog, select the roles that should have access.
4. Click **Setup**.

Use **Edit Roles** to change access or **Disable** to remove the integration.

## Step 2: Add Snowflake to your v0 team

Team owners add the Snowflake account identifiers that members are allowed to connect:

1. Open your v0 team settings.
2. Go to **Integrations**.
3. Find **Snowflake**.
4. Click **Add Account**.
5. Enter the account identifier portion of your Snowflake URL — for example, `myorg-account123` from `https://myorg-account123.snowflakecomputing.com`. Do not include `https://` or `.snowflakecomputing.com`.

> Adding an account identifier does not sign in any team member or grant data access. Members whose Snowflake user does not have a permitted role cannot connect.

## Step 3: Connect your Snowflake user

After a team owner configures an account, team members connect their own Snowflake user via OAuth. Each member connects independently.

> Snowflake access is role-based (RBAC), not user-based. Data access is determined entirely by the selected role. Only roles permitted in Step 1 appear in the OAuth flow.

## Features

Once connected:

- Work with Python and SQL to analyze data and create visualizations
- Use tools like Matplotlib, Pandas, and more
- Inspect schemas and query tables directly from v0
- Create dashboards for visualizations
- Generate code for data analysis and reporting
- Deploy data apps to Snowflake
