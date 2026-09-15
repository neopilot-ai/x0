import type { Metadata } from 'next'
import { NewChatWorkspace } from '@/components/chat/new-chat-workspace'

export const metadata: Metadata = {
  title: 'New conversation · v0 clone',
}

export default function NewChatPage() {
  return <NewChatWorkspace />
}