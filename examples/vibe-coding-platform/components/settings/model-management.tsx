'use client'

import { useState, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import * as yaml from 'js-yaml'
import { Save, Download, Copy, AlertCircle, Check } from 'lucide-react'

export interface ModelProvider {
  name: string
  apiKey: string
  baseURL: string
  models: ModelEntry[]
}

export interface ModelEntry {
  id: string
  name: string
  provider: string
  maxTokens?: number
  supportsReasoning?: boolean
}

export interface ModelConfig {
  providers: ModelProvider[]
  defaultModel: string
}

export function ModelManagement() {
  const [activeTab, setActiveTab] = useState<'json' | 'yaml'>('json')
  const [configText, setConfigText] = useState<string>('')
  const [config, setConfig] = useState<ModelConfig>({ providers: [], defaultModel: '' })
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const handleImport = useCallback(
    (text: string) => {
      try {
        setError(null)
        let parsed: ModelConfig
        if (activeTab === 'yaml') {
          parsed = yaml.load(text) as ModelConfig
        } else {
          parsed = JSON.parse(text) as ModelConfig
        }
        if (!parsed.providers || !Array.isArray(parsed.providers)) {
          throw new Error('Invalid config: missing providers array')
        }
        setConfig(parsed)
        setSaved(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to parse config')
      }
    },
    [activeTab],
  )

  const handleExport = useCallback(() => {
    let text: string
    if (activeTab === 'yaml') {
      text = yaml.dump(config, { indent: 2, sortKeys: false })
    } else {
      text = JSON.stringify(config, null, 2)
    }
    setConfigText(text)
  }, [config, activeTab])

  const handleCopy = useCallback(() => {
    if (activeTab === 'yaml') {
      setConfigText(yaml.dump(config, { indent: 2, sortKeys: false }))
    } else {
      setConfigText(JSON.stringify(config, null, 2))
    }
    navigator.clipboard.writeText(configText)
  }, [config, activeTab, configText])

  const handleSave = useCallback(() => {
    try {
      const json = JSON.stringify(config)
      localStorage.setItem('model-config', json)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      setError('Failed to save config')
    }
  }, [config])

  const loadSaved = useCallback(() => {
    try {
      const saved = localStorage.getItem('model-config')
      if (saved) {
        const parsed = JSON.parse(saved) as ModelConfig
        setConfig(parsed)
      }
    } catch {
      // Ignore parse errors
    }
  }, [])

  const handleAddProvider = useCallback(() => {
    setConfig((prev) => ({
      ...prev,
      providers: [...prev.providers, { name: 'New Provider', apiKey: '', baseURL: '', models: [] }],
    }))
  }, [])

  const handleUpdateProvider = useCallback(
    (index: number, field: keyof ModelProvider, value: string) => {
      setConfig((prev) => ({
        ...prev,
        providers: prev.providers.map((p, i) => (i === index ? { ...p, [field]: value } : p)),
      }))
    },
    [],
  )

  const handleUpdateModel = useCallback(
    (providerIndex: number, modelIndex: number, field: keyof ModelEntry, value: string) => {
      setConfig((prev) => ({
        ...prev,
        providers: prev.providers.map((p, i) =>
          i === providerIndex
            ? {
                ...p,
                models: p.models.map((m, j) => (j === modelIndex ? { ...m, [field]: value } : m)),
              }
            : p,
        ),
      }))
    },
    [],
  )

  const handleAddModel = useCallback((providerIndex: number) => {
    setConfig((prev) => ({
      ...prev,
      providers: prev.providers.map((p, i) =>
        i === providerIndex
          ? { ...p, models: [...p.models, { id: '', name: '', provider: p.name }] }
          : p,
      ),
    }))
  }, [])

  const handleRemoveProvider = useCallback((index: number) => {
    setConfig((prev) => ({
      ...prev,
      providers: prev.providers.filter((_, i) => i !== index),
    }))
  }, [])

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">AI Model Configuration</CardTitle>
        <CardDescription>Manage AI model providers with YAML or JSON configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleAddProvider}>
            + Add Provider
          </Button>
          <Button variant="outline" size="sm" onClick={loadSaved}>
            Load Saved
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="w-3.5 h-3.5 mr-1" /> Save
          </Button>
          {saved && (
            <span className="text-xs text-green-500 flex items-center gap-1">
              <Check className="w-3 h-3" /> Saved
            </span>
          )}
        </div>

        <Separator />

        <div className="flex gap-2">
          {config.providers.map((provider, index) => (
            <div key={index} className="border border-border rounded-lg p-3 flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <input
                  className="bg-transparent border-b border-border text-foreground font-semibold text-sm outline-none focus:border-primary px-1 py-0.5"
                  value={provider.name}
                  onChange={(e) => handleUpdateProvider(index, 'name', e.target.value)}
                />
                <button
                  className="text-muted-foreground hover:text-red-500 text-xs"
                  onClick={() => handleRemoveProvider(index)}
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                  placeholder="API Key"
                  type="password"
                  value={provider.apiKey}
                  onChange={(e) => handleUpdateProvider(index, 'apiKey', e.target.value)}
                />
                <input
                  className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground outline-none focus:border-primary"
                  placeholder="Base URL"
                  value={provider.baseURL}
                  onChange={(e) => handleUpdateProvider(index, 'baseURL', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                {provider.models.map((model, modelIndex) => (
                  <div key={modelIndex} className="flex gap-2 items-center">
                    <input
                      className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground outline-none focus:border-primary flex-1"
                      placeholder="Model ID"
                      value={model.id}
                      onChange={(e) => handleUpdateModel(index, modelIndex, 'id', e.target.value)}
                    />
                    <input
                      className="bg-background border border-border rounded px-2 py-1 text-xs text-foreground outline-none focus:border-primary flex-1"
                      placeholder="Model Name"
                      value={model.name}
                      onChange={(e) => handleUpdateModel(index, modelIndex, 'name', e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <button
                className="text-xs text-primary hover:underline"
                onClick={() => handleAddModel(index)}
              >
                + Add Model
              </button>
            </div>
          ))}
        </div>

        <Separator />

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'json' | 'yaml')}>
          <TabsList className="bg-background border border-border">
            <TabsTrigger value="json" className="data-[state=active]:bg-card">
              JSON
            </TabsTrigger>
            <TabsTrigger value="yaml" className="data-[state=active]:bg-card">
              YAML
            </TabsTrigger>
          </TabsList>
          <TabsContent value="json" className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Configuration JSON</Label>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={handleExport}>
                  <Download className="w-3 h-3 mr-1" /> Export
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="w-3 h-3 mr-1" /> Copy
                </Button>
              </div>
            </div>
            <Textarea
              className="font-mono text-xs bg-background border-border min-h-[200px]"
              value={configText || JSON.stringify(config, null, 2)}
              onChange={(e) => {
                setConfigText(e.target.value)
                handleImport(e.target.value)
              }}
              spellCheck={false}
            />
          </TabsContent>
          <TabsContent value="yaml" className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">Configuration YAML</Label>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={handleExport}>
                  <Download className="w-3 h-3 mr-1" /> Export
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="w-3 h-3 mr-1" /> Copy
                </Button>
              </div>
            </div>
            <Textarea
              className="font-mono text-xs bg-background border-border min-h-[200px]"
              value={configText || yaml.dump(config, { indent: 2, sortKeys: false })}
              onChange={(e) => {
                setConfigText(e.target.value)
                handleImport(e.target.value)
              }}
              spellCheck={false}
            />
          </TabsContent>
        </Tabs>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-500">
            <AlertCircle className="w-3 h-3" /> {error}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Providers supported: OpenRouter, Kilo Gateway, Vercel AI Gateway, OpenAI, Anthropic
        </p>
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={config.providers.length === 0}
        >
          <Save className="w-3 h-3 mr-1" /> Apply Configuration
        </Button>
      </CardFooter>
    </Card>
  )
}
