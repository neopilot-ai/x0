import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params
    if (!chatId) return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 })
    const response = await fetch(`https://api.v0.dev/v1/chats/${chatId}`, {
      headers: { Authorization: `Bearer ${process.env.V0_API_KEY}` },
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to get chat' }, { status: 500 })
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get chat' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params
    if (!chatId) return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 })
    const response = await fetch(`https://api.v0.dev/v1/chats/${chatId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${process.env.V0_API_KEY}` },
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete chat' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ chatId: string }> },
) {
  try {
    const { chatId } = await params
    const { name } = await request.json()
    if (!name || typeof name !== 'string' || name.trim().length === 0)
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    const response = await fetch(`https://api.v0.dev/v1/chats/${chatId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.V0_API_KEY}`,
      },
      body: JSON.stringify({ name: name.trim() }),
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to update chat' }, { status: 500 })
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update chat' }, { status: 500 })
  }
}
