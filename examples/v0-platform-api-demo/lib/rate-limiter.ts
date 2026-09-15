import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const upstashUrl = process.env.KV_REST_API_URL
const upstashToken = process.env.KV_REST_API_TOKEN
const isRateLimitingEnabled =
  upstashUrl && upstashToken && upstashUrl.trim() !== '' && upstashToken.trim() !== ''

let generationRateLimit: Ratelimit | null = null
let redis: Redis | null = null

if (isRateLimitingEnabled) {
  redis = new Redis({ url: upstashUrl!, token: upstashToken! })
  generationRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '43200 s'),
    analytics: true,
    prefix: 'v0_generation_limit',
  })
}

export function getUserIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown'
  return `ip:${ip}`
}

export function getUserIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip')
  return forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown'
}

export async function associateProjectWithIP(projectId: string, userIP: string): Promise<void> {
  if (!redis) return
  try {
    await redis.sadd(`user_projects:${userIP}`, projectId)
  } catch (error) {
    console.warn('Failed to associate project with IP:', error)
  }
}

export async function getUserProjects(userIP: string): Promise<string[]> {
  if (!redis) return []
  try {
    return (await redis.smembers(`user_projects:${userIP}`)) as string[]
  } catch (error) {
    console.warn('Failed to get user projects:', error)
    return []
  }
}

export async function checkRateLimit(identifier: string) {
  if (!isRateLimitingEnabled || !generationRateLimit) {
    return {
      success: true,
      limit: 3,
      reset: Date.now() + 43200000,
      remaining: 3,
      resetTime: new Date(Date.now() + 43200000),
    }
  }
  try {
    const { success, limit, reset, remaining } = await generationRateLimit.limit(identifier)
    return { success, limit, reset, remaining, resetTime: new Date(reset) }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    return {
      success: true,
      limit: 3,
      reset: Date.now() + 43200000,
      remaining: 3,
      resetTime: new Date(Date.now() + 43200000),
    }
  }
}
