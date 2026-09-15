'use client'

import { useSettings } from '@/lib/hooks/useSettings'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

export default function SettingsDialog() {
  const { settings, updateSettings } = useSettings()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-sm">Settings</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Configure your v0 model and generation options.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm">Model</span>
            <select
              value={settings.model}
              onChange={(e) => updateSettings({ model: e.target.value as any })}
              className="col-span-3 rounded-md border border-input bg-background px-3 py-1.5 text-sm"
            >
              <option value="v0-1.5-sm">v0-1.5-sm</option>
              <option value="v0-1.5-md">v0-1.5-md</option>
              <option value="v0-1.5-lg">v0-1.5-lg</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm">Images</span>
            <Switch
              checked={settings.imageGenerations}
              onCheckedChange={(v) => updateSettings({ imageGenerations: v })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm">Thinking</span>
            <Switch
              checked={settings.thinking}
              onCheckedChange={(v) => updateSettings({ thinking: v })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {}}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
