import { describe, it, expect, beforeEach, vi } from 'vitest'
import { rateLimit, authLimiter, getClientIp } from '@/lib/rate-limit'

// Reset the in-memory store between tests by using different keys
let testKeyCounter = 0
const uniqueKey = () => `test-${testKeyCounter++}`

describe('rateLimit', () => {
  it('allows requests within the limit', () => {
    const key = uniqueKey()
    const result = rateLimit(key, { limit: 3, windowSecs: 60 })
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('blocks after exceeding limit', () => {
    const key = uniqueKey()
    rateLimit(key, { limit: 2, windowSecs: 60 })
    rateLimit(key, { limit: 2, windowSecs: 60 })
    const result = rateLimit(key, { limit: 2, windowSecs: 60 })
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
    expect(result.retryAfterSecs).toBeGreaterThan(0)
  })

  it('counts remaining correctly', () => {
    const key = uniqueKey()
    const r1 = rateLimit(key, { limit: 5, windowSecs: 60 })
    const r2 = rateLimit(key, { limit: 5, windowSecs: 60 })
    expect(r1.remaining).toBe(4)
    expect(r2.remaining).toBe(3)
  })
})

describe('authLimiter', () => {
  it('allows 5 attempts and blocks the 6th', () => {
    const ip = `192.168.1.${testKeyCounter++}`
    for (let i = 0; i < 5; i++) {
      expect(authLimiter(ip).success).toBe(true)
    }
    expect(authLimiter(ip).success).toBe(false)
  })
})

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for', () => {
    const req = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '203.0.113.1, 10.0.0.1' }
    })
    expect(getClientIp(req)).toBe('203.0.113.1')
  })

  it('falls back to x-real-ip', () => {
    const req = new Request('http://localhost', {
      headers: { 'x-real-ip': '203.0.113.2' }
    })
    expect(getClientIp(req)).toBe('203.0.113.2')
  })

  it('returns unknown when no IP header', () => {
    const req = new Request('http://localhost')
    expect(getClientIp(req)).toBe('unknown')
  })
})
