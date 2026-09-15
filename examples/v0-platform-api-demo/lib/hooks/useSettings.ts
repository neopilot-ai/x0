import { useState, useEffect } from 'react'

export type ModelType = 'v0-1.5-sm' | 'v0-1.5-md' | 'v0-1.5-lg'

export interface Settings {
  model: ModelType
  imageGenerations: boolean
  thinking: boolean
}

const DEFAULT_SETTINGS: Settings = { model: 'v0-1.5-md', imageGenerations: false, thinking: false }

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('v0-settings')
      if (saved) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) })
    } catch (error) {
      console.warn('Failed to load settings:', error)
    }
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    try {
      localStorage.setItem('v0-settings', JSON.stringify(updated))
    } catch (error) {
      console.warn('Failed to save settings:', error)
    }
  }

  return { settings, updateSettings }
}
