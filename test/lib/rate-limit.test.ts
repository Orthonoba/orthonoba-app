import { describe, it, expect } from 'vitest'
import { rateLimit, authLimiter, getClientIp } from '@/lib/rate-limit'

// Use unique keys per test to avoid state bleed
let counter = 0
const key = () => `test-${counter++}`

describe('rateLimit', () => {
  it('allows requests within the limit', async () => {
    const result = await rateLimit(key(), 3, 60)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('blocks after exceeding limit', async () => {
    const k = key()
    await rateLimit(k, 2, 60)
    await rateLimit(k, 2, 60)
    const result = await rateLimit(k, 2, 60)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
    expect(result.retryAfterSecs).toBeGreaterThan(0)
  })

  it('counts remaining correctly', async () => {
    const k = key()
    const r1 = await rateLimit(k, 5, 60)
    const r2 = await rateLimit(k, 5, 60)
    expect(r1.remaining).toBe(4)
    expect(r2.remaining).toBe(3)
  })
})

describe('authLimiter', () => {
  it('allows 5 attempts and blocks the 6th', async () => {
    const ip = `192.168.1.${counter++}`
    for (let i = 0; i < 5; i++) {
      expect((await authLimiter(ip)).success).toBe(true)
    }
    expect((await authLimiter(ip)).success).toBe(false)
  })
})

describe('getClientIp', () => {
  it('extracts IP from x-forwarded-for', () => {
    const req = new Request('http://localhost', {
      headers: { 'x-forwarded-for': '203.0.113.1, 10.0.0.1' },
    })
    expect(getClientIp(req)).toBe('203.0.113.1')
  })

  it('falls back to x-real-ip', () => {
    const req = new Request('http://localhost', {
      headers: { 'x-real-ip': '203.0.113.2' },
    })
    expect(getClientIp(req)).toBe('203.0.113.2')
  })

  it('returns unknown when no IP header', () => {
    const req = new Request('http://localhost')
    expect(getClientIp(req)).toBe('unknown')
  })
})
