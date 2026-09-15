import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> },
) {
  try {
    const { projectId } = await params
    if (!projectId) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    const response = await fetch(`https://api.v0.dev/v1/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${process.env.V0_API_KEY}` },
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to get project' }, { status: 500 })
    }
    return NextResponse.json(await response.json())
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get project' }, { status: 500 })
  }
}
