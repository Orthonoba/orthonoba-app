/**
 * In-memory rate limiter for Edge/Node.js environments.
 * For production at scale, replace the store with Upstash Redis:
 *   npm install @upstash/ratelimit @upstash/redis
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory store — resets on serverless cold starts (acceptable for Edge)
const store = new Map<string, RateLimitEntry>()

interface RateLimitOptions {
  /** Maximum requests allowed in the window */
  limit: number
  /** Window size in seconds */
  windowSecs: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
  retryAfterSecs: number
}

export function rateLimit(
  identifier: string,
  options: RateLimitOptions
): RateLimitResult {
  const now = Date.now()
  const key = identifier

  // Cleanup expired entries periodically
  if (Math.random() < 0.01) {
    for (const [k, v] of store.entries()) {
      if (v.resetAt < now) store.delete(k)
    }
  }

  const entry = store.get(key)
  const windowMs = options.windowSecs * 1000

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return {
      success: true,
      remaining: options.limit - 1,
      resetAt: now + windowMs,
      retryAfterSecs: 0,
    }
  }

  if (entry.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
      retryAfterSecs: Math.ceil((entry.resetAt - now) / 1000),
    }
  }

  entry.count++
  return {
    success: true,
    remaining: options.limit - entry.count,
    resetAt: entry.resetAt,
    retryAfterSecs: 0,
  }
}

// Pre-configured limiters for common use-cases
export const authLimiter = (ip: string) =>
  rateLimit(`auth:${ip}`, { limit: 5, windowSecs: 900 })   // 5 per 15min

export const apiLimiter = (ip: string) =>
  rateLimit(`api:${ip}`, { limit: 60, windowSecs: 60 })    // 60 per min

export const webhookLimiter = (ip: string) =>
  rateLimit(`wh:${ip}`, { limit: 200, windowSecs: 60 })    // 200 per min

/**
 * Get client IP from request headers (Vercel-aware).
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
