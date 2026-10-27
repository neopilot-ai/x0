'use client'

import { useMemo, useState } from 'react'
import type { Files } from '@v0-sdk/react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileIcon,
  FolderClosedIcon,
  FolderMinusIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  PlusIcon,
  RenameIcon,
  TrashIcon,
} from '@/lib/icons'
import { cn } from '@/lib/utils'

export type ChatFile = Files['files'][number]

type Node = { name: string; path: string; isFile: boolean; children: Node[] }

type ContextMenu = { x: number; y: number; path: string; kind: 'file' | 'folder' } | null

function buildTree(paths: string[], extraFolders: string[]): Node[] {
  const root: Node = { name: '', path: '', isFile: false, children: [] }

  const insert = (path: string, asFile: boolean) => {
    const parts = path.split('/').filter(Boolean)
    let node = root
    let acc = ''
    parts.forEach((part, index) => {
      acc = acc ? `${acc}/${part}` : part
      const isFile = index === parts.length - 1 && asFile
      let child = node.children.find((item) => item.name === part && item.isFile === isFile)
      if (!child) {
        child = { name: part, path: acc, isFile, children: [] }
        node.children.push(child)
      }
      node = child
    })
  }

  paths.forEach((path) => insert(path, true))
  extraFolders.forEach((path) => {
    if (path && !paths.some((file) => file.startsWith(`${path}/`))) insert(path, false)
  })
  return root.children
}

function sortNodes(nodes: Node[]): Node[] {
  return [...nodes].sort((a, b) => {
    if (a.isFile !== b.isFile) return a.isFile ? 1 : -1
    return a.name.localeCompare(b.name)
  })
}

export function FileExplorer({
  files,
  extraFolders,
  selectedPath,
  changedPaths,
  onSelect,
  onCreateFile,
  onCreateFolder,
  onRenameFile,
  onDeleteFile,
  onDeleteFolder,
}: {
  files: ChatFile[]
  extraFolders: string[]
  selectedPath: string | null
  changedPaths: ReadonlySet<string>
  onSelect: (path: string) => void
  onCreateFile: (inFolder: string | null) => void
  onCreateFolder: (inFolder: string | null) => void
  onRenameFile: (path: string) => void
  onDeleteFile: (path: string) => void
  onDeleteFolder: (path: string) => void
}) {
  const [collapsed, setCollapsed] = useState<ReadonlySet<string>>(new Set())
  const [contextMenu, setContextMenu] = useState<ContextMenu>(null)

  const tree = useMemo(
    () =>
      sortNodes(
        buildTree(
          files.map((file) => file.path),
          extraFolders,
        ),
      ),
    [files, extraFolders],
  )

  const toggleFolder = (path: string) => {
    setCollapsed((current) => {
      const next = new Set(current)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }

  const openContext = (event: React.MouseEvent, path: string, kind: 'file' | 'folder') => {
    event.preventDefault()
    setContextMenu({ x: event.clientX, y: event.clientY, path, kind })
  }

  const renderNodes = (nodes: Node[], depth: number) =>
    nodes.map((node) =>
      node.isFile ? (
        <button
          className={cn(
            'flex w-full items-center gap-2 rounded-md px-2 py-1 pl-3 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground',
            node.path === selectedPath && 'bg-accent text-foreground',
          )}
          key={node.path}
          onClick={() => onSelect(node.path)}
          onContextMenu={(event) => openContext(event, node.path, 'file')}
          style={{ paddingLeft: `${depth * 14 + 12}px` }}
          title={node.path}
          type="button"
        >
          <FileIcon className="size-3.5 shrink-0" />
          <span className="truncate">{node.name}</span>
          {changedPaths.has(node.path) ? (
            <span className="ml-auto size-1.5 shrink-0 rounded-full bg-amber-500" />
          ) : null}
        </button>
      ) : (
        <div key={node.path}>
          <button
            className="flex w-full items-center gap-1 rounded-md px-2 py-1 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
            onClick={() => toggleFolder(node.path)}
            onContextMenu={(event) => openContext(event, node.path, 'folder')}
            style={{ paddingLeft: `${depth * 14 + 12}px` }}
            title={node.path}
            type="button"
          >
            <span className="flex size-3.5 shrink-0 items-center justify-center">
              {collapsed.has(node.path) ? (
                <ChevronRightIcon className="size-3" />
              ) : (
                <ChevronDownIcon className="size-3" />
              )}
            </span>
            {collapsed.has(node.path) ? (
              <FolderClosedIcon className="size-3.5 shrink-0" />
            ) : (
              <FolderOpenIcon className="size-3.5 shrink-0" />
            )}
            <span className="truncate">{node.name}</span>
          </button>
          {!collapsed.has(node.path) ? renderNodes(sortNodes(node.children), depth + 1) : null}
        </div>
      ),
    )

  return (
    <aside className="flex w-52 shrink-0 flex-col border-r border-border">
      <div className="flex items-center gap-1 border-b border-border px-2 py-1">
        <span className="flex-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Files
        </span>
        <Button
          aria-label="Create file"
          onClick={() => onCreateFile(null)}
          size="icon-xs"
          title="New file"
          variant="ghost"
        >
          <PlusIcon />
        </Button>
        <Button
          aria-label="Create folder"
          onClick={() => onCreateFolder(null)}
          size="icon-xs"
          title="New folder"
          variant="ghost"
        >
          <FolderPlusIcon />
        </Button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {tree.length === 0 ? (
          <p className="px-2 py-1 text-xs text-muted-foreground">No files yet.</p>
        ) : (
          renderNodes(tree, 0)
        )}
      </div>
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) setContextMenu(null)
        }}
        open={contextMenu !== null}
      >
        <DropdownMenuTrigger asChild>
          <span
            aria-hidden
            className="pointer-events-none fixed size-0"
            style={{ left: contextMenu?.x ?? 0, top: contextMenu?.y ?? 0 }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" side="right" sideOffset={0}>
          {contextMenu?.kind === 'file' ? (
            <>
              <DropdownMenuItem onClick={() => onRenameFile(contextMenu.path)}>
                <RenameIcon /> Rename file
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDeleteFile(contextMenu.path)}
                variant="destructive"
              >
                <TrashIcon /> Delete file
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  onCreateFile(contextMenu.path.split('/').slice(0, -1).join('/') || null)
                }
              >
                <PlusIcon /> New file here
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => onCreateFile(contextMenu?.path ?? null)}>
                <PlusIcon /> New file here
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCreateFolder(contextMenu?.path ?? null)}>
                <FolderPlusIcon /> New folder here
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDeleteFolder(contextMenu?.path ?? '')}
                variant="destructive"
              >
                <FolderMinusIcon /> Delete folder
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </aside>
  )
}
