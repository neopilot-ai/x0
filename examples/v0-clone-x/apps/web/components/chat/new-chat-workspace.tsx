'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ChatConversation } from '@/components/chat/chat-conversation'

function createLocalChatId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export function NewChatWorkspace() {
  const router = useRouter()
  const [chatId] = useState(createLocalChatId)
  const [createdChatId, setCreatedChatId] = useState<string | null>(null)

  const handleChatCreated = useCallback((id: string) => {
    setCreatedChatId(id)
  }, [])

  const handleChatFinished = useCallback(() => {
    if (!createdChatId) return
    router.replace(`/chats/${encodeURIComponent(createdChatId)}`)
  }, [createdChatId, router])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
        <h1 className="text-sm font-medium">New conversation</h1>
        <span className="text-xs text-muted-foreground">
          Your first message creates the workspace
        </span>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">
        <ChatConversation
          chatId={chatId}
          isNewChat
          messages={[]}
          onChatCreated={handleChatCreated}
          onChatFinished={handleChatFinished}
          onContentChange={() => {}}
        />
      </div>
    </div>
  )
}
