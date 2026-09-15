import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { projectId, chatId, versionId } = await request.json()
    if (!projectId || !chatId || !versionId)
      return NextResponse.json(
        {
          error: 'projectId, chatId, and versionId are required',
          details: { projectId: !!projectId, chatId: !!chatId, versionId: !!versionId },
        },
        { status: 400 },
      )
    const response = await fetch('https://api.v0.dev/v1/deployments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.V0_API_KEY}`,
      },
      body: JSON.stringify({ projectId, chatId, versionId }),
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to create deployment' }, { status: 500 })
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase()
      if (errorMessage.includes('api key is required') || errorMessage.includes('401'))
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: error.message },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to create deployment' }, { status: 500 })
    }
    return NextResponse.json({ error: 'Failed to create deployment' }, { status: 500 })
  }
}
