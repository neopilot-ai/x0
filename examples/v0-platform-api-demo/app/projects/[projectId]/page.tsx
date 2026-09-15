'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useApiValidation } from '../../../lib/hooks/useApiValidation'
import ApiKeyError from '../../components/api-key-error'

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.projectId as string
  const { isValidating, showApiKeyError } = useApiValidation()

  useEffect(() => {
    if (!isValidating && !showApiKeyError && projectId) getLatestChatAndRedirect(projectId)
  }, [isValidating, showApiKeyError, projectId])

  const getLatestChatAndRedirect = async (projectId: string) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`)
      if (!response.ok) {
        router.replace(`/projects/${projectId}/chats/new`)
        return
      }
      const projectData = await response.json()
      const chats = projectData.chats || []
      if (chats.length > 0) {
        const sortedChats = chats.sort((a: any, b: any) => {
          if (a.updatedAt && b.updatedAt)
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          return 0
        })
        const latestChatId = sortedChats[0].id
        router.replace(`/projects/${projectId}/chats/${latestChatId}`)
      } else {
        router.replace(`/projects/${projectId}/chats/new`)
      }
    } catch (error) {
      router.replace(`/projects/${projectId}/chats/new`)
    }
  }

  if (showApiKeyError) return <ApiKeyError />

  return (
    <div className="min-h-dvh bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent mx-auto mb-4"></div>
      </div>
    </div>
  )
}
