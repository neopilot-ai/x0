import { type GatewayModelId } from '@ai-sdk/gateway'

export enum Models {
  AnthropicClaudeOpus46 = 'anthropic/claude-opus-4.6',
  AnthropicClaudeSonnet46 = 'anthropic/claude-sonnet-4.6',
  OpenAIGPT53Codex = 'openai/gpt-5.3-codex',
  XaiGrok41Reasoning = 'xai/grok-4.1-fast-reasoning',
  KiloClaudeSonnet46 = 'kilo-anthropic/claude-sonnet-4.6',
  KiloOpenAIGPT5 = 'kilo-openai/gpt-5',
  KiloAutoFree = 'kilo-auto/free',
}

export const DEFAULT_MODEL = Models.AnthropicClaudeOpus46

export const SUPPORTED_MODELS: GatewayModelId[] = [
  Models.AnthropicClaudeOpus46,
  Models.AnthropicClaudeSonnet46,
  Models.OpenAIGPT53Codex,
  Models.XaiGrok41Reasoning,
  Models.KiloClaudeSonnet46,
  Models.KiloOpenAIGPT5,
  Models.KiloAutoFree,
]

export const MODEL_NAMES: Record<string, string> = {
  [Models.AnthropicClaudeOpus46]: 'Claude Opus 4.6',
  [Models.AnthropicClaudeSonnet46]: 'Claude Sonnet 4.6',
  [Models.OpenAIGPT53Codex]: 'GPT-5.3 Codex',
  [Models.XaiGrok41Reasoning]: 'Grok 4.1 Reasoning',
  [Models.KiloClaudeSonnet46]: 'Kilo Claude Sonnet 4.6',
  [Models.KiloOpenAIGPT5]: 'Kilo GPT-5',
  [Models.KiloAutoFree]: 'Kilo Auto Free',
}

export const TEST_PROMPTS = [
  'Generate a Next.js app that allows to list and search Pokemons',
  'Create a `golang` server that responds with "Hello World" to any request',
]
