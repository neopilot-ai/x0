import { V0SandboxPreview as V0SandboxPreviewBase } from './sandbox'
import { V0CodeEditor, type FileEntry } from './code-editor'
import { V0Terminal } from './terminal'

export function V0SandboxPreview({
  chatId,
  className,
  style,
}: {
  chatId: string
  className?: string
  style?: React.CSSProperties
}) {
  return <V0SandboxPreviewBase chatId={chatId} className={className} style={style} />
}

export function V0ConsolePanel({
  activeTab = 'logs',
}: {
  activeTab?: 'logs' | 'terminal'
}) {
  return (
    <div className="v0-console-panel">
      <div className="v0-console-panel__tabs">
        <button className={activeTab === 'logs' ? 'active' : ''}>Logs</button>
        <button className={activeTab === 'terminal' ? 'active' : ''}>Terminal</button>
      </div>
      <div className="v0-console-panel__content">
        {activeTab === 'logs' ? <LogsPanel /> : <V0Terminal />}
      </div>
    </div>
  )
}

function LogsPanel() {
  return <div className="v0-logs-panel">Logs content</div>
}

export function V0CodeEditorTab({
  files,
  activeFile,
}: {
  files: FileEntry[]
  activeFile: string | null
}) {
  return (
    <div className="v0-code-editor-tab">
      <V0CodeEditor files={files} activeFile={activeFile} />
    </div>
  )
}

export { V0Terminal, V0CodeEditor }
