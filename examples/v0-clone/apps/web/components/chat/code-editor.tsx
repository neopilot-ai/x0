'use client'

import type { Files } from '@v0-sdk/react'
import { useFiles, useUpdateChatFiles } from '@v0-sdk/react/swr'
import { use, useEffect, useMemo, useRef, useState } from 'react'
import { Loader } from '@/components/ai-elements/loader'
import { Button } from '@/components/ui/button'
import { FileIcon, PlusIcon, RenameIcon, SearchIcon, SpinnerIcon, TrashIcon } from '@/lib/icons'
import { cn } from '@/lib/utils'

type ChatFile = Files['files'][number]
export type ChatFilesResult = { files: Files['files'] } | { error: string }

type SearchMode = 'file' | 'global' | null

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
  const [selectedPath, setSelectedPath] = useState(
    cachedFiles.find((file) => file.encoding === 'utf8')?.path ?? cachedFiles[0]?.path ?? null,
  )
  const [secondaryPath, setSecondaryPath] = useState<string | null>(null)
  const [explorerVisible, setExplorerVisible] = useState(true)
  const [splitView, setSplitView] = useState(false)
  const [diffView, setDiffView] = useState(false)
  const [searchMode, setSearchMode] = useState<SearchMode>(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const isSaving = updateFiles.isMutating
  const selectedFile = files.find((file) => file.path === selectedPath)
  const changedFiles = files.filter(
    (file) =>
      file.encoding === 'utf8' &&
      savedFiles.find((saved) => saved.path === file.path)?.content !== file.content,
  )
  const filteredFiles = useMemo(
    () => files.filter((file) => file.path.toLowerCase().includes(query.toLowerCase())),
    [files, query],
  )
  const globalMatches = useMemo(
    () =>
      files.filter(
        (file) =>
          file.encoding === 'utf8' &&
          query &&
          file.content.toLowerCase().includes(query.toLowerCase()),
      ),
    [files, query],
  )

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
    if (changedFiles.length === 0 || !isPreviewReady || isSaving) return
    setStatus(null)
    try {
      await updateFiles.trigger({
        files: changedFiles.map(({ path, content }) => ({ path, content })),
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

  const createFile = () => {
    const path = window.prompt('New file path', 'untitled.tsx')?.trim()
    if (!path || files.some((file) => file.path === path)) return
    const file = { path, encoding: 'utf8', content: '' } as ChatFile
    setFiles((current) => [...current, file])
    setSelectedPath(path)
    setStatus('New file — save to persist')
  }

  const renameFile = () => {
    if (!selectedFile) return
    const path = window.prompt('Rename file', selectedFile.path)?.trim()
    if (!path || path === selectedFile.path || files.some((file) => file.path === path)) return
    setFiles((current) =>
      current.map((file) => (file.path === selectedFile.path ? { ...file, path } : file)),
    )
    setSelectedPath(path)
    setStatus('Renamed locally — save to persist')
  }

  const deleteFile = () => {
    if (!selectedFile || !window.confirm(`Delete ${selectedFile.path}?`)) return
    const next = files.filter((file) => file.path !== selectedFile.path)
    setFiles(next)
    setSelectedPath(next[0]?.path ?? null)
    setStatus('Deleted locally — save to persist')
  }

  if (files.length === 0)
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No files yet.
      </div>
    )

  const renderEditor = (file: ChatFile | undefined, pane: 'primary' | 'secondary') => {
    if (!file)
      return (
        <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
          Select a file
        </div>
      )
    const saved = savedFiles.find((item) => item.path === file.path)
    if (file.encoding !== 'utf8')
      return (
        <div className="flex flex-1 items-center justify-center p-6 text-center text-sm text-muted-foreground">
          Binary files cannot be edited.
        </div>
      )
    if (diffView && pane === 'primary') {
      return (
        <pre className="min-h-0 flex-1 overflow-auto bg-background p-4 font-mono text-xs leading-5 text-muted-foreground">
          {file.content === saved?.content ? 'No changes' : file.content}
        </pre>
      )
    }
    return (
      <textarea
        aria-label={`Edit ${file.path}`}
        className="min-h-0 flex-1 resize-none bg-background p-4 font-mono text-xs leading-5 text-foreground outline-none"
        disabled={isSaving}
        onChange={(event) => updateFile(file.path, event.target.value)}
        spellCheck={false}
        value={file.content}
      />
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="flex min-h-10 flex-wrap items-center gap-1 border-b border-border px-2 py-1">
        <Button
          aria-label="Toggle file explorer"
          onClick={() => setExplorerVisible((visible) => !visible)}
          size="icon-xs"
          variant="ghost"
          title="Toggle explorer (⌘B)"
        >
          <FileIcon />
        </Button>
        <Button
          aria-label="Find in file"
          onClick={() => {
            setSearchMode('file')
            setQuery('')
          }}
          size="icon-xs"
          variant="ghost"
          title="Find in file (⌘F)"
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
          variant="ghost"
          title="Global search (⇧⌘F)"
        >
          <SearchIcon />
        </Button>
        <Button
          onClick={() => setDiffView((visible) => !visible)}
          size="xs"
          variant={diffView ? 'secondary' : 'ghost'}
        >
          Diff
        </Button>
        <Button
          onClick={() => setSplitView((visible) => !visible)}
          size="xs"
          variant={splitView ? 'secondary' : 'ghost'}
        >
          Split
        </Button>
        <span className="flex-1" />
        {changedFiles.length > 0 ? (
          <span className="text-xs text-amber-600">Unsaved Changes</span>
        ) : null}
        {status ? (
          <span
            className={cn(
              'text-xs',
              status === 'Saved' ? 'text-muted-foreground' : 'text-amber-600',
            )}
          >
            {status}
          </span>
        ) : null}
        <Button disabled={changedFiles.length === 0} onClick={reset} size="xs" variant="ghost">
          Reset
        </Button>
        <Button
          disabled={changedFiles.length === 0 || isSaving || !isPreviewReady}
          onClick={() => void save()}
          size="xs"
          title={isPreviewReady ? 'Save changes' : 'Preview is still loading'}
        >
          {isSaving ? <SpinnerIcon className="animate-spin" /> : null}
          {isSaving ? 'Saving' : 'Save'}
        </Button>
      </div>
      {searchMode ? (
        <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-3 py-1.5">
          <SearchIcon />
          <input
            ref={searchRef}
            aria-label={searchMode === 'file' ? 'Find in current file' : 'Search all files'}
            className="min-w-0 flex-1 bg-transparent text-xs outline-none"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === 'Escape' && setSearchMode(null)}
            placeholder={searchMode === 'file' ? 'Find in current file…' : 'Search all files…'}
            value={query}
          />
          <span className="text-xs text-muted-foreground">
            {searchMode === 'global'
              ? `${globalMatches.length} files`
              : query
                ? (selectedFile?.content.toLowerCase().split(query.toLowerCase()).length ?? 1) - 1
                : 0}
          </span>
          <Button onClick={() => setSearchMode(null)} size="icon-xs" variant="ghost">
            ×
          </Button>
        </div>
      ) : null}
      <div className="flex min-h-0 flex-1">
        {explorerVisible ? (
          <aside className="flex w-52 shrink-0 flex-col border-r border-border">
            <div className="flex items-center gap-1 border-b border-border px-2 py-1">
              <span className="flex-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Files
              </span>
              <Button aria-label="Create file" onClick={createFile} size="icon-xs" variant="ghost">
                <PlusIcon />
              </Button>
              <Button
                aria-label="Rename file"
                disabled={!selectedFile}
                onClick={renameFile}
                size="icon-xs"
                variant="ghost"
              >
                <RenameIcon />
              </Button>
              <Button
                aria-label="Delete file"
                disabled={!selectedFile}
                onClick={deleteFile}
                size="icon-xs"
                variant="ghost"
              >
                <TrashIcon />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {filteredFiles.map((file) => (
                <button
                  className={cn(
                    'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground',
                    file.path === selectedPath && 'bg-accent text-foreground',
                  )}
                  key={file.path}
                  onClick={() => setSelectedPath(file.path)}
                  title={file.path}
                  type="button"
                >
                  <FileIcon className="size-3.5 shrink-0" />
                  <span className="truncate">{file.path}</span>
                  {changedFiles.some((item) => item.path === file.path) ? (
                    <span className="ml-auto size-1.5 rounded-full bg-amber-500" />
                  ) : null}
                </button>
              ))}
            </div>
          </aside>
        ) : null}
        <div className={cn('flex min-w-0 flex-1', splitView && 'divide-x divide-border')}>
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-9 shrink-0 items-center border-b border-border px-3 text-xs text-muted-foreground">
              <span className="truncate">{selectedFile?.path}</span>
            </div>
            {renderEditor(selectedFile, 'primary')}
          </div>
          {splitView ? (
            <div className="flex min-w-0 flex-1 flex-col">
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
              {renderEditor(
                files.find((file) => file.path === (secondaryPath ?? selectedPath)),
                'secondary',
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
