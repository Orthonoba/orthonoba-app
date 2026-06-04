/**
 * Dual-mode rate limiter:
 * - Production (Vercel/serverless): uses Upstash Redis when UPSTASH_REDIS_REST_URL is set
 * - Development / CI without Upstash: falls back to in-memory Map
 *
 * The Upstash path is serverless-safe — each request hits the same Redis instance
 * regardless of cold starts or number of worker processes.
 */

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetAt: number
  retryAfterSecs: number
}

// ── In-memory fallback ─────────────────────────────────────────────────────

interface MemoryEntry {
  count: number
  resetAt: number
}

const memStore = new Map<string, MemoryEntry>()

function memoryLimit(
  key: string,
  limit: number,
  windowSecs: number
): RateLimitResult {
  const now = Date.now()
  const windowMs = windowSecs * 1000

  // Probabilistic cleanup to avoid unbounded memory growth
  if (Math.random() < 0.01) {
    for (const [k, v] of memStore.entries()) {
      if (v.resetAt < now) memStore.delete(k)
    }
  }

  const entry = memStore.get(key)

  if (!entry || entry.resetAt < now) {
    memStore.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1, resetAt: now + windowMs, retryAfterSecs: 0 }
  }

  if (entry.count >= limit) {
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
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
    retryAfterSecs: 0,
  }
}

// ── Upstash Redis path ─────────────────────────────────────────────────────

function hasUpstash(): boolean {
  return !!(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

async function upstashLimit(
  key: string,
  limit: number,
  windowSecs: number
): Promise<RateLimitResult> {
  const { Ratelimit } = await import('@upstash/ratelimit')
  const { Redis } = await import('@upstash/redis')

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  })

  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSecs} s`),
    prefix: 'orthonoba:rl',
  })

  const { success, remaining, reset } = await ratelimit.limit(key)
  const now = Date.now()

  return {
    success,
    remaining,
    resetAt: reset,
    retryAfterSecs: success ? 0 : Math.ceil((reset - now) / 1000),
  }
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function rateLimit(
  identifier: string,
  limit: number,
  windowSecs: number
): Promise<RateLimitResult> {
  if (hasUpstash()) {
    return upstashLimit(identifier, limit, windowSecs)
  }
  return memoryLimit(identifier, limit, windowSecs)
}

export const authLimiter = (ip: string) =>
  rateLimit(`auth:${ip}`, 5, 900)     // 5 per 15 min

export const apiLimiter = (ip: string) =>
  rateLimit(`api:${ip}`, 60, 60)      // 60 per min

export const webhookLimiter = (ip: string) =>
  rateLimit(`wh:${ip}`, 200, 60)      // 200 per min

export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'
  )
}
