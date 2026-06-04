import { z } from 'zod'

// ── Auth ──────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email requerido')
    .email('Email no válido')
    .max(255),
  password: z
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .max(128),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100).trim(),
  email: z.string().email('Email no válido').max(255).toLowerCase(),
  password: z
    .string()
    .min(12, 'Mínimo 12 caracteres')
    .max(128)
    .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
    .regex(/[a-z]/, 'Debe incluir al menos una minúscula')
    .regex(/[0-9]/, 'Debe incluir al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe incluir al menos un carácter especial'),
  organizationName: z.string().min(2, 'Mínimo 2 caracteres').max(100).trim(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email no válido').max(255),
})

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(12)
    .max(128)
    .regex(/[A-Z]/, 'Debe incluir al menos una mayúscula')
    .regex(/[a-z]/, 'Debe incluir al menos una minúscula')
    .regex(/[0-9]/, 'Debe incluir al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe incluir al menos un carácter especial'),
})

// ── Organizations ─────────────────────────────────────────────────────────────

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).trim().optional(),
  industry: z
    .enum([
      'digital_agency', 'medical_clinic', 'dental_practice', 'legal_firm',
      'real_estate', 'hospitality', 'financial_services', 'ecommerce',
      'education', 'logistics', 'manufacturing', 'retail', 'technology', 'other',
    ])
    .optional(),
  website: z.string().url('URL no válida').optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, 'Teléfono no válido')
    .optional(),
  logoUrl: z.string().url().optional(),
  timezone: z.string().max(50).optional(),
  locale: z.enum(['it', 'de', 'fr', 'en', 'es']).optional(),
})

// ── Agents ────────────────────────────────────────────────────────────────────

export const createAgentSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres').max(100).trim(),
  type: z.enum([
    'CHAT', 'WHATSAPP', 'VOICE', 'LEAD_QUALIFIER',
    'APPOINTMENT', 'CRM', 'EMAIL', 'CUSTOM',
  ]),
  systemPrompt: z.string().max(4000).optional(),
  model: z
    .enum([
      'claude-sonnet-4-6',
      'claude-opus-4-8',
      'claude-haiku-4-5-20251001',
      'gpt-4o',
      'gpt-4o-mini',
    ])
    .default('claude-sonnet-4-6'),
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().int().min(256).max(8192).default(1024),
  channels: z
    .array(z.enum(['CHAT', 'VOICE', 'WHATSAPP', 'EMAIL', 'SMS', 'PHONE']))
    .default([]),
})

export const updateAgentSchema = createAgentSchema.partial().extend({
  isActive: z.boolean().optional(),
})

// ── WhatsApp ──────────────────────────────────────────────────────────────────

export const createWhatsAppAccountSchema = z.object({
  phoneNumberId: z.string().min(1).max(50),
  wabaId: z.string().min(1).max(50),
  accessToken: z.string().min(10).max(500),
  displayName: z.string().max(100).optional(),
  webhookSecret: z.string().max(200).optional(),
})

// ── Contacts / CRM ────────────────────────────────────────────────────────────

export const createContactSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().max(100).trim().optional(),
  email: z.string().email().optional(),
  phone: z.string().max(30).optional(),
  company: z.string().max(200).optional(),
  jobTitle: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  notes: z.string().max(2000).optional(),
})

export const createLeadSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  description: z.string().max(2000).optional(),
  value: z.number().positive().optional(),
  currency: z.string().length(3).default('EUR'),
  contactId: z.string().uuid().optional(),
  status: z
    .enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST', 'CANCELLED'])
    .default('NEW'),
})

// ── Contact / Demo Forms (public) ─────────────────────────────────────────────

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255),
  message: z.string().min(10).max(2000).trim(),
  company: z.string().max(200).optional(),
  phone: z.string().max(30).optional(),
})

export const demoRequestSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255),
  company: z.string().min(1).max(200).trim(),
  industry: z.string().max(100).optional(),
  message: z.string().max(1000).optional(),
  phone: z.string().max(30).optional(),
})

// ── Pagination ────────────────────────────────────────────────────────────────

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  search: z.string().max(200).optional(),
})

// ── Helper: parse or throw 400 ────────────────────────────────────────────────

import { NextResponse } from 'next/server'

export function parseBody<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { data: T; error: null } | { data: null; error: NextResponse } {
  const result = schema.safeParse(data)
  if (!result.success) {
    return {
      data: null,
      error: NextResponse.json(
        {
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      ),
    }
  }
  return { data: result.data, error: null }
}

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateAgentInput = z.infer<typeof createAgentSchema>
export type CreateContactInput = z.infer<typeof createContactSchema>
export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type PaginationInput = z.infer<typeof paginationSchema>
