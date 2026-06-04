import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock environment variables for all tests
process.env.DATABASE_URL = 'postgresql://test:test@localhost/test'
process.env.JWT_SECRET = 'test-secret-at-least-32-characters-long-for-tests'
process.env.STRIPE_SECRET_KEY = 'sk_test_mock_key_for_testing_only'
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_mock_secret'
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000'
process.env.NODE_ENV = 'test'

// Mock Prisma to avoid real DB connections in unit tests
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    organization: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    organizationMember: {
      create: vi.fn(),
      findFirst: vi.fn(),
    },
    aIAgent: {
      findMany: vi.fn(),
      create: vi.fn(),
      count: vi.fn(),
    },
    contact: { findMany: vi.fn(), create: vi.fn(), count: vi.fn() },
    lead: { findMany: vi.fn(), create: vi.fn(), count: vi.fn() },
    billingEvent: { findUnique: vi.fn(), create: vi.fn() },
    $transaction: vi.fn(),
    $queryRaw: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
  },
}))

// Mock Stripe
vi.mock('@/lib/stripe', () => ({
  stripe: {
    customers: { create: vi.fn(), retrieve: vi.fn() },
    checkout: { sessions: { create: vi.fn() } },
    billingPortal: { sessions: { create: vi.fn() } },
    webhooks: { constructEvent: vi.fn() },
    subscriptions: { retrieve: vi.fn() },
  },
  PLAN_LIMITS: {
    FREE: { maxAgents: 1, maxConversations: 100, maxContacts: 500 },
    STARTER: { maxAgents: 3, maxConversations: 1000, maxContacts: 5000 },
    PROFESSIONAL: { maxAgents: 10, maxConversations: 5000, maxContacts: 25000 },
    BUSINESS: { maxAgents: 25, maxConversations: 25000, maxContacts: 100000 },
    ENTERPRISE: { maxAgents: Infinity, maxConversations: Infinity, maxContacts: Infinity },
  },
}))

// Clear all mocks before each test
beforeEach(() => {
  vi.clearAllMocks()
})
