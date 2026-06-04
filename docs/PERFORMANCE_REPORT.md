# PERFORMANCE REPORT — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Auditor:** Principal Software Architect · Claude Sonnet 4.6  
**Basado en:** Análisis estático de código fuente (no profiling en vivo)

---

## SCORE DE RENDIMIENTO: **66/100**

| Área                        | Score  | Estado      |
|-----------------------------|--------|-------------|
| Server Components           | 82/100 | 🟢 Bueno    |
| Data Fetching               | 30/100 | 🔴 Crítico  |
| Bundle Size                 | 65/100 | 🟡 Aceptable |
| Database Queries            | 70/100 | 🟡 Bueno    |
| Caching Strategy            | 20/100 | 🔴 Crítico  |
| Image Optimization          | 40/100 | 🟠 Mejorable |
| CSS/Fonts                   | 85/100 | 🟢 Bueno    |
| Edge Runtime                | 60/100 | 🟡 Aceptable |
| Core Web Vitals (estimado)  | 70/100 | 🟡 Aceptable |

---

## ANÁLISIS POR ÁREA

### 1. SERVER COMPONENTS — 82/100 ✅

**Estado:** Correctamente implementado como patrón base.

**Lo que funciona bien:**
- App Router con Server Components por defecto
- `"use client"` solo donde necesario (login page, componentes interactivos)
- Layout de dashboard como Server Component
- `app/[locale]/layout.tsx` con `NextIntlClientProvider` correctamente delimitado

**Oportunidades:**
- `app/dashboard/layout.tsx` podría prefetch datos del usuario en el servidor
- Los layouts de dashboard deberían cargar org/user data server-side para evitar waterfall

```tsx
// PATRÓN RECOMENDADO para dashboard/layout.tsx
import { getAuthContext } from '@/lib/auth-helpers'
import { cookies } from 'next/headers'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const token = (await cookies()).get('auth-token')?.value
  const auth = token ? await getAuthContext(token) : null
  // Pasar auth context a los children via Context o props
}
```

---

### 2. DATA FETCHING — 30/100 🔴 CRÍTICO

**Problema principal:** El dashboard completo muestra placeholders (`"—"`) sin ninguna integración de datos reales.

**Código actual en `app/dashboard/page.tsx`:**
```tsx
const kpis = [
  { label: "AI Operations",  value: "—", trend: "0%", ... },
  { label: "Conversations",  value: "—", trend: "0%", ... },
  { label: "Lead Pipeline",  value: "—", trend: "0%", ... },
  { label: "Voice Center",   value: "—", trend: "0%", ... },
  { label: "Automations",    value: "—", trend: "0%", ... },
  { label: "Contacts",       value: "—", trend: "0%", ... },
]
```

**Impacto:** El dashboard principal es UI únicamente. No hay data fetching en ninguna de las 11 rutas del dashboard.

**Solución propuesta:**
```tsx
// app/dashboard/page.tsx — Patrón correcto
import { prisma } from '@/lib/prisma'
import { getAuthContext } from '@/lib/auth-helpers'

export default async function DashboardPage() {
  const auth = await getAuthContextFromCookies()

  const [conversationCount, leadCount, contactCount] = await Promise.all([
    prisma.conversation.count({ where: { organizationId: auth.orgId } }),
    prisma.lead.count({ where: { organizationId: auth.orgId } }),
    prisma.contact.count({ where: { organizationId: auth.orgId } }),
  ])

  return <DashboardView conversations={conversationCount} leads={leadCount} contacts={contactCount} />
}
```

**Patrón óptimo para múltiples queries:** `Promise.all()` para paralelizar, evitar waterfalls.

---

### 3. BUNDLE SIZE — 65/100

**Dependencias que impactan el bundle:**

| Paquete | Tamaño estimado | Tree-shakeable | Notas |
|---------|-----------------|----------------|-------|
| `recharts` | ~300KB | Parcial | Solo importar componentes usados |
| `lucide-react` | ~70KB | Sí | Named imports → correcto |
| `@heroicons/react` | ~60KB | Sí | Verificar si se usa |
| `@radix-ui/*` (6 paquetes) | ~150KB total | Sí | Ver duplicación |
| `next-intl` | ~50KB | Sí | |
| `jose` | ~25KB | Sí | |

**Recomendaciones:**
```tsx
// ✅ CORRECTO — tree-shaking funciona
import { ChevronRight } from 'lucide-react'

// ❌ EVITAR — importa todo
import * as Icons from 'lucide-react'

// ✅ CORRECTO para recharts
import { BarChart, Bar, XAxis, YAxis } from 'recharts'

// ❌ EVITAR
import Recharts from 'recharts'
```

**Bundle analysis:**
```bash
# Instalar y usar para analizar bundle
npm install --save-dev @next/bundle-analyzer
ANALYZE=true npm run build
```

---

### 4. DATABASE QUERIES — 70/100

**Lo que funciona bien:**
- Prisma Singleton correcto (evita conexiones múltiples en dev)
- Pool max 5 conexiones para serverless (optimizado para Neon)
- Queries con `organizationId` como filtro (index natural)
- Idempotencia de eventos Stripe implementada

**Problemas detectados:**

#### N+1 Query Risk
Los servicios actuales no tienen `include` con límites. Al listar contactos con leads, podría haber N+1:
```ts
// RIESGO en services/
// Si se hace un getAll y luego se accede a relaciones:
const contacts = await prisma.contact.findMany({ where: { orgId } })
// Y luego contacts.map(c => c.lead) — esto causa N+1

// CORRECTO: incluir relaciones en la query
const contacts = await prisma.contact.findMany({
  where: { organizationId: orgId },
  include: { lead: true },
  take: 50, // paginación obligatoria
})
```

#### Falta de paginación
Ninguna de las queries de lista tiene paginación implementada. Con datos reales, `findMany()` sin `take`/`skip` es un riesgo.

```ts
// Agregar a todas las queries de lista:
const PAGE_SIZE = 25

async function listContacts(orgId: string, page = 1) {
  return prisma.contact.findMany({
    where: { organizationId: orgId },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    orderBy: { createdAt: 'desc' },
  })
}
```

---

### 5. CACHING STRATEGY — 20/100 🔴 CRÍTICO

**Estado:** Sin estrategia de caché implementada.

**Lo que falta:**

#### ISR para páginas de marketing
```tsx
// app/[locale]/page.tsx — Agregar revalidación
export const revalidate = 3600 // revalidar cada hora

// O con on-demand revalidation:
export const dynamic = 'force-static' // para páginas completamente estáticas
```

#### Cache de queries frecuentes con `unstable_cache`
```tsx
import { unstable_cache } from 'next/cache'

const getCachedOrgData = unstable_cache(
  async (orgId: string) => {
    return prisma.organization.findUnique({ where: { id: orgId } })
  },
  ['org-data'],
  { revalidate: 300, tags: ['organization'] } // 5 minutos
)
```

#### React `cache()` para deduplicar requests en RSC
```tsx
import { cache } from 'react'

export const getCurrentUser = cache(async (token: string) => {
  const auth = await verifyToken(token)
  return prisma.user.findUnique({ where: { id: auth.userId } })
})
// Múltiples Server Components que llamen a getCurrentUser() en el mismo request
// solo ejecutarán la query UNA vez
```

---

### 6. IMAGE OPTIMIZATION — 40/100

**Problema:** En los 37 archivos auditados no se detectó uso de `next/image`.

**Impacto en Core Web Vitals:**
- LCP alto si hay imágenes hero sin optimización
- Sin lazy loading automático
- Sin WebP/AVIF conversion automática

**Solución:**
```tsx
// ANTES (img HTML puro)
<img src="/hero-image.jpg" alt="Hero" width="1200" height="600" />

// DESPUÉS (next/image)
import Image from 'next/image'
<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // Para LCP images above the fold
  placeholder="blur"
/>
```

**Instalar sharp para optimización en producción:**
```bash
npm install sharp
```

---

### 7. CSS Y FONTS — 85/100 ✅

**Lo que funciona bien:**
- Inter font via `next/font` con variable CSS — zero layout shift
- Tailwind v4 — CSS purging automático, solo incluye clases usadas
- CSS tokens bien organizados en `styles/` folder
- `@custom-variant dark` para dark mode eficiente
- Animaciones via CSS keyframes (sin JS overhead)

**Minor improvement:**
```tsx
// app/[locale]/layout.tsx — ya implementado correctamente
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Verificar que este flag esté presente
})
```

---

### 8. EDGE RUNTIME — 60/100

**Estado:** Parcialmente preparado para Edge.

**Lo que usa Edge-compatible tech:**
- `jose` para JWT (Web Crypto API, no Node.js crypto)
- `lib/auth-edge.ts` existe como helper para Edge
- Cookie verification puede correr en Edge

**Lo que NO puede correr en Edge:**
- `prisma` — Prisma requiere Node.js runtime (TCP connections)
- `bcrypt` — requiere Node.js
- `stripe` — requiere Node.js

**Patrón correcto: middleware Edge + API en Node.js:**
```ts
// middleware.ts (Edge Runtime) — solo JWT verification
// app/api/auth/login (Node.js Runtime) — bcrypt + prisma
```

---

## ESTIMACIÓN CORE WEB VITALS (sin profiling real)

| Métrica | Estimado | Target | Gap |
|---------|---------|--------|-----|
| LCP     | ~2.5s   | <2.5s  | En límite — depende de imágenes hero |
| CLS     | ~0.05   | <0.1   | Bueno — fonts con `display: swap` |
| INP     | ~150ms  | <200ms | Aceptable — JS mínimo en marketing |
| FCP     | ~1.2s   | <1.8s  | Bueno — Server Components |
| TTFB    | ~200ms  | <600ms | Excelente — Vercel Edge + Neon |

---

## PLAN DE OPTIMIZACIÓN PRIORIZADO

### Sprint Performance (integrado en Fase 4)

| Prioridad | Acción | Impacto | Esfuerzo |
|-----------|--------|---------|---------|
| P0 | Conectar datos reales en dashboard | UX crítica | Alto |
| P0 | Paginación en todas las queries de lista | Escalabilidad | Medio |
| P1 | ISR en páginas marketing (`revalidate: 3600`) | SEO + velocidad | Bajo |
| P1 | `Promise.all()` para queries paralelas | Latencia | Medio |
| P1 | `React.cache()` para deduplicar RSC queries | DB load | Bajo |
| P2 | `next/image` en todos los assets | LCP | Medio |
| P2 | `sharp` para optimización de imágenes | Bundle + LCP | Bajo |
| P2 | Bundle analyzer + tree-shaking audit | Bundle size | Bajo |
| P3 | `unstable_cache` para queries frecuentes | DB load | Medio |
| P3 | Lighthouse CI en Vercel | Monitoring | Bajo |

---

## MÉTRICAS A MONITOREAR EN PRODUCCIÓN

```ts
// next.config.ts — agregar para analytics
const nextConfig = {
  experimental: {
    // instrumentationHook: true  // Para Sentry
  },
}

// Vercel Speed Insights (gratis en Vercel)
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
```
