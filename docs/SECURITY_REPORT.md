# SECURITY REPORT — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Auditor:** Principal Software Architect · Claude Sonnet 4.6  
**Metodología:** Análisis estático de 37 archivos de código fuente

---

## SCORE DE SEGURIDAD: **48/100** — CRÍTICO

| Dominio de Seguridad           | Score  | Estado   |
|--------------------------------|--------|----------|
| Autenticación / JWT            | 55/100 | 🟠 Medio |
| Almacenamiento de tokens       | 10/100 | 🔴 Crítico |
| Autorización / RBAC            | 70/100 | 🟡 Bueno |
| Protección de rutas            | 20/100 | 🔴 Crítico |
| Seguridad de APIs              | 60/100 | 🟡 Aceptable |
| Gestión de secretos            | 75/100 | 🟡 Bueno |
| Validación de inputs           | 45/100 | 🟠 Mejorable |
| Rate Limiting / Brute Force    | 0/100  | 🔴 Crítico |
| CSRF Protection                | 30/100 | 🟠 Mejorable |
| Seguridad de Webhooks          | 85/100 | 🟢 Bueno |
| Logging / Auditoría            | 40/100 | 🟠 Mejorable |

---

## VULNERABILIDADES CRÍTICAS (P0 — Resolver antes de producción)

---

### SEC-01 · TOKEN JWT EN LOCALSTORAGE — XSS CRÍTICO
**Archivo:** `app/(auth)/login/page.tsx`  
**Severidad:** P0 — CRÍTICO  
**CVSS estimado:** 8.8 (High)

**Código vulnerable detectado:**
```tsx
// app/(auth)/login/page.tsx — VULNERABLE
if (result.token) {
  localStorage.setItem('auth-token', result.token)
  localStorage.setItem('user', JSON.stringify(result.user))  // datos sensibles
  router.push('/dashboard')
}
```

**Por qué es crítico:**
- `localStorage` es accesible desde cualquier JavaScript en la página
- Un ataque XSS exitoso puede robar el token completo
- El objeto `user` puede contener datos sensibles (email, orgId, roles)
- No hay protección contra robo de sesión

**Situación actual con cookies:**
El servidor SÍ establece una cookie httpOnly en `app/api/auth/login/route.ts`:
```ts
response.cookies.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 60 * 60 * 24 * 7,
  path: '/'
})
```

**El problema:** El cliente ADEMÁS guarda en localStorage para poder leer el token en el cliente. Este patrón es inseguro.

**Solución correcta:**
```tsx
// app/(auth)/login/page.tsx — CORRECTO
if (result.user) {
  // NO guardar token en localStorage
  // La cookie httpOnly se establece automáticamente por el servidor
  // Solo guardar datos NO sensibles y NO el token
  router.push('/dashboard')
}

// Para saber si el usuario está autenticado en el cliente:
// Usar un estado del servidor o un endpoint /api/auth/me
```

---

### SEC-02 · AUSENCIA DE MIDDLEWARE DE PROTECCIÓN DE RUTAS
**Archivo:** `middleware.ts` — NO EXISTE  
**Severidad:** P0 — CRÍTICO

**Impacto:** Cualquier persona puede acceder a `/dashboard`, `/dashboard/billing`, `/dashboard/contacts` etc. sin autenticación. Aunque los layouts puedan tener checks, sin middleware en Edge estas rutas son vulnerables.

**Solución requerida:**
```ts
// middleware.ts (crear en raíz del proyecto)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger dashboard
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      // Token inválido o expirado
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth-token')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

---

### SEC-03 · SIN RATE LIMITING EN AUTH ENDPOINTS
**Archivos:** `app/api/auth/login/route.ts`, `app/api/v1/auth/login/route.ts`  
**Severidad:** P0 — Brute Force posible

**Impacto:** Sin límite de intentos, un atacante puede probar contraseñas indefinidamente.

**Solución con Upstash (Edge-compatible):**
```ts
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const loginRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 intentos por 15 minutos
  analytics: true,
})

// Uso en route handler:
const identifier = request.headers.get('x-forwarded-for') ?? 'anonymous'
const { success } = await loginRatelimit.limit(identifier)
if (!success) {
  return NextResponse.json(
    { error: 'Demasiados intentos. Espera 15 minutos.' },
    { status: 429 }
  )
}
```

---

### SEC-04 · FORGOT PASSWORD NO IMPLEMENTADO
**Archivo:** `app/api/v1/auth/forgot-password/route.ts`  
**Severidad:** P1 — Alta

**Código actual:**
```ts
// TODO: Send email with reset link
// For now, just return success (security: don't reveal if email exists)
return NextResponse.json({ message: 'If the email exists, a reset link will be sent.' })
```

**Impacto:** Los usuarios no pueden recuperar su cuenta. Cada "olvidé mi contraseña" requiere intervención manual.

**Solución:**
```ts
// Implementación con Resend + jose
import { Resend } from 'resend'
import { SignJWT } from 'jose'

const resend = new Resend(process.env.RESEND_API_KEY)

// 1. Generar reset token con expiración corta (1h)
const resetToken = await new SignJWT({ userId: user.id, purpose: 'password-reset' })
  .setProtectedHeader({ alg: 'HS256' })
  .setExpirationTime('1h')
  .sign(new TextEncoder().encode(process.env.JWT_SECRET))

// 2. Enviar email
await resend.emails.send({
  from: process.env.RESEND_FROM_EMAIL!,
  to: email,
  subject: 'Restablecer contraseña — Orthonoba',
  html: `<a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}">Restablecer</a>`
})
```

---

## VULNERABILIDADES ALTAS (P1 — Resolver en el siguiente sprint)

---

### SEC-05 · SIN VERIFICACIÓN DE EMAIL POST-REGISTRO
**Archivo:** `services/auth.ts`  
**Severidad:** P1 — Alta

**Impacto:**
- Cualquiera puede registrarse con email de otro
- No hay confirmación de identidad
- Permite cuentas spam/fake

**Solución:** Enviar email de verificación al registrarse. Marcar `emailVerified` en User model (agregar campo al schema).

---

### SEC-06 · REQUISITOS DE CONTRASEÑA DÉBILES
**Archivo:** `services/auth.ts`  
**Severidad:** P1 — Media-Alta

**Código actual:**
```ts
if (password.length < 8) {
  throw new Error('Password must be at least 8 characters')
}
```

**Problema:** 8 caracteres mínimo es insuficiente. Sin requisitos de complejidad.

**Solución:**
```ts
const passwordSchema = z.string()
  .min(12, 'Mínimo 12 caracteres')
  .regex(/[A-Z]/, 'Al menos una mayúscula')
  .regex(/[0-9]/, 'Al menos un número')
  .regex(/[^A-Za-z0-9]/, 'Al menos un símbolo')
```

---

### SEC-07 · COOKIES SECURE SOLO EN PRODUCCIÓN
**Archivo:** `app/api/auth/login/route.ts`  
**Severidad:** P1 — Media

**Código actual:**
```ts
response.cookies.set('auth-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // ← CORRECTO en producción
  sameSite: 'lax',
  ...
})
```

**Análisis:** El flag `secure` solo en producción es el patrón estándar correcto. Sin embargo, `sameSite: 'lax'` debería evaluarse para subir a `'strict'` si no hay flujos OAuth que lo requieran.

**Recomendación:** Cambiar a `sameSite: 'strict'` si no hay OAuth flows que requieran `'lax'`.

---

### SEC-08 · WHATSAPP WEBHOOK SIN MANEJO DE ERRORES VISIBLE
**Archivo:** `app/api/whatsapp/webhook/route.ts`  
**Severidad:** P1 — Media

**Código actual:**
```ts
processWhatsAppWebhook(body).catch(console.error) // Solo console.error
```

**Impacto:** Errores de procesamiento se pierden silenciosamente. En producción, esto oculta fallos del sistema.

**Solución:**
```ts
processWhatsAppWebhook(body).catch((error) => {
  // Enviar a Sentry
  console.error('[WhatsApp Webhook] Error:', error)
  // alertar si es crítico
})
```

---

## VULNERABILIDADES MEDIAS (P2 — Resolver en próximo sprint)

---

### SEC-09 · SIN PROTECCIÓN CSRF EXPLÍCITA
**Severidad:** P2 — Media  
**Análisis:** Las cookies usan `sameSite: 'lax'` lo cual proporciona protección básica contra CSRF para requests cross-origin. Sin embargo, `'strict'` sería más seguro.

**Estado actual:** Parcialmente protegido por SameSite=Lax. No hay CSRF tokens explícitos.

---

### SEC-10 · `ignoreBuildErrors: true` EN PRODUCCIÓN
**Archivo:** `next.config.ts`  
**Severidad:** P1 — Alta

**Impacto:** Errores TypeScript que podrían indicar vulnerabilidades de tipo se ignoran en build. Ej: un `any` que permite inyección de datos incorrectos pasa silenciosamente.

---

### SEC-11 · TOKENS EN HEADERS DE LOGS POTENCIALES
**Archivo:** `app/api/whatsapp/accounts/route.ts`  
**Severidad:** P2 — Media

**Código:**
```ts
const { phoneNumberId, wabaId, accessToken, displayName, webhookSecret } = body
```

**Riesgo:** Si hay logging de requests, `accessToken` de WhatsApp podría aparecer en logs. Nunca loggear el body completo de endpoints que reciben API keys.

---

## ASPECTOS DE SEGURIDAD CORRECTOS

| Aspecto | Implementación | Archivo |
|---------|---------------|---------|
| Hashing bcrypt 10 rounds | `bcrypt.hash(password, 10)` | `services/auth.ts` |
| Cookie httpOnly | `httpOnly: true` | `api/auth/login/route.ts` |
| JWT con jose (Edge) | `new SignJWT(...).sign(secret)` | `lib/auth-helpers.ts` |
| JWT expiración 7 días | `.setExpirationTime('7d')` | `lib/auth-helpers.ts` |
| Stripe webhook HMAC | `stripe.webhooks.constructEvent()` | `api/stripe/webhook/route.ts` |
| Stripe event idempotency | `billingEvent` deduplication | `services/billing.ts` |
| WhatsApp token verification | `hub.verify_token` check | `api/whatsapp/webhook/route.ts` |
| EMAIL normalización | `email.trim().toLowerCase()` | `services/auth.ts` |
| RBAC hierarchy (8 roles) | `ROLE_HIERARCHY` map | `lib/auth-helpers.ts` |
| OrgId isolation en queries | `where: { organizationId }` | `services/` layer |
| SSL en DB | `?sslmode=require` | `.env.example` |
| No secrets en git | `.env.local` en .gitignore | `.gitignore` |

---

## PLAN DE REMEDIACIÓN PRIORIZADO

### Sprint Seguridad (1–2 semanas) — ANTES DE PRODUCCIÓN

| Prioridad | Acción | Archivo(s) | Esfuerzo |
|-----------|--------|------------|---------|
| P0 | Eliminar localStorage token | `login/page.tsx` | 2h |
| P0 | Crear `middleware.ts` | Nuevo archivo | 4h |
| P0 | Rate limiting en auth | `lib/rate-limit.ts` + route handlers | 6h |
| P1 | Implementar forgot-password | `api/v1/auth/forgot-password/route.ts` | 8h |
| P1 | Email verification post-registro | `services/auth.ts` + nueva ruta | 8h |
| P1 | Reforzar validación passwords | `services/auth.ts` + zod schema | 2h |
| P1 | Eliminar `ignoreBuildErrors` | `next.config.ts` | 1h + resolver errores TS |
| P2 | SameSite: strict en cookies | `api/auth/login/route.ts` | 30min |
| P2 | Error monitoring WhatsApp | `api/whatsapp/webhook/route.ts` | 2h |
| P3 | Sentry integration | `@sentry/nextjs` | 4h |

**Total estimado:** ~37 horas / 1 sprint dedicado a seguridad

---

## CHECKLIST DE SEGURIDAD PRE-PRODUCCIÓN

- [ ] Token NO en localStorage
- [ ] `middleware.ts` protegiendo `/dashboard/*`
- [ ] Rate limiting en `/api/auth/login`
- [ ] Forgot-password implementado con email real
- [ ] Email verification activo
- [ ] `ignoreBuildErrors: false`
- [ ] `tsc --noEmit` pasa sin errores
- [ ] `sameSite: 'strict'` en cookies
- [ ] Sentry configurado para errores en producción
- [ ] Secrets rotados para producción (JWT_SECRET, keys)
- [ ] WhatsApp accessToken no se loggea
- [ ] Stripe en modo `live` (no `test`) en producción
- [ ] HTTPS forzado en Vercel
- [ ] Headers de seguridad en `next.config.ts` (X-Frame-Options, CSP)
