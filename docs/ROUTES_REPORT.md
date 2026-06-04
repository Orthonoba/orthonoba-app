# ROUTES REPORT — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Framework:** Next.js 16 App Router + next-intl 4.x

---

## ESTRUCTURA DE ROUTING

El proyecto usa **dos sistemas de routing en paralelo:**
1. **`app/(auth)/`** — Rutas de autenticación (sin locale)
2. **`app/[locale]/`** — Rutas públicas multi-idioma (it/de/fr/en)
3. **`app/dashboard/`** — Rutas privadas del dashboard (sin locale)
4. **`app/api/`** — API Routes (sin locale)

---

## RUTAS PÚBLICAS (MARKETING) — `/app/[locale]/`

| Ruta                          | Archivo                                      | Estado    |
|-------------------------------|----------------------------------------------|-----------|
| `/{locale}`                   | `app/[locale]/page.tsx`                      | ✅         |
| `/{locale}/about`             | `app/[locale]/about/page.tsx`                | ✅         |
| `/{locale}/ai-agents`         | `app/[locale]/ai-agents/page.tsx`            | ✅         |
| `/{locale}/automation`        | `app/[locale]/automation/page.tsx`           | ✅         |
| `/{locale}/blog`              | `app/[locale]/blog/page.tsx`                 | ✅         |
| `/{locale}/case-studies`      | `app/[locale]/case-studies/page.tsx`         | ✅         |
| `/{locale}/company`           | `app/[locale]/company/page.tsx`              | ✅         |
| `/{locale}/company/founder`   | `app/[locale]/company/founder/page.tsx`      | ✅         |
| `/{locale}/company/[slug]`    | `app/[locale]/company/[slug]/page.tsx`       | ✅         |
| `/{locale}/consultation`      | `app/[locale]/consultation/page.tsx`         | ✅         |
| `/{locale}/contact`           | `app/[locale]/contact/page.tsx`              | ✅         |
| `/{locale}/industries`        | `app/[locale]/industries/page.tsx`           | ✅         |
| `/{locale}/industries/[slug]` | `app/[locale]/industries/[slug]/page.tsx`    | ✅         |
| `/{locale}/marketing`         | `app/[locale]/marketing/page.tsx`            | ✅         |
| `/{locale}/partners`          | `app/[locale]/partners/page.tsx`             | ✅         |
| `/{locale}/platform`          | `app/[locale]/platform/page.tsx`             | ✅         |
| `/{locale}/portal`            | `app/[locale]/portal/page.tsx`               | ✅         |
| `/{locale}/portfolio`         | `app/[locale]/portfolio/page.tsx`            | ✅         |
| `/{locale}/pricing`           | `app/[locale]/pricing/page.tsx`              | ✅         |
| `/{locale}/products`          | `app/[locale]/products/page.tsx`             | ✅         |
| `/{locale}/products/ai-receptionist` | `app/[locale]/products/ai-receptionist/page.tsx` | ✅  |
| `/{locale}/resources`         | `app/[locale]/resources/page.tsx`            | ✅         |
| `/{locale}/resources/[slug]`  | `app/[locale]/resources/[slug]/page.tsx`     | ✅         |
| `/{locale}/services`          | `app/[locale]/services/page.tsx`             | ✅         |
| `/{locale}/services/[slug]`   | `app/[locale]/services/[slug]/page.tsx`      | ✅         |
| `/{locale}/solutions`         | `app/[locale]/solutions/page.tsx`            | ✅         |
| `/{locale}/solutions/[slug]`  | `app/[locale]/solutions/[slug]/page.tsx`     | ✅         |
| `/{locale}/web-development`   | `app/[locale]/web-development/page.tsx`      | ✅         |

**Locales disponibles:** `it` (default) · `de` · `fr` · `en`

---

## RUTAS DE AUTENTICACIÓN — `/app/(auth)/`

| Ruta               | Archivo                              | Protección | Estado |
|--------------------|--------------------------------------|------------|--------|
| `/login`           | `app/(auth)/login/page.tsx`          | Pública    | ✅     |
| `/register`        | `app/(auth)/register/page.tsx`       | Pública    | ✅     |
| `/forgot-password` | `app/(auth)/forgot-password/page.tsx`| Pública    | ✅     |

⚠️ **NOTA:** Las rutas auth no tienen prefijo de locale. Si el usuario navega desde `it/pricing` y hace clic en "Login", la URL cambia a `/login` sin locale. Esto puede romper el flujo de navegación multi-idioma.

---

## RUTAS PRIVADAS (DASHBOARD) — `/app/dashboard/`

| Ruta                             | Archivo                                     | Protección server-side | Estado  |
|----------------------------------|---------------------------------------------|------------------------|---------|
| `/dashboard`                     | `app/dashboard/page.tsx`                    | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/agents`              | `app/dashboard/agents/page.tsx`             | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/analytics`           | `app/dashboard/analytics/page.tsx`          | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/automations`         | `app/dashboard/automations/page.tsx`        | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/billing`             | `app/dashboard/billing/page.tsx`            | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/contacts`            | `app/dashboard/contacts/page.tsx`           | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/conversations`       | `app/dashboard/conversations/page.tsx`      | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/leads`               | `app/dashboard/leads/page.tsx`              | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/settings`            | `app/dashboard/settings/page.tsx`           | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/voice`               | `app/dashboard/voice/page.tsx`              | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/whatsapp`            | `app/dashboard/whatsapp/page.tsx`           | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/onboarding`          | `app/dashboard/onboarding/page.tsx`         | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/onboarding/organization` | `...organization/page.tsx`             | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/onboarding/agent`    | `...agent/page.tsx`                         | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/onboarding/plan`     | `...plan/page.tsx`                          | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/onboarding/whatsapp` | `...whatsapp/page.tsx`                      | ⚠️ Sin middleware      | 🟠      |
| `/dashboard/onboarding/complete` | `...complete/page.tsx`                      | ⚠️ Sin middleware      | 🟠      |

---

## API ROUTES — `/app/api/`

### Autenticación
| Endpoint                          | Método | Auth requerida | Estado  | Notas                         |
|-----------------------------------|--------|----------------|---------|-------------------------------|
| `/api/auth/login`                 | POST   | No             | ⚠️      | DUPLICADO con /api/v1/auth/login |
| `/api/auth/register`              | POST   | No             | ✅      |                               |
| `/api/v1/auth/login`              | POST   | No             | ✅      | Versión preferida             |
| `/api/v1/auth/forgot-password`    | POST   | No             | ✅      |                               |

### Plataforma
| Endpoint                          | Método   | Auth requerida | Estado |
|-----------------------------------|----------|----------------|--------|
| `/api/agents`                     | GET/POST | Sí             | ✅     |
| `/api/onboarding/status`          | GET      | Sí             | ✅     |
| `/api/organizations/current`      | GET      | Sí             | ✅     |
| `/api/pacientes`                  | GET/POST | Sí             | ✅     |

### Facturación
| Endpoint                  | Método | Auth requerida | Estado |
|---------------------------|--------|----------------|--------|
| `/api/stripe/checkout`    | POST   | Sí             | ✅     |
| `/api/stripe/portal`      | GET    | Sí             | ✅     |
| `/api/stripe/webhook`     | POST   | No (Stripe sig)| ✅     |

### Comunicaciones
| Endpoint                      | Método   | Auth requerida | Estado |
|-------------------------------|----------|----------------|--------|
| `/api/v1/contact`             | POST     | No             | ✅     |
| `/api/v1/demo-request`        | POST     | No             | ✅     |
| `/api/v1/courses`             | GET/POST | ?              | 🟡     |
| `/api/whatsapp/accounts`      | GET/POST | Sí             | ✅     |
| `/api/whatsapp/webhook`       | POST     | No (WA token)  | ✅     |

---

## RUTAS PROBLEMÁTICAS / ROTAS

### ❌ Ruta raíz `/` sin locale
La ruta raíz (`/`) no está definida en `app/page.tsx`. El usuario que visite la raíz podría recibir un 404.  
**Recomendación:** Crear `app/page.tsx` con redirección al locale default:
```tsx
// app/page.tsx
import { redirect } from 'next/navigation'
export default function RootPage() {
  redirect('/it') // locale default
}
```

---

### ⚠️ Carpeta `/dashboard/` en raíz del proyecto
Existe una carpeta `dashboard/` en la raíz (fuera de `app/`). Su contenido/propósito es ambiguo.  
Si contiene archivos `.tsx`/`.ts` relevantes para el routing, puede crear conflictos.

---

### ⚠️ Carpetas `tasks/` y `test/` generan rutas públicas
Si están dentro de `app/`, estas carpetas generan las rutas `/tasks` y `/test`.  
Si no son rutas intencionales, se deben mover fuera de `app/`.

---

### ⚠️ Rutas auth sin locale
Las rutas `/login`, `/register`, `/forgot-password` no siguen el patrón `/{locale}/auth/*`.  
Esto puede causar:
- Cambio de idioma al entrar/salir del login
- SEO incorrecta para páginas auth multi-idioma
- Inconsistencia en el `Link` de retorno post-login

---

## SITEMAP

**Archivo detectado:** `app/sitemap.ts`  
Verificar que incluya todas las rutas públicas con sus variantes de locale para un SEO correcto.

---

## RESUMEN DE RIESGOS

| Riesgo                                      | Severidad | Acción Recomendada                        |
|---------------------------------------------|-----------|-------------------------------------------|
| Dashboard sin protección middleware         | 🔴 Alta    | Crear `middleware.ts`                    |
| Ruta raíz `/` sin definir                  | 🟠 Media   | Crear `app/page.tsx` con redirect        |
| Endpoints auth duplicados                  | 🟠 Media   | Unificar en `/api/v1/auth/*`            |
| Rutas auth sin locale                       | 🟡 Baja    | Considerar migrar a `app/[locale]/(auth)/` |
| `tasks/` y `test/` como rutas públicas      | 🟡 Baja    | Mover fuera de `app/`                   |
