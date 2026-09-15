import { NextRequest } from 'next/server'

export function authorizeRequest(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false
  return authHeader.startsWith('Bearer ') || authHeader.startsWith('sk-')
}
