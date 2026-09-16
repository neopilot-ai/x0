'use client'

import type { Files } from '@v0-sdk/react'
import { useFiles, useUpdateChatFiles } from '@v0-sdk/react/swr'
import { use, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent } from 'react'
import { Loader } from '@/components/ai-elements/loader'
import { DiffView } from '@/components/chat/diff-view'
import { FileExplorer, type ChatFile } from '@/components/chat/file-explorer'
import { HighlightedEditor } from '@/components/chat/highlighted-editor'
import type { EditorReveal } from '@/components/chat/highlighted-editor'
import { Button } from '@/components/ui/button'
import { CopyIcon, FileIcon, SearchIcon, SpinnerIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

export type ChatFilesResult = { files: Files['files'] } | { error: string }

type SearchMode = 'file' | 'global' | null

type MatchRange = { start: number; end: number }

export function CodeEditorLoading() {
  return (
    <div className="flex h-full items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader size={16} /> Loading files…
    </div>
  )
}

export function CodeEditorPane({
  chatId,
  filesPromise,
  isPreviewReady,
}: {
  chatId: string
  filesPromise: Promise<ChatFilesResult>
  isPreviewReady: boolean
}) {
  const result = use(filesPromise)
  if ('error' in result) {
    return (
      <div className="flex h-full items-center justify-center px-6 text-sm text-destructive">
        {result.error}
      </div>
    )
  }
  return <CodeEditor chatId={chatId} files={result.files} isPreviewReady={isPreviewReady} />
}

function findMatches(content: string, query: string): MatchRange[] {
  if (!query) return []
  const matches: MatchRange[] = []
  let from = 0
  for (;;) {
    const index = content.indexOf(query, from)
    if (index === -1) break
    matches.push({ start: index, end: index + query.length })
    from = index + query.length
  }
  return matches
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function matchesPatterns(path: string, patterns: string) {
  const parts = patterns
    .split(/[;,\n]/)
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length === 0) return true
  const regexes = parts.map(
    (part) => new RegExp(`^(?:${part.split('*').map(escapeRegex).join('.*')})$`),
  )
  return regexes.some((regex) => regex.test(path))
}

function CodeEditor({
  chatId,
  files: initialFiles,
  isPreviewReady,
}: {
  chatId: string
  files: ChatFile[]
  isPreviewReady: boolean
}) {
  const filesUrl = `/api/chats/${encodeURIComponent(chatId)}/files`
  const filesQuery = useFiles(filesUrl, {
    fallbackData: { files: initialFiles },
    revalidateOnMount: false,
  })
  const updateFiles = useUpdateChatFiles(filesUrl)
  const cachedFiles = filesQuery.data?.files ?? initialFiles
  const [files, setFiles] = useState(cachedFiles)
  const [savedFiles, setSavedFiles] = useState(cachedFiles)
  const [pendingFolders, setPendingFolders] = useState<string[]>([])
  const [selectedPath, setSelectedPath] = useState(
    cachedFiles.find((file) => file.encoding === 'utf8')?.path ?? cachedFiles[0]?.path ?? null,
  )
  const [secondaryPath, setSecondaryPath] = useState<string | null>(null)
  const [explorerVisible, setExplorerVisible] = useState(true)
  const [splitView, setSplitView] = useState(false)
  const [diffView, setDiffView] = useState(false)
  const [searchMode, setSearchMode] = useState<SearchMode>(null)
  const [query, setQuery] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const [fileMatchIndex, setFileMatchIndex] = useState(0)
  const [globalInclude, setGlobalInclude] = useState('')
  const [globalExclude, setGlobalExclude] = useState('')
  const [globalReveal, setGlobalReveal] = useState<EditorReveal | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const isSaving = updateFiles.isMutating

  const selectedFile = files.find((file) => file.path === selectedPath)
  const secondaryFile = files.find((file) => file.path === (secondaryPath ?? selectedPath))

  const changedPaths = useMemo(() => {
    const set = new Set<string>()
    for (const file of files) {
      if (file.encoding !== 'utf8') continue
      const saved = savedFiles.find((item) => item.path === file.path)
      if (saved?.content !== file.content) set.add(file.path)
    }
    return set
  }, [files, savedFiles])

  const changedCount = changedPaths.size
  const activeFile = (searchMode === 'file' ? selectedFile : null) ?? files[0]

  const fileMatches = useMemo(
    () => findMatches(activeFile?.content ?? '', query),
    [activeFile, query],
  )
  const clampedIndex = fileMatches.length ? fileMatchIndex % fileMatches.length : 0
  const fileReveal: EditorReveal | null = useMemo(() => {
    if (searchMode !== 'file' || !fileMatches[clampedIndex]) return null
    return fileMatches[clampedIndex]
  }, [searchMode, fileMatches, clampedIndex])

  const globalResults = useMemo(() => {
    if (!query) return []
    const results: { path: string; line: number; preview: string }[] = []
    for (const file of files) {
      if (file.encoding !== 'utf8') continue
      if (!matchesPatterns(file.path, globalInclude)) continue
      if (!matchesPatterns(file.path, globalExclude)) continue
      const lines = file.content.split('\n')
      const line = lines.findIndex((value) => value.includes(query))
      if (line === -1) continue
      results.push({ path: file.path, line: line + 1, preview: lines[line].trim() })
    }
    return results
  }, [files, query, globalInclude, globalExclude])

  useEffect(() => {
    if (!searchMode) return
    searchRef.current?.focus()
  }, [searchMode])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey
      if (!modifier) return
      if (event.key.toLowerCase() === 's') {
        event.preventDefault()
        void save()
      }
      if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        setSearchMode(event.shiftKey ? 'global' : 'file')
        setQuery('')
        setFileMatchIndex(0)
      }
      if (event.key.toLowerCase() === 'b') {
        event.preventDefault()
        setExplorerVisible((visible) => !visible)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const updateFile = (path: string, content: string) => {
    setStatus(null)
    setFiles((current) => current.map((file) => (file.path === path ? { ...file, content } : file)))
  }

  async function save() {
    if (changedCount === 0 || !isPreviewReady || isSaving) return
    setStatus(null)
    try {
      await updateFiles.trigger({
        files: [...changedPaths].map((path) => {
          const file = files.find((item) => item.path === path)!
          return { path: file.path, content: file.content }
        }),
      })
      setSavedFiles(files)
      setStatus('Saved')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Failed to save files.')
    }
  }

  const reset = () => {
    setFiles(savedFiles)
    setStatus('Reset')
  }

  const normalizeFolder = (path: string) =>
    path.split('/').filter(Boolean).join('/').replace(/\/+/g, '/')

  const createFile = (inFolder: string | null) => {
    const base = inFolder ? `${inFolder}/` : ''
    const path = window.prompt('New file path', `${base}untitled.tsx`)?.trim()
    if (!path || files.some((file) => file.path === path)) return
    const file = { path, encoding: 'utf8', content: '' } as ChatFile
    setFiles((current) => [...current, file])
    setSelectedPath(path)
    setStatus('New file — save to persist')
  }

  const createFolder = (inFolder: string | null) => {
    const base = inFolder ? `${inFolder}/` : ''
    const name = window.prompt('New folder name', `${base}src/components`)?.trim()
    const path = normalizeFolder(name ?? '')
    if (!path || files.some((file) => file.path.startsWith(`${path}/`))) {
      if (path) setStatus('Folder already exists')
      return
    }
    setPendingFolders((current) => (current.includes(path) ? current : [...current, path]))
    setStatus('New folder — save files inside to persist')
  }

  const renameFile = (path: string) => {
    const next = window.prompt('Rename file', path)?.trim()
    if (!next || next === path || files.some((file) => file.path === next)) return
    setFiles((current) =>
      current.map((file) => (file.path === path ? { ...file, path: next } : file)),
    )
    if (selectedPath === path) setSelectedPath(next)
    setStatus('Renamed locally — save to persist')
  }

  const deleteFile = (path: string) => {
    if (!window.confirm(`Delete ${path}?`)) return
    const next = files.filter((file) => file.path !== path)
    setFiles(next)
    if (selectedPath === path) setSelectedPath(next[0]?.path ?? null)
    setStatus('Deleted locally — save to persist')
  }

  const deleteFolder = (path: string) => {
    const affected = files.filter((file) => file.path === path || file.path.startsWith(`${path}/`))
    if (affected.length === 0 && !pendingFolders.includes(path)) return
    if (
      !window.confirm(
        affected.length
          ? `Delete folder "${path}" and its ${affected.length} file${affected.length === 1 ? '' : 's'}?`
          : `Delete empty folder "${path}"?`,
      )
    ) {
      return
    }
    const removed = new Set(affected.map((file) => file.path))
    const next = files.filter((file) => !removed.has(file.path))
    setFiles(next)
    setPendingFolders((current) => current.filter((folder) => folder !== path))
    if (selectedPath && removed.has(selectedPath)) setSelectedPath(next[0]?.path ?? null)
    setStatus('Deleted folder locally — save to persist')
  }

  const copyFile = async () => {
    if (!selectedFile) return
    try {
      await navigator.clipboard.writeText(selectedFile.content)
      setStatus('Copied')
    } catch {
      setStatus('Clipboard unavailable')
    }
  }

  const openGlobalResult = (path: string) => {
    const file = files.find((item) => item.path === path)
    if (!file) return
    const index = file.content.indexOf(query)
    setSelectedPath(path)
    setGlobalReveal(index === -1 ? null : { start: index, end: index + query.length })
  }

  const selectFile = (path: string) => {
    setSelectedPath(path)
    setFileMatchIndex(0)
  }

  const replaceCurrentMatch = () => {
    const match = fileMatches[clampedIndex]
    if (!activeFile || !match) return
    const content = activeFile.content
    updateFile(
      activeFile.path,
      `${content.slice(0, match.start)}${replaceText}${content.slice(match.end)}`,
    )
    setFileMatchIndex(0)
  }

  const replaceAllMatches = () => {
    if (!activeFile || !fileMatches.length) return
    updateFile(activeFile.path, activeFile.content.replaceAll(query, replaceText))
    setFileMatchIndex(0)
  }

  const stepMatch = (direction: 1 | -1) => {
    if (!fileMatches.length) return
    setFileMatchIndex((index) => (index + direction + fileMatches.length) % fileMatches.length)
  }

  const renderEditor = (file: ChatFile | undefined, pane: 'primary' | 'secondary') => {
    if (!file)
      return (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Select a file
        </div>
      )
    if (file.encoding !== 'utf8')
      return (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
          Binary files cannot be edited.
        </div>
      )
    if (diffView && pane === 'primary') {
      const saved = savedFiles.find((item) => item.path === file.path)
      return <DiffView original={saved?.content ?? ''} modified={file.content} />
    }
    return (
      <HighlightedEditor
        disabled={isSaving}
        onChange={(content) => updateFile(file.path, content)}
        path={file.path}
        reveal={
          pane === 'primary' && searchMode === 'file'
            ? fileReveal
            : pane === 'primary'
              ? globalReveal
              : null
        }
        value={file.content}
      />
    )
  }

  if (files.length === 0)
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No files yet.
      </div>
    )

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex min-h-10 flex-wrap items-center gap-1 border-b border-border px-2 py-1">
        <Button
          aria-label="Toggle file explorer"
          onClick={() => setExplorerVisible((visible) => !visible)}
          size="icon-xs"
          title="Toggle explorer (⌘B)"
          variant="ghost"
        >
          <FileIcon />
        </Button>
        <Button
          aria-label="Find in file"
          onClick={() => {
            setSearchMode('file')
            setQuery('')
            setFileMatchIndex(0)
          }}
          size="icon-xs"
          title="Find in file (⌘F)"
          variant="ghost"
        >
          <SearchIcon />
        </Button>
        <Button
          aria-label="Global search"
          onClick={() => {
            setSearchMode('global')
            setQuery('')
          }}
          size="icon-xs"
          title="Global search (⇧⌘F)"
          variant="ghost"
        >
          <SearchIcon />
        </Button>
        <Button
          onClick={() => setDiffView((visible) => !visible)}
          size="xs"
          title="Toggle diff view"
          variant={diffView ? 'secondary' : 'ghost'}
        >
          Diff
        </Button>
        <Button
          onClick={() => setSplitView((visible) => !visible)}
          size="xs"
          title="Toggle split layout"
          variant={splitView ? 'secondary' : 'ghost'}
        >
          Split
        </Button>
        <span className="flex-1" />
        {changedCount > 0 ? <span className="text-xs text-amber-600">Unsaved Changes</span> : null}
        {status ? (
          <span
            className={cn(
              'text-xs',
              status === 'Saved' || status === 'Copied'
                ? 'text-muted-foreground'
                : 'text-amber-600',
            )}
          >
            {status}
          </span>
        ) : null}
        <Button
          aria-label="Copy file"
          disabled={!selectedFile}
          onClick={() => void copyFile()}
          size="icon-xs"
          title="Copy file"
          variant="ghost"
        >
          <CopyIcon />
        </Button>
        <Button disabled={changedCount === 0} onClick={reset} size="xs" variant="ghost">
          Reset
        </Button>
        <Button
          disabled={changedCount === 0 || isSaving || !isPreviewReady}
          onClick={() => void save()}
          size="xs"
          title={isPreviewReady ? 'Save changes' : 'Preview is still loading'}
        >
          {isSaving ? <SpinnerIcon className="animate-spin" /> : null}
          {isSaving ? 'Saving' : 'Save'}
        </Button>
      </div>

      {searchMode === 'file' ? (
        <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-3 py-1.5">
          <SearchIcon className="size-3.5 shrink-0" />
          <input
            aria-label="Find in current file"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none"
            onChange={(event) => {
              setQuery(event.target.value)
              setFileMatchIndex(0)
            }}
            onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Escape') setSearchMode(null)
              if (event.key === 'Enter') stepMatch(event.shiftKey ? -1 : 1)
            }}
            placeholder="Find in current file…"
            ref={searchRef}
            value={query}
          />
          <span className="shrink-0 text-xs text-muted-foreground">
            {fileMatches.length ? `${clampedIndex + 1}/${fileMatches.length}` : 'No matches'}
          </span>
          <Button
            disabled={!fileMatches.length}
            onClick={() => stepMatch(-1)}
            size="xs"
            variant="ghost"
          >
            ↑
          </Button>
          <Button
            disabled={!fileMatches.length}
            onClick={() => stepMatch(1)}
            size="xs"
            variant="ghost"
          >
            ↓
          </Button>
          <div className="flex items-center gap-1 border-l border-border pl-2">
            <input
              aria-label="Replace with"
              className="w-32 bg-transparent text-xs outline-none"
              onChange={(event) => setReplaceText(event.target.value)}
              onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter' && !event.shiftKey) replaceCurrentMatch()
              }}
              placeholder="Replace with…"
              value={replaceText}
            />
            <Button
              disabled={!fileMatches.length}
              onClick={replaceCurrentMatch}
              size="xs"
              variant="ghost"
            >
              Replace
            </Button>
            <Button
              disabled={!fileMatches.length}
              onClick={replaceAllMatches}
              size="xs"
              variant="ghost"
            >
              All
            </Button>
          </div>
          <Button
            aria-label="Close search"
            onClick={() => setSearchMode(null)}
            size="icon-xs"
            variant="ghost"
          >
            ×
          </Button>
        </div>
      ) : null}

      {searchMode === 'global' ? (
        <div className="flex max-h-56 flex-col border-b border-border bg-muted/30">
          <div className="flex flex-wrap items-center gap-2 px-3 py-1.5">
            <SearchIcon className="size-3.5 shrink-0" />
            <input
              aria-label="Search all files"
              className="min-w-0 flex-1 bg-transparent text-xs outline-none"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event: ReactKeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Escape') setSearchMode(null)
              }}
              placeholder="Search all files…"
              ref={searchRef}
              value={query}
            />
            <input
              aria-label="Files to include"
              className="w-36 bg-background px-2 py-1 text-xs outline-none ring-1 ring-border"
              onChange={(event) => setGlobalInclude(event.target.value)}
              placeholder="Files to include"
              value={globalInclude}
            />
            <input
              aria-label="Files to exclude"
              className="w-36 bg-background px-2 py-1 text-xs outline-none ring-1 ring-border"
              onChange={(event) => setGlobalExclude(event.target.value)}
              placeholder="Files to exclude"
              value={globalExclude}
            />
            <Button
              aria-label="Close search"
              onClick={() => setSearchMode(null)}
              size="icon-xs"
              variant="ghost"
            >
              ×
            </Button>
          </div>
          <div className="max-h-40 overflow-y-auto border-t border-border">
            {globalResults.length === 0 ? (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                {query ? 'No results' : 'Type to search across all files'}
              </p>
            ) : (
              globalResults.map((result) => (
                <button
                  className="flex w-full items-center gap-2 px-3 py-1 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
                  key={result.path}
                  onClick={() => openGlobalResult(result.path)}
                  type="button"
                >
                  <span className="shrink-0 font-mono text-[11px] text-foreground">
                    {result.path}:{result.line}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{result.preview}</span>
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}

      <div className="flex min-h-0 flex-1">
        {explorerVisible ? (
          <FileExplorer
            changedPaths={changedPaths}
            extraFolders={pendingFolders}
            files={files}
            onCreateFile={createFile}
            onCreateFolder={createFolder}
            onDeleteFile={deleteFile}
            onDeleteFolder={deleteFolder}
            onRenameFile={renameFile}
            onSelect={selectFile}
            selectedPath={selectedPath}
          />
        ) : null}
        <div className={cn('flex min-w-0 flex-1', splitView && 'divide-x divide-border')}>
          <div className="relative flex min-w-0 flex-1 flex-col">
            <div className="flex h-9 shrink-0 items-center border-b border-border px-3 text-xs text-muted-foreground">
              <span className="truncate">{selectedFile?.path}</span>
            </div>
            <div className="min-h-0 flex-1">{renderEditor(selectedFile, 'primary')}</div>
          </div>
          {splitView ? (
            <div className="relative flex min-w-0 flex-1 flex-col">
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border px-3">
                <select
                  aria-label="Select split file"
                  className="min-w-0 flex-1 bg-transparent text-xs text-muted-foreground outline-none"
                  onChange={(event) => setSecondaryPath(event.target.value)}
                  value={secondaryPath ?? selectedPath ?? ''}
                >
                  {files.map((file) => (
                    <option key={file.path} value={file.path}>
                      {file.path}
                    </option>
                  ))}
                </select>
              </div>
              <div className="min-h-0 flex-1">{renderEditor(secondaryFile, 'secondary')}</div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
