---
title: Usage & Activity
description: Track your credit consumption and activity, or review usage across your team
product: v0
type: guide
related:
  - /docs/pricing
  - /docs/teams
  - /docs/account
---

# Usage & Activity

The **Usage & Activity** dashboard at [v0.app/settings/usage](https://v0.app/settings/usage) shows credit consumption and activity for your personal account or team. On eligible team plans, Owners and members with the Billing role can also review team-wide data.

## What you see on the page

| Account type and role                                               | What the page shows                                                                |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Team **Owner** or **Billing** role on Plus, Business, or Enterprise | Team-wide and personal activity, plus team-wide consumption on the **Credits** tab |
| Any other member of an eligible team                                | Only their own activity and consumption                                            |
| Personal Free or Premium account                                    | Personal activity and credit consumption                                           |
| An unsupported plan or billing model                                | The legacy usage view or a message explaining usage data isn't available           |

Credit-based accounts have **Credits** and **Activity** tabs. When credit data isn't available, the page shows **Activity** only.

## Selecting a date range

Presets:

- **This billing cycle** (default, credit-billed teams only)
- **Last 7 days**
- **Last 30 days**
- **Last 90 days**

Use the calendar icon to pick a custom start and end date, then click **Apply**. Ranges can reach back up to 365 days.

## Credits tab

Reports credits actually debited, split by source:

- **Monthly Credits** — the per-seat monthly allotment. Spent first, rolls over for one month.
- **Shared Pool Credits** — the team-wide purchased pool. Covers overflow once monthly credits run out, expires one year after purchase.

### Consumption chart

A stacked bar per day (monthly credits plus shared pool credits in blue). Hover a bar to see the breakdown for that day.

### Team credit usage

Owners and members with the Billing role see every member's **Monthly Credits** and **Shared Pool Credits** for the selected range, with sortable columns and team totals.

### Per-message drill-down

Click any row to see that member's individual charges: date, billed event (linking to the message when you have access), kind (Monthly / Shared Pool / both), model, and cost. Charges waived as auto-fixes are struck through and tagged **FREE**.

## Activity tab

Reports how v0 is being used rather than credits spent. Available even when the Credits tab is not.

### Team activity

Owners and members with the Billing role can group by **Users** or **Projects**. Summary cards cover active users, total chats, and total messages for the range. Per-member tables show chats, messages, active days, and first/last activity.

### Your activity

Personal accounts and members without team-wide access see their own **Active days**, **Total chats**, and **Total messages**, grouped by **Projects** or **Chats**. Chats without a Vercel project are combined under **Draft chats**.

## Exporting and visualizing

- **Download Table** exports the current credit or activity table as CSV.
- **Visualize with v0** opens a new chat with the table's data attached so you can generate charts and reports.
- **Download All Transactions** exports every credit transaction in the range.

## Enterprise trials

Credit consumption isn't logged during an Enterprise trial, so credit usage stays empty until the trial converts. Chat activity remains available in the Activity tab throughout the trial.
