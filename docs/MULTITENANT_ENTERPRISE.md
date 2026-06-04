# MULTI-TENANT ENTERPRISE — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase B**

---

## SCORE MULTI-TENANT ACTUAL vs OBJETIVO

| Actual | Objetivo Fase B | Objetivo Completo |
|--------|-----------------|-------------------|
| 74/100 | 82/100 | **90/100** |

---

## ARQUITECTURA MULTI-TENANT IMPLEMENTADA

### Modelo de Tenancy
**Shared Database, Shared Schema** con aislamiento por `organizationId`.

```
Internet
  └─→ Vercel Edge (middleware.ts — JWT verification)
        └─→ Next.js App Router
              └─→ Route Handler → service(orgId) → Prisma(WHERE orgId)
                                                        └─→ Neon PostgreSQL
```

### Jerarquía de entidades

```
Organization (tenant root)
├── id, slug (único global), name, planTier
├── stripeCustomerId, settings (Json)
├── isActive, isSuspended
│
├─ OrganizationMember[] ──→ User
│  └── role: OWNER|ADMIN|MANAGER|SALES|SUPPORT|OPERATOR|VIEWER|MEMBER
│
├─ Workspace[]   ← sub-divisiones (agencias con múltiples clientes)
│  └── WorkspaceMember[]
│
├─ Subscription  ← Stripe sync
├─ AIAgent[]
├─ Conversation[] → ConversationMessage[]
├─ Automation[] → Workflow[] → WorkflowAction[]
├─ Contact[], Lead[]
├─ WhatsAppAccount[]
├─ AuditLog[]
└─ Paciente[], Caso[]   ← vertical dental
```

---

## ORGANIZACIONES — FLUJO COMPLETO

### Crear organización (ya implementado)
```
POST /api/auth/register
→ services/auth.ts → registerUser()
→ prisma.$transaction([
    createUser(),
    createOrganization({ slug: unique }),
    createOrganizationMember({ role: OWNER })
  ])
```

### Actualizar organización (ya implementado)
```
PATCH /api/organizations/current
→ Validar con updateOrganizationSchema (Zod — lib/validations.ts)
→ Update settings, industry, logoUrl, timezone, locale
```

---

## MEMBERS — SISTEMA DE INVITACIÓN (PENDIENTE IMPLEMENTAR)

### Schema de datos (ya existe en Prisma)
```prisma
model OrganizationMember {
  id             String
  organizationId String
  userId         String
  role           OrgRole
  joinedAt       DateTime
}
```

### APIs a crear

```
POST /api/organizations/invite
  Body: { email, role }
  → Generar invitación con token (expires 7 días)
  → Enviar email vía Resend
  → Crear InviteToken record

GET  /api/organizations/invites
  → Listar invitaciones pendientes

DELETE /api/organizations/invites/[id]
  → Revocar invitación

GET  /api/organizations/invite/accept?token=xxx
  → Verificar token
  → Crear User + OrganizationMember
  → Redirect a /dashboard/onboarding

PATCH /api/organizations/members/[id]
  → Cambiar rol del miembro

DELETE /api/organizations/members/[id]
  → Expulsar miembro (solo OWNER/ADMIN)
```

---

## TEAMS (WORKSPACES) — ARQUITECTURA

### Uso del modelo Workspace
```
Workspace = equipo/cliente dentro de una organización
Ej: Agencia Digital tiene → [Cliente A], [Cliente B], [Equipo SEO]
```

### APIs a crear
```
GET    /api/workspaces               → listar workspaces de la org
POST   /api/workspaces               → crear workspace
PATCH  /api/workspaces/[id]          → actualizar
DELETE /api/workspaces/[id]          → eliminar
POST   /api/workspaces/[id]/members  → añadir miembro al workspace
DELETE /api/workspaces/[id]/members/[userId] → quitar
```

---

## ROLES Y PERMISOS — MATRIZ COMPLETA

### Jerarquía RBAC (implementada en auth-helpers.ts)

| Rol | Nivel | Billing | Config | Agents | CRM | Conversations | Analytics |
|-----|-------|---------|--------|--------|-----|--------------|-----------|
| OWNER | 100 | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| ADMIN | 80 | ✅ View | ✅ Full | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| MANAGER | 60 | ❌ | ✅ Partial | ✅ Full | ✅ Full | ✅ Full | ✅ Full |
| SALES | 40 | ❌ | ❌ | ✅ View | ✅ Full | ✅ Own | ✅ Own |
| SUPPORT | 35 | ❌ | ❌ | ✅ View | ✅ View | ✅ Full | ✅ Own |
| OPERATOR | 30 | ❌ | ❌ | ✅ Use | ❌ | ✅ Own | ❌ |
| MEMBER | 20 | ❌ | ❌ | ✅ Use | ✅ View | ✅ Own | ❌ |
| VIEWER | 10 | ❌ | ❌ | ✅ View | ✅ View | ✅ View | ✅ View |

### Implementación de guards (patrón existente)
```ts
// En route handlers privados:
const auth = await getAuthContext(token)
if (!requireRole('MANAGER', auth.role)) {
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}
```

---

## AUDIT LOGS — ACTIVAR MODELO EXISTENTE

### El modelo `AuditLog` existe en Prisma pero no se usa. Activarlo:

```ts
// lib/audit.ts (crear)
import { prisma } from './prisma'

type AuditAction =
  | 'USER_LOGIN' | 'USER_LOGOUT' | 'USER_REGISTER'
  | 'AGENT_CREATED' | 'AGENT_UPDATED' | 'AGENT_DELETED'
  | 'CONTACT_CREATED' | 'LEAD_UPDATED'
  | 'SUBSCRIPTION_CHANGED' | 'MEMBER_INVITED' | 'MEMBER_REMOVED'
  | 'SETTINGS_UPDATED' | 'WHATSAPP_CONNECTED'

export async function audit(
  orgId: string,
  userId: string,
  action: AuditAction,
  metadata?: Record<string, unknown>
) {
  await prisma.auditLog.create({
    data: { organizationId: orgId, userId, action, metadata: metadata ?? {} }
  })
}

// Uso en services:
// await audit(auth.orgId, auth.userId, 'AGENT_CREATED', { agentId: agent.id })
```

---

## FEATURE FLAGS POR PLAN (PENDIENTE IMPLEMENTAR)

### Límites por plan (ya definidos en lib/stripe.ts)

```ts
// lib/feature-flags.ts (crear)
import { prisma } from './prisma'
import { PLAN_LIMITS } from './stripe'

export async function checkFeatureLimit(
  orgId: string,
  feature: 'agents' | 'conversations' | 'contacts' | 'automations' | 'whatsappMessages'
): Promise<{ allowed: boolean; current: number; limit: number }> {
  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    select: { planTier: true }
  })

  const limits = PLAN_LIMITS[org!.planTier]

  const countMap = {
    agents: () => prisma.aIAgent.count({ where: { organizationId: orgId } }),
    contacts: () => prisma.contact.count({ where: { organizationId: orgId } }),
    automations: () => prisma.automation.count({ where: { organizationId: orgId } }),
    conversations: async () => 0, // contar del período actual
    whatsappMessages: async () => 0,
  }

  const current = await countMap[feature]()
  const limit = limits[`max${feature.charAt(0).toUpperCase() + feature.slice(1)}` as keyof typeof limits] as number

  return { allowed: current < limit, current, limit }
}
```

### Usar en API routes
```ts
// app/api/agents/route.ts — POST handler
const check = await checkFeatureLimit(auth.orgId, 'agents')
if (!check.allowed) {
  return NextResponse.json({
    error: `Límite de agentes alcanzado (${check.current}/${check.limit})`,
    upgradeUrl: '/dashboard/billing'
  }, { status: 402 })
}
```

---

## TENANT SETTINGS — SCHEMA ACTUAL

```prisma
// Organization.settings es un campo Json con estructura:
{
  industry?: string,
  website?: string,
  phone?: string,
  locale?: string,
  timezone?: string,
  // Future:
  brandColor?: string,
  customDomain?: string,
  ssoEnabled?: boolean,
  ipWhitelist?: string[],
  dataRetentionDays?: number
}
```

### API ya implementada
```
PATCH /api/organizations/current
→ Acepta industry, website, phone, logoUrl
→ Validación con Zod: updateOrganizationSchema
```

---

## USAGE LIMITS — TRACKING REAL (PENDIENTE)

### Modelo UsageRecord (ya existe en Prisma)
```prisma
model UsageRecord {
  metric    UsageMetric  // AGENTS|CONVERSATIONS|MESSAGES|API_CALLS|STORAGE_GB|...
  quantity  Int
  orgId     String
  periodStart DateTime
  periodEnd   DateTime
}
```

### Implementar tracking mensual
```ts
// Llamar al final de cada período de facturación (via webhook Stripe):
async function recordMonthlyUsage(orgId: string) {
  const [agents, conversations, contacts] = await Promise.all([
    prisma.aIAgent.count({ where: { organizationId: orgId } }),
    prisma.conversation.count({ where: { organizationId: orgId,
      createdAt: { gte: startOfMonth, lte: endOfMonth } } }),
    prisma.contact.count({ where: { organizationId: orgId } }),
  ])
  // Crear UsageRecord para cada métrica
}
```

---

## SUBSCRIPTION ENTITLEMENTS

### Plan STARTER — €97/mes
```
maxAgents:       3
maxConversations: 1,000/mes
maxContacts:     5,000
maxAutomations:  5
maxWhatsAppMsgs: 500/día
maxApiCalls:     10,000/mes
maxStorageGb:    10
trialDays:       14
```

### Plan PROFESSIONAL — €297/mes
```
maxAgents:       10
maxConversations: 5,000/mes
maxContacts:     25,000
maxAutomations:  25
maxWhatsAppMsgs: 2,500/día
maxApiCalls:     100,000/mes
maxStorageGb:    100
```

### Plan BUSINESS — €697/mes
```
maxAgents:       25
maxConversations: 25,000/mes
maxContacts:     100,000
maxAutomations:  100
maxWhatsAppMsgs: 10,000/día
maxApiCalls:     500,000/mes
maxStorageGb:    1,000
```

---

## VERTICALES INDUSTRIALES — CONFIGURACIONES

### Arquitectura de verticales
El campo `Organization.settings.industry` determina qué módulos y configuraciones se exponen:

| Industria | Módulos adicionales | Configuraciones especiales |
|-----------|--------------------|-----------------------------|
| `dental_practice` | Pacientes, Casos, Archivos STL/OBJ, Visor 3D | workflow dental, formatos CAD |
| `medical_clinic` | Historia clínica, GDPR estricto | consentimiento RGPD |
| `legal_firm` | Casos jurídicos, documentos, deadlines | confidencialidad |
| `real_estate` | Propiedades, visitas, contratos | portal cliente |
| `hospitality` | Reservas, check-in/out, servicios | integración PMS |
| `financial_services` | Cartera clientes, compliance | KYC/AML flows |

### Módulo dental (ya implementado en Prisma)
```prisma
Paciente → Caso → Archivo
  Caso incluye: tipo de trabajo, estado, asignación a laboratorio
  Archivo: STL, OBJ, DICOM, JPG, PNG
```

### Extensión para otras verticales
```ts
// Patrón: cada vertical tiene su propio sub-módulo en services/
services/
  auth.ts         ← core (existente)
  billing.ts      ← core (existente)
  agents.ts       ← core (existente)
  whatsapp.ts     ← core (existente)
  dental/         ← vertical (parcialmente existente)
    patients.ts
    cases.ts
  healthcare/     ← vertical (futuro)
  legal/          ← vertical (futuro)
  real-estate/    ← vertical (futuro)
```

---

## ROW LEVEL SECURITY (RLS) — IMPLEMENTACIÓN NEON

Para máxima seguridad multi-tenant, implementar RLS en PostgreSQL:

```sql
-- Ejecutar en Neon Console o migration:
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lead" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Conversation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AIAgent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Automation" ENABLE ROW LEVEL SECURITY;

-- Política: aislamiento completo por organización
CREATE POLICY org_isolation ON "Contact"
  FOR ALL
  USING ("organizationId" = current_setting('app.org_id', true)::uuid);

-- En Prisma, antes de cada query:
await prisma.$executeRaw`SELECT set_config('app.org_id', ${orgId}, true)`
```

**Nota:** RLS es una capa adicional de defensa. Las queries deben seguir incluyendo `WHERE organizationId = orgId` aunque RLS esté activo.

---

## CHECKLIST MULTI-TENANT

### Implementado ✅
- [x] Organization model con plan tier
- [x] OrganizationMember con 8 roles
- [x] RBAC hierarchy (auth-helpers.ts)
- [x] Auto-org al registrar (OWNER role)
- [x] Stripe plan sync
- [x] JWT con orgId en payload
- [x] Middleware inyecta x-org-id en headers
- [x] Plan limits definidos (lib/stripe.ts)
- [x] Zod schemas para org update

### Pendiente ⏳ (para Multi-Tenant Score > 90)
- [ ] Invitation system (API + email)
- [ ] Feature flags activos en endpoints
- [ ] Usage tracking real
- [ ] Audit logs activados
- [ ] RLS en Neon
- [ ] Workspace management UI
- [ ] Tenant-specific settings UI
- [ ] Industry-specific module routing
