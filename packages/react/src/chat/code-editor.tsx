export interface FileEntry {
  name: string
  path: string
  type: 'file' | 'folder'
  language?: string
}

export function V0CodeEditor({
  files,
  activeFile,
  theme = 'dark',
}: {
  files: FileEntry[]
  activeFile: string | null
  theme?: 'light' | 'dark'
}) {
  return (
    <div className={`v0-code-editor v0-code-editor--${theme}`}>
      <div className="v0-code-editor__toolbar">
        <button>Toggle Diff View</button>
        <button>Split Layout</button>
        <button>Copy File</button>
      </div>
      <div className="v0-code-editor__body">
        <div className="v0-code-editor__file-explorer">
          {files.map((file) => (
            <div key={file.path} className="v0-code-editor__file-entry">
              {file.name}
            </div>
          ))}
        </div>
        <div className="v0-code-editor__editor">
          {activeFile && <pre className="v0-code-editor__code" />}
        </div>
      </div>
    </div>
  )
}

export function V0DiffView({
  originalContent,
  modifiedContent,
}: {
  originalContent: string
  modifiedContent: string
}) {
  const hunks = computeDiff(originalContent, modifiedContent)
  return (
    <div className="v0-diff-view">
      {hunks.map((hunk, i) => (
        <div key={i} className="v0-diff-view__hunk">
          {hunk.lines.map((line, j) => (
            <div key={j} className={`v0-diff-view__line v0-diff-view__line--${line.type}`}>
              {line.content}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export function V0SplitView({
  leftFile,
  rightFile,
}: {
  leftFile: { name: string; content: string }
  rightFile: { name: string; content: string }
}) {
  return (
    <div className="v0-split-view">
      <div className="v0-split-view__panel">{leftFile.name}</div>
      <div className="v0-split-view__panel">{rightFile.name}</div>
    </div>
  )
}

export function V0FileExplorer({
  files,
  onSelect,
}: {
  files: FileEntry[]
  onSelect: (path: string) => void
}) {
  return (
    <div className="v0-file-explorer">
      {files.map((file) => (
        <div
          key={file.path}
          className="v0-file-explorer__entry"
          onClick={() => onSelect(file.path)}
        >
          {file.name}
        </div>
      ))}
    </div>
  )
}

function computeDiff(
  original: string,
  modified: string,
): Array<{ lines: Array<{ type: string; content: string }> }> {
  const oldLines = original.split('\n')
  const newLines = modified.split('\n')
  const result: Array<{ lines: Array<{ type: string; content: string }> }> = []
  const lines: Array<{ type: string; content: string }> = []
  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    const oldLine = oldLines[i] ?? ''
    const newLine = newLines[i] ?? ''
    if (oldLine !== newLine) {
      if (oldLine) lines.push({ type: 'delete', content: oldLine })
      if (newLine) lines.push({ type: 'add', content: newLine })
    } else {
      if (lines.length > 0) {
        result.push({ lines: [...lines] })
        lines.length = 0
      }
      lines.push({ type: 'context', content: oldLine })
    }
  }
  if (lines.length > 0) result.push({ lines: [...lines] })
  return result
}
