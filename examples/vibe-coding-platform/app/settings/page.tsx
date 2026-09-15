import { ModelManagement } from '@/components/settings/model-management'

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-foreground mb-4">Settings</h1>
      <ModelManagement />
    </div>
  )
}
