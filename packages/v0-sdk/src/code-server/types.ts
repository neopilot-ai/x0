export interface CodeServerConfig {
  sandboxId: string
  workingDirectory?: string
  theme?: 'light' | 'dark'
  fontSize?: number
  fontFamily?: string
  tabSize?: number
  wordWrap?: boolean
  minimap?: boolean
  lineNumbers?: boolean
  bracketPairColorization?: boolean
  autoClosingBrackets?: boolean
  formatOnSave?: boolean
  readonly?: boolean
}

export interface CodeServerSession {
  id: string
  config: CodeServerConfig
  files: Map<string, CodeServerFile>
  isConnected: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CodeServerFile {
  path: string
  name: string
  content: string
  language: string
  modified: boolean
  createdAt: Date
  size: number
}

export interface CodeServerDiff {
  originalPath: string
  modifiedPath: string
  oldContent: string
  newContent: string
  hunks: DiffHunk[]
}

export interface DiffHunk {
  oldStart: number
  oldLines: number
  newStart: number
  newLines: number
  lines: DiffLine[]
}

export interface DiffLine {
  type: 'add' | 'delete' | 'context'
  content: string
  oldLineNumber?: number
  newLineNumber?: number
}

export interface SplitViewConfig {
  leftPath: string
  rightPath: string
  direction: 'horizontal' | 'vertical'
  showDiff: boolean
}

export interface FileExplorerEntry {
  name: string
  path: string
  type: 'file' | 'folder'
  language?: string
  size?: number
  modified: Date
}

export interface TerminalCommand {
  id: string
  command: string
  output: string
  exitCode: number | null
  timestamp: Date
  permissionMode: PermissionMode
}

export type PermissionMode = 'ask' | 'auto' | 'full'

export interface PermissionRule {
  pattern: string
  type: 'allow' | 'deny' | 'ask'
  scope: 'user' | 'team'
  createdAt: Date
}
