import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  registerSchema,
  createAgentSchema,
  createContactSchema,
  paginationSchema,
  contactFormSchema,
} from '@/lib/validations'

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'password123' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = loginSchema.safeParse({ email: 'not-an-email', password: 'password123' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.email).toBeDefined()
  })

  it('rejects short password', () => {
    const result = loginSchema.safeParse({ email: 'user@example.com', password: 'short' })
    expect(result.success).toBe(false)
    expect(result.error?.flatten().fieldErrors.password).toBeDefined()
  })

  it('rejects missing fields', () => {
    const result = loginSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('rejects password over 128 chars', () => {
    const result = loginSchema.safeParse({ email: 'a@b.com', password: 'a'.repeat(129) })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  const valid = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'SecurePass1',
    organizationName: 'Test Org',
  }

  it('accepts valid registration data', () => {
    expect(registerSchema.safeParse(valid).success).toBe(true)
  })

  it('requires uppercase in password', () => {
    const result = registerSchema.safeParse({ ...valid, password: 'lowercase123' })
    expect(result.success).toBe(false)
  })

  it('requires number in password', () => {
    const result = registerSchema.safeParse({ ...valid, password: 'NoNumbers!' })
    expect(result.success).toBe(false)
  })

  it('normalizes email to lowercase', () => {
    const result = registerSchema.safeParse({ ...valid, email: 'TEST@EXAMPLE.COM' })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.email).toBe('test@example.com')
  })
})

describe('createAgentSchema', () => {
  const valid = { name: 'My Agent', type: 'CHAT' as const }

  it('accepts minimal agent data', () => {
    expect(createAgentSchema.safeParse(valid).success).toBe(true)
  })

  it('defaults model to claude-sonnet-4-6', () => {
    const result = createAgentSchema.safeParse(valid)
    if (result.success) expect(result.data.model).toBe('claude-sonnet-4-6')
  })

  it('rejects invalid agent type', () => {
    const result = createAgentSchema.safeParse({ name: 'x', type: 'INVALID' })
    expect(result.success).toBe(false)
  })

  it('rejects temperature out of range', () => {
    const result = createAgentSchema.safeParse({ ...valid, temperature: 3 })
    expect(result.success).toBe(false)
  })
})

describe('createContactSchema', () => {
  it('requires firstName', () => {
    const result = createContactSchema.safeParse({ lastName: 'Smith' })
    expect(result.success).toBe(false)
  })

  it('accepts valid contact', () => {
    expect(createContactSchema.safeParse({
      firstName: 'John', email: 'john@test.com'
    }).success).toBe(true)
  })

  it('validates email format', () => {
    const result = createContactSchema.safeParse({ firstName: 'John', email: 'bad-email' })
    expect(result.success).toBe(false)
  })
})

describe('paginationSchema', () => {
  it('defaults page to 1 and limit to 25', () => {
    const result = paginationSchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(1)
      expect(result.data.limit).toBe(25)
    }
  })

  it('coerces string numbers', () => {
    const result = paginationSchema.safeParse({ page: '2', limit: '50' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(2)
      expect(result.data.limit).toBe(50)
    }
  })

  it('rejects limit over 100', () => {
    expect(paginationSchema.safeParse({ limit: 101 }).success).toBe(false)
  })
})

describe('contactFormSchema', () => {
  it('requires message of at least 10 chars', () => {
    const result = contactFormSchema.safeParse({
      name: 'Test', email: 'a@b.com', message: 'short'
    })
    expect(result.success).toBe(false)
  })

  it('accepts valid form submission', () => {
    expect(contactFormSchema.safeParse({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a valid message with enough characters',
    }).success).toBe(true)
  })
})
