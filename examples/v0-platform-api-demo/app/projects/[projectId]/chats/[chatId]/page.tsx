'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ProjectDropdown, ChatDropdown } from './components'
import PromptComponent from '../../../../components/prompt-component'
import ApiKeyError from '../../../../components/api-key-error'
import RateLimitDialog from '../../../../components/rate-limit-dialog'
import ErrorDialog from '../../../../components/error-dialog'
import { useApiValidation } from '../../../../../lib/hooks/useApiValidation'

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const chatId = params.chatId as string
  const [isLoading, setIsLoading] = useState(false)
  const [generatedApp, setGeneratedApp] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [chatData, setChatData] = useState<any>(null)
  const [projectChats, setProjectChats] = useState<any[]>([])
  const [projectChatsLoaded, setProjectChatsLoaded] = useState(false)
  const [projects, setProjects] = useState<any[]>([])
  const [projectsLoaded, setProjectsLoaded] = useState(false)
  const [showRateLimitDialog, setShowRateLimitDialog] = useState(false)
  const [rateLimitInfo, setRateLimitInfo] = useState<{ resetTime?: string; remaining?: number }>({})
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { isValidating, showApiKeyError } = useApiValidation()
  const [selectedProjectId, setSelectedProjectId] = useState(projectId)
  const [selectedChatId, setSelectedChatId] = useState(chatId === 'new-chat' ? 'new' : chatId)

  useEffect(() => {
    if (!isValidating && !showApiKeyError) {
      if (chatId && chatId !== 'new' && chatId !== 'new-chat') loadChatData()
      loadProjectChatsWithCache()
      loadProjectsWithCache()
    }
  }, [chatId, projectId, isValidating, showApiKeyError])

  const loadProjectChatsWithCache = async () => {
    try {
      const cachedChats = sessionStorage.getItem(`project-chats-${projectId}`)
      if (cachedChats) setProjectChats(JSON.parse(cachedChats))
    } catch (err) {}
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        const chatsData = data.chats || []
        setProjectChats(chatsData)
        setProjectChatsLoaded(true)
        try {
          sessionStorage.setItem(`project-chats-${projectId}`, JSON.stringify(chatsData))
        } catch (err) {}
      }
    } catch (err) {
    } finally {
      setProjectChatsLoaded(true)
    }
  }

  const loadProjectsWithCache = async () => {
    try {
      const cachedProjects = sessionStorage.getItem('projects')
      if (cachedProjects) {
        setProjects(JSON.parse(cachedProjects))
        setProjectsLoaded(true)
      }
    } catch (err) {}
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.data || data || [])
        setProjectsLoaded(true)
        try {
          sessionStorage.setItem('projects', JSON.stringify(data.data || data || []))
        } catch (err) {}
      }
    } catch (err) {
    } finally {
      setProjectsLoaded(true)
    }
  }

  const handleProjectChange = async (newProjectId: string) => {
    if (newProjectId === 'new') {
      setSelectedProjectId('new')
      setSelectedChatId('new')
      setProjectChats([])
    }
  }

  const loadProjectChats = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        const chatsData = data.chats || []
        setProjectChats(chatsData)
        setProjectChatsLoaded(true)
        try {
          sessionStorage.setItem(`project-chats-${projectId}`, JSON.stringify(chatsData))
        } catch (err) {}
      }
    } catch (err) {}
  }

  const handleChatChange = (newChatId: string) => {
    if (newChatId === 'new') {
      router.push(`/projects/${projectId}/chats/new-chat`)
      setSelectedChatId('new')
      setChatData(null)
      setGeneratedApp(null)
      setError(null)
    } else {
      setSelectedChatId(newChatId)
    }
  }

  const handleDeleteChat = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, { method: 'DELETE' })
      if (response.ok) {
        try {
          sessionStorage.removeItem(`project-chats-${projectId}`)
        } catch (err) {}
        router.push(`/projects/${projectId}`)
      } else {
        setError('Failed to delete chat. Please try again.')
      }
    } catch (error) {
      setError('Failed to delete chat. Please try again.')
    }
  }

  const handleRenameChat = async (newName: string) => {
    try {
      const response = await fetch(`/api/chats/${chatId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      })
      if (response.ok) {
        setChatData((prev: any) => (prev ? { ...prev, name: newName } : prev))
        try {
          sessionStorage.removeItem(`project-chats-${projectId}`)
        } catch (err) {}
        loadProjectChats()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to rename chat')
      }
    } catch (error) {
      throw error
    }
  }

  const loadChatData = async () => {
    try {
      const response = await fetch(`/api/chats/${encodeURIComponent(chatId)}`, { method: 'GET' })
      if (response.ok) {
        const data = await response.json()
        setChatData(data)
        if (data.demo) setGeneratedApp(data.demo)
        else if (data.url) setGeneratedApp(data.url)
      }
    } catch (err) {}
  }

  const handleSubmit = async (
    prompt: string,
    settings: { modelId: string; imageGenerations: boolean; thinking: boolean },
    attachments?: { url: string; name?: string; type?: string }[],
  ) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          chatId: selectedChatId !== 'new' ? selectedChatId : undefined,
          projectId,
          modelId: settings.modelId,
          imageGenerations: settings.imageGenerations,
          thinking: settings.thinking,
          ...(attachments && attachments.length > 0 && { attachments }),
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        if (response.status === 401 && errorData.error === 'API_KEY_MISSING') return
        if (response.status === 429 && errorData.error === 'RATE_LIMIT_EXCEEDED') {
          setRateLimitInfo({ resetTime: errorData.resetTime, remaining: errorData.remaining })
          setShowRateLimitDialog(true)
          return
        }
        setErrorMessage(errorData.error || 'Failed to generate app')
        setShowErrorDialog(true)
        return
      }
      const data = await response.json()
      setChatData(data)
      if ((selectedChatId === 'new' || selectedProjectId === 'new') && (data.id || data.chatId)) {
        const newChatId = data.id || data.chatId
        const newProjectId = data.projectId || selectedProjectId
        router.replace(`/projects/${newProjectId}/chats/${newChatId}`)
        return
      }
      if (data.demo) setGeneratedApp(data.demo)
      else if (data.url) setGeneratedApp(data.url)
      else {
        const fallbackPreview = `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="p-8 bg-gray-50 flex items-center justify-center min-h-dvh"><div class="max-w-md mx-auto text-center"><div class="text-4xl mb-4">✨</div><h1 class="text-xl font-semibold mb-4">App Generated Successfully!</h1><p class="text-gray-600 mb-4">${data.text || 'Your app has been created.'}</p>${data.url ? `<a href="${data.url}" target="_blank" class="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">View on v0.dev</a>` : ''}</div></body></html>`
        setGeneratedApp(fallbackPreview)
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Failed to generate app. Please try again.',
      )
      setShowErrorDialog(true)
    } finally {
      setIsLoading(false)
    }
  }

  if (showApiKeyError) return <ApiKeyError />

  return (
    <div className="relative min-h-dvh bg-background">
      <div className="absolute inset-0 overflow-hidden">
        {generatedApp ? (
          <div className="w-full h-full bg-white">
            {generatedApp.startsWith('http') ? (
              <iframe
                src={generatedApp}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-popups allow-top-navigation-by-user-activation allow-pointer-lock"
              />
            ) : (
              <iframe
                srcDoc={generatedApp}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-modals allow-forms allow-pointer-lock"
              />
            )}
          </div>
        ) : null}
      </div>
      <PromptComponent
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={
          chatId !== 'new' && chatId !== 'new-chat' ? 'Refine your app...' : 'Describe your app...'
        }
        showDropdowns={projectsLoaded && projectChatsLoaded}
        projects={projects}
        projectChats={projectChats}
        currentProjectId={projectId}
        currentChatId={chatId}
        chatData={chatData}
        onProjectChange={handleProjectChange}
        onChatChange={handleChatChange}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
      />
      <RateLimitDialog
        isOpen={showRateLimitDialog}
        onClose={() => setShowRateLimitDialog(false)}
        resetTime={rateLimitInfo.resetTime}
        remaining={rateLimitInfo.remaining}
      />
      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        message={errorMessage}
      />
    </div>
  )
}
