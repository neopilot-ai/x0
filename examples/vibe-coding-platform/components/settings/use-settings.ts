import { parseAsBoolean, parseAsStringLiteral, useQueryState } from 'nuqs'
import { DEFAULT_MODEL, SUPPORTED_MODELS } from '@/ai/constants'
import { useState, useEffect } from 'react'

export function useSettings() {
  const { modelId } = useModelId()
  const [fixErrors] = useFixErrors()
  const [reasoningEffort] = useReasoningEffort()
  return { modelId, fixErrors, reasoningEffort }
}

export function useModelId() {
  const [modelId, setModelId] = useQueryState(
    'modelId',
    parseAsStringLiteral(SUPPORTED_MODELS.map((model) => model)).withDefault(
      DEFAULT_MODEL
    )
  )
  const [customModels, setCustomModels] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('model-config')
      if (saved) {
        const config = JSON.parse(saved)
        const models = config.providers?.flatMap((p: any) => p.models?.map((m: any) => m.id)) || []
        setCustomModels(models)
      }
    } catch {
      // Ignore
    }
  }, [])

  return { modelId, setModelId, customModels }
}

export function useReasoningEffort() {
  return useQueryState(
    'effort',
    parseAsStringLiteral(['medium', 'low']).withDefault('low')
  )
}

export function useFixErrors() {
  return useQueryState('fix-errors', parseAsBoolean.withDefault(true))
}
