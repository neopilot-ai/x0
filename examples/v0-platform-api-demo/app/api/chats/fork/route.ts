import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { chatId, projectId } = await request.json()
    if (!chatId) return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 })
    const response = await fetch(`https://api.v0.dev/v1/chats/${chatId}/fork`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.V0_API_KEY}`,
      },
      body: JSON.stringify({ projectId }),
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to fork chat' }, { status: 500 })
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fork chat' }, { status: 500 })
  }
}
