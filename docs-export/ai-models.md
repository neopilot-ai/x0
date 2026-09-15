---
title: AI Models
description: Add AI functionality to your v0 projects by integrating AI models and platforms
product: v0
type: integration
related:
  - /docs/external-apis
  - /docs/databases
---

# AI Models

v0 can build AI functionality into your projects by integrating with AI platforms or by using API keys for specific providers. By default, v0 uses the [Vercel AI Gateway](https://vercel.com/ai-gateway) to connect to various AI models.

## Using the Vercel AI Gateway

To use the Vercel AI Gateway, no additional setup is required. v0 is pre-configured to connect to the gateway and access supported AI models.

## Marketplace integrations

v0 integrates with AI platforms like [fal](https://fal.ai/) and [Deep Infra](https://deepinfra.com/). You can also connect directly to [Grok by xAI](https://x.ai/grok).

From **Project menu** `...` → **Settings** → **Integrations**, you'll see supported providers. Click **Install** to open the Marketplace and accept click-through terms to activate an integration.

![AI Models](/docs/light/ai-models.png)

## APIs

To integrate with third-party AI models such as [OpenAI](https://openai.com/), you can add the necessary environment variables (e.g. `OPEN_AI_API_KEY`) from **Project menu** `...` → **Settings** → **Environment Variables**.

v0 will now use this variable when prompted to generate AI functionality.
