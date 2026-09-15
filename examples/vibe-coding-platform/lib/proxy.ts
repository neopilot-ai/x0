import { NextRequest, NextResponse } from 'next/server'

export function parsePreviewPort(port: string | null): number {
  if (!port) return 3000
  const parsed = parseInt(port, 10)
  if (isNaN(parsed) || parsed < 1 || parsed > 65535) return 3000
  return parsed
}

export interface PreviewTarget {
  origin: string
  port: number
  sandboxId: string
}

export async function getPreviewTarget(
  sandboxId: string,
  port: number
): Promise<PreviewTarget> {
  const origin = process.env.PREVIEW_ORIGIN || `http://localhost:${port}`
  return { origin, port, sandboxId }
}

export function buildUpstreamHeaders(
  request: NextRequest,
  target: PreviewTarget
): Headers {
  const headers = new Headers(request.headers)
  headers.set('x-forwarded-host', target.origin)
  headers.set('x-forwarded-proto', target.origin.startsWith('https') ? 'https' : 'http')
  return headers
}

export function buildUpstreamResponse(
  upstreamResponse: Response,
  target: PreviewTarget
): NextResponse {
  const responseHeaders = new Headers(upstreamResponse.headers)
  responseHeaders.set('x-preview-proxy', 'true')
  return new NextResponse(upstreamResponse.body, {
    status: upstreamResponse.status,
    headers: responseHeaders,
  })
}
