import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://api.v0.dev/v1/projects', {
      headers: { Authorization: `Bearer ${process.env.V0_API_KEY}` },
    })
    if (!response.ok) {
      if (response.status === 401)
        return NextResponse.json(
          { error: 'API_KEY_MISSING', message: 'Invalid API key' },
          { status: 401 },
        )
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }
    const data = await response.json()
    return NextResponse.json({ data: data.data || data || [] })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name } = body
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
    }
    const response = await fetch('https://api.v0.dev/v1/projects', {
      method: 'POST',
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
      return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
    }
    const project = await response.json()
    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
