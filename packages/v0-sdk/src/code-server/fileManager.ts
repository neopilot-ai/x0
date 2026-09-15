import type { CodeServerFile, FileExplorerEntry } from './types'

export async function createFile(
  session: { files: Map<string, CodeServerFile> },
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
  return file
}

export async function renameFile(
  session: { files: Map<string, CodeServerFile> },
  oldPath: string,
  newPath: string,
): Promise<CodeServerFile | null> {
  const file = session.files.get(oldPath)
  if (!file) return null
  session.files.delete(oldPath)
  const renamed = { ...file, path: newPath, name: newPath.split('/').pop() ?? newPath }
  session.files.set(newPath, renamed)
  return renamed
}

export async function deleteFile(
  session: { files: Map<string, CodeServerFile> },
  path: string,
): Promise<boolean> {
  return session.files.delete(path)
}

export async function createFolder(
  path: string,
): Promise<FileExplorerEntry> {
  return { name: path.split('/').pop() ?? path, path, type: 'folder', modified: new Date() }
}

export async function getFileExplorer(
  session: { files: Map<string, CodeServerFile> },
): Promise<FileExplorerEntry[]> {
  const entries: FileExplorerEntry[] = []
  for (const file of session.files.values()) {
    entries.push({
      name: file.name,
      path: file.path,
      type: 'file',
      language: file.language,
      size: file.size,
      modified: file.createdAt,
    })
  }
  return entries.sort((a, b) => a.path.localeCompare(b.path))
}
