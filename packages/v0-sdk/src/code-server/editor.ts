import type { CodeServerConfig, CodeServerSession, CodeServerFile, CodeServerDiff } from './types'

export async function createCodeServer(config: CodeServerConfig): Promise<CodeServerSession> {
  const session: CodeServerSession = {
    id: `cs-${Date.now()}`,
    config,
    files: new Map(),
    isConnected: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return session
}

export async function openFile(
  session: CodeServerSession,
  path: string,
  content: string,
  language: string,
): Promise<CodeServerFile> {
  const file: CodeServerFile = {
    path,
    name: path.split('/').pop() ?? path,
    content,
    language,
    modified: false,
    createdAt: new Date(),
    size: content.length,
  }
  session.files.set(path, file)
  session.updatedAt = new Date()
  return file
}

export async function closeFile(session: CodeServerSession, path: string): Promise<void> {
  session.files.delete(path)
  session.updatedAt = new Date()
}

export async function applyDiff(
  session: CodeServerSession,
  diff: CodeServerDiff,
): Promise<CodeServerFile | null> {
  const file = session.files.get(diff.originalPath)
  if (!file) return null
  file.content = diff.newContent
  file.modified = true
  session.updatedAt = new Date()
  return file
}

export async function createDiff(
  originalPath: string,
  modifiedPath: string,
  oldContent: string,
  newContent: string,
): Promise<CodeServerDiff> {
  return {
    originalPath,
    modifiedPath,
    oldContent,
    newContent,
    hunks: computeDiffHunks(oldContent, newContent),
  }
}

function computeDiffHunks(oldContent: string, newContent: string): import('./types').DiffHunk[] {
  const oldLines = oldContent.split('\n')
  const newLines = newContent.split('\n')
  const hunks: import('./types').DiffHunk[] = []
  const lines: Array<{ type: 'add' | 'delete' | 'context'; content: string }> = []
  let oldStart = 1
  let newStart = 1
  let oldCount = 0
  let newCount = 0

  for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
    const oldLine = oldLines[i] ?? ''
    const newLine = newLines[i] ?? ''
    if (oldLine !== newLine) {
      if (oldLine) { lines.push({ type: 'delete', content: oldLine }); oldCount++ }
      if (newLine) { lines.push({ type: 'add', content: newLine }); newCount++ }
    } else {
      if (oldCount > 0 || newCount > 0) {
        hunks.push({ oldStart, oldLines: oldCount, newStart, newLines: newCount, lines: [...lines] })
        lines.length = 0
        oldCount = 0
        newCount = 0
      }
      lines.push({ type: 'context', content: oldLine })
      oldStart = i + 2
      newStart = i + 2
    }
  }
  if (oldCount > 0 || newCount > 0) {
    hunks.push({ oldStart, oldLines: oldCount, newStart, newLines: newCount, lines })
  }
  return hunks
}

export async function getFiles(session: CodeServerSession): Promise<CodeServerFile[]> {
  return Array.from(session.files.values())
}

export async function closeCodeServer(session: CodeServerSession): Promise<void> {
  session.isConnected = false
  session.files.clear()
  session.updatedAt = new Date()
}
