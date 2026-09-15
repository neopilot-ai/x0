import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      chatId,
      projectId,
      modelId = 'v0-1.5-md',
      imageGenerations = false,
      thinking = false,
      attachments = [],
    } = await request.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 },
      )
    }
    const body: any = { message: message.trim(), modelId, imageGenerations, thinking }
    if (chatId) body.chatId = chatId
    if (projectId) body.projectId = projectId
    if (attachments.length > 0) body.attachments = attachments
    const response = await fetch('https://api.v0.dev/v1/chats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.V0_API_KEY}`,
      },
      body: JSON.stringify(body),
    })
    if (!response.ok) {
      const errorData = await response.json()
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: errorData.error || 'Invalid API key' },
          { status: 401 },
        )
      if (response.status === 429)
        return NextResponse.json(
          { error: 'RATE_LIMIT_EXCEEDED', ...errorData },
          {
            status: 429,
            headers: {
              'X-RateLimit-Limit': '3',
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': new Date(Date.now() + 43200000).toISOString(),
            },
          },
        )
      return NextResponse.json(
        { error: errorData.error || 'Failed to generate app' },
        { status: 500 },
      )
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase()
      if (errorMessage.includes('api key is required') || errorMessage.includes('401')) {
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: error.message },
          { status: 401 },
        )
      }
      return NextResponse.json({ error: 'Failed to generate app' }, { status: 500 })
    }
    return NextResponse.json({ error: 'Failed to generate app' }, { status: 500 })
  }
}
