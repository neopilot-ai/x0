'use client'

import { Suspense, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { WorkspaceTools, type ToolPanel } from '@/components/chat/workspace-tools'
import { AgentIcon, SettingsIcon, TerminalIcon, SparklesIcon, StarIcon } from '@/lib/icons'
import type { Chat, Message } from '@v0-sdk/react'
import {
  CodeEditorLoading,
  CodeEditorPane,
  type ChatFilesResult,
} from '@/components/chat/code-editor'
import { ChatHeader, type ChatView } from '@/components/chat/chat-header'
import { ChatConversation } from '@/components/chat/chat-conversation'
import { PreviewPane } from '@/components/preview/preview-pane'

export function ChatWorkspace({
  chat,
  messages,
  filesPromise,
}: {
  chat: Chat
  messages: Message[]
  filesPromise: Promise<ChatFilesResult>
}) {
  const [view, setView] = useState<ChatView>('preview')
  const [contentRevision, setContentRevision] = useState(0)
  const [isPreviewReady, setIsPreviewReady] = useState(false)
  const [activeTool, setActiveTool] = useState<ToolPanel | null>(null)

  const handleContentChange = () => {
    setIsPreviewReady(false)
    setContentRevision((revision) => revision + 1)
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ChatHeader
        chatId={chat.id}
        onViewChange={setView}
        title={chat.title ?? 'Untitled chat'}
        view={view}
      />
      <div className="flex min-h-0 flex-1">
        <div className="flex w-full shrink-0 flex-col border-r border-border md:w-80 md:max-w-[42%]">
          <ChatConversation
            chatId={chat.id}
            messages={messages}
            onContentChange={handleContentChange}
            vercelProjectId={chat.vercelProjectId}
          />
        </div>
        <div className="hidden min-w-0 flex-1 md:flex">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-10 shrink-0 items-center justify-end gap-1 border-b border-border px-2">
              <span className="mr-auto text-xs text-muted-foreground">
                {view === 'preview' ? 'Live preview' : 'Source files'}
              </span>
              <Badge className="mr-1 hidden sm:inline-flex" variant="outline">
                Mock workspace
              </Badge>
              <Button
                aria-label="Open design mode"
                className="size-7"
                onClick={() => setActiveTool(activeTool === 'design' ? null : 'design')}
                size="icon-sm"
                variant={activeTool === 'design' ? 'secondary' : 'ghost'}
              >
                <SparklesIcon />
              </Button>
              <Button
                aria-label="Open terminal"
                className="size-7"
                onClick={() => setActiveTool(activeTool === 'terminal' ? null : 'terminal')}
                size="icon-sm"
                variant={activeTool === 'terminal' ? 'secondary' : 'ghost'}
              >
                <TerminalIcon />
              </Button>
              <Button
                aria-label="Open versions"
                className="size-7"
                onClick={() => setActiveTool(activeTool === 'versions' ? null : 'versions')}
                size="icon-sm"
                variant={activeTool === 'versions' ? 'secondary' : 'ghost'}
              >
                <StarIcon />
              </Button>
              <Button
                aria-label="Open project settings"
                className="size-7"
                onClick={() => setActiveTool(activeTool === 'integrations' ? null : 'integrations')}
                size="icon-sm"
                variant={activeTool === 'integrations' ? 'secondary' : 'ghost'}
              >
                <SettingsIcon />
              </Button>
              <Button
                aria-label="Open agents"
                className="size-7"
                onClick={() => setActiveTool(activeTool === 'agents' ? null : 'agents')}
                size="icon-sm"
                variant={activeTool === 'agents' ? 'secondary' : 'ghost'}
              >
                <AgentIcon />
              </Button>
            </div>
            <div className="min-h-0 flex-1">
              <div className={view === 'preview' ? 'h-full' : 'hidden'}>
                <PreviewPane
                  chatId={chat.id}
                  key={contentRevision}
                  onReadyChange={setIsPreviewReady}
                />
              </div>
              <div className={view === 'code' ? 'h-full' : 'hidden'}>
                <Suspense fallback={<CodeEditorLoading />}>
                  <CodeEditorPane
                    chatId={chat.id}
                    filesPromise={filesPromise}
                    isPreviewReady={isPreviewReady}
                    key={contentRevision}
                  />
                </Suspense>
              </div>
            </div>
          </div>
          <WorkspaceTools activeTool={activeTool} onToolChange={setActiveTool} />
        </div>
      </div>
    </div>
  )
}
