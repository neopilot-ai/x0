import { createGatewayProvider } from '@ai-sdk/gateway'
import { createOpenAI } from '@ai-sdk/openai'
import { Models } from './constants'
import type { JSONValue } from 'ai'
import type { OpenAIResponsesProviderOptions } from '@ai-sdk/openai'
import type { LanguageModelV3 } from '@ai-sdk/provider'

const gateway = createGatewayProvider({
  baseURL: process.env.AI_GATEWAY_BASE_URL,
  headers: {
    'http-referer': 'https://oss-vibe-coding-platform.vercel.app/',
    'x-title': 'Vibe Coding Platform',
  },
})

const kiloGateway = process.env.KILO_API_KEY && process.env.KILO_GATEWAY_BASE_URL
  ? createOpenAI({
      baseURL: process.env.KILO_GATEWAY_BASE_URL,
      apiKey: process.env.KILO_API_KEY,
    })
  : null

export function getKiloModel(modelId: string): LanguageModelV3 | null {
  if (!kiloGateway) return null
  return kiloGateway.chat(modelId)
}

export interface ModelOptions {
  model: LanguageModelV3
  providerOptions?: Record<string, Record<string, JSONValue>>
  headers?: Record<string, string>
}

export function getModelOptions(
  modelId: string,
  options?: { reasoningEffort?: 'low' | 'medium' | 'high' }
): ModelOptions {
  if (modelId.startsWith('kilo-') && kiloGateway) {
    return {
      model: kiloGateway.chat(modelId.replace('kilo-', '')),
    }
  }

  if (modelId === Models.OpenAIGPT53Codex) {
    return {
      model: gateway(modelId),
      providerOptions: {
        openai: {
          include: ['reasoning.encrypted_content'],
          reasoningEffort: options?.reasoningEffort ?? 'low',
          reasoningSummary: 'auto',
          serviceTier: 'priority',
        } satisfies OpenAIResponsesProviderOptions,
      },
    }
  }

  if (
    modelId === Models.AnthropicClaudeSonnet46 ||
    modelId === Models.AnthropicClaudeOpus46
  ) {
    return {
      model: gateway(modelId),
      headers: { 'anthropic-beta': 'fine-grained-tool-streaming-2025-05-14' },
      providerOptions: {
        anthropic: {
          cacheControl: { type: 'ephemeral' },
        },
      },
    }
  }

  return {
    model: gateway(modelId),
  }
}
