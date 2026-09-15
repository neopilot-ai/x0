import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.v0.dev/v1/user', {
      headers: { Authorization: `Bearer ${process.env.V0_API_KEY}` },
    })
    if (response.ok) {
      const user = await response.json()
      return NextResponse.json({
        valid: true,
        message: 'API key is configured correctly',
        user: { id: user.id, name: user.name, email: user.email },
      })
    }
    return NextResponse.json(
      { valid: false, error: 'API_KEY_MISSING', message: 'Invalid API key' },
      { status: 401 },
    )
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: 'VALIDATION_ERROR', message: 'Failed to validate API key' },
      { status: 500 },
    )
  }
}
