# ENVIRONMENT REPORT — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Fuente:** `.env.example` + análisis del código fuente

---

## RESUMEN

| Categoría                   | Cantidad |
|-----------------------------|----------|
| Variables documentadas      | 13       |
| Variables faltantes críticas | 7       |
| Variables faltantes opcionales | 5     |
| Variables con riesgo de seguridad | 2   |

---

## VARIABLES DOCUMENTADAS EN `.env.example`

### Base de Datos
| Variable       | Requerida | Tipo     | Estado    | Notas                                      |
|----------------|-----------|----------|-----------|--------------------------------------------|
| `DATABASE_URL` | ✅ Sí      | Secret   | ✅ OK     | Neon Postgres. Incluir `?sslmode=require`  |

### Autenticación
| Variable     | Requerida | Tipo   | Estado    | Notas                                    |
|--------------|-----------|--------|-----------|------------------------------------------|
| `JWT_SECRET` | ✅ Sí      | Secret | ✅ OK     | Mínimo 32 caracteres. Rotar periódicamente |

### Stripe
| Variable                   | Requerida | Tipo   | Estado | Notas                                  |
|----------------------------|-----------|--------|--------|----------------------------------------|
| `STRIPE_SECRET_KEY`        | ✅ Sí      | Secret | ✅ OK  | `sk_live_*` producción / `sk_test_*` dev |
| `STRIPE_WEBHOOK_SECRET`    | ✅ Sí      | Secret | ✅ OK  | Obtenido del dashboard de Stripe        |
| `STRIPE_PRICE_STARTER`     | ✅ Sí      | Public | ✅ OK  | ID del precio en Stripe Dashboard       |
| `STRIPE_PRICE_PROFESSIONAL`| ✅ Sí      | Public | ✅ OK  |                                        |
| `STRIPE_PRICE_BUSINESS`    | ✅ Sí      | Public | ✅ OK  |                                        |
| `STRIPE_PRICE_ENTERPRISE`  | ✅ Sí      | Public | ✅ OK  |                                        |

### WhatsApp
| Variable                | Requerida | Tipo   | Estado | Notas                           |
|-------------------------|-----------|--------|--------|---------------------------------|
| `WHATSAPP_VERIFY_TOKEN` | ✅ Sí      | Secret | ✅ OK  | Token de verificación del webhook |

### App
| Variable                | Requerida | Tipo   | Estado | Notas                         |
|-------------------------|-----------|--------|--------|-------------------------------|
| `NEXT_PUBLIC_APP_URL`   | ✅ Sí      | Public | ✅ OK  | URL completa de la aplicación  |
| `NEXT_PUBLIC_APP_DOMAIN`| ✅ Sí      | Public | ✅ OK  | Dominio base                   |

### AI APIs
| Variable            | Requerida | Tipo   | Estado | Notas                      |
|---------------------|-----------|--------|--------|----------------------------|
| `ANTHROPIC_API_KEY` | ✅ Sí      | Secret | ✅ OK  | `sk-ant-api03-*`           |
| `OPENAI_API_KEY`    | 🟡 Opcional| Secret | ✅ OK  | `sk-proj-*`                |

---

## VARIABLES FALTANTES — CRÍTICAS

### 🔴 Falta: `NEXTAUTH_SECRET` o `NEXT_PUBLIC_APP_URL` para callbacks
Si en el futuro se integra NextAuth, se necesitará `NEXTAUTH_SECRET`. Por ahora no aplica, pero documentar.

---

### 🔴 Falta: `WHATSAPP_ACCESS_TOKEN`
El webhook de WhatsApp (`/api/whatsapp/webhook`) necesita un token de acceso para enviar mensajes.  
**Agregar a `.env.example`:**
```env
WHATSAPP_ACCESS_TOKEN="EAAxxxxx..."
WHATSAPP_PHONE_NUMBER_ID="1234567890"
WHATSAPP_BUSINESS_ACCOUNT_ID="0987654321"
```

---

### 🔴 Falta: `TWILIO_*` para Voice AI
El dashboard tiene `/dashboard/voice` y el schema tiene soporte para agentes de voz, pero no hay variables Twilio.  
**Agregar a `.env.example`:**
```env
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"
```

---

### 🔴 Falta: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
Para usar `@stripe/stripe-js` en el cliente, se necesita la clave publicable de Stripe.  
**Agregar a `.env.example`:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

---

### 🟠 Falta: Variables de email/SMTP
El flujo de forgot-password y notificaciones necesita un servicio de email.  
**Opciones recomendadas:**
```env
# Resend (recomendado para Next.js)
RESEND_API_KEY="re_xxxxxxx"
RESEND_FROM_EMAIL="noreply@orthonoba.com"

# O Sendgrid
# SENDGRID_API_KEY="SG.xxxxxxx"
```

---

### 🟠 Falta: `NODE_ENV`
Aunque Next.js la gestiona automáticamente, documentarla en `.env.example` es buena práctica.
```env
NODE_ENV="development"
```

---

### 🟠 Falta: Variables de rate limiting
Si se implementa rate limiting en los endpoints públicos:
```env
# Upstash Redis (para rate limiting en edge)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="xxxxx"
```

---

## VARIABLES FALTANTES — OPCIONALES

### Monitoring / Observabilidad
```env
# Sentry
SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"
NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"

# Vercel Analytics (si se usa)
# No requiere variable, se activa en vercel.json
```

### Feature Flags
```env
# Si se implementa LaunchDarkly u otro
LAUNCHDARKLY_SDK_KEY="sdk-xxxx"
```

### Almacenamiento de archivos (STL/DICOM)
El schema tiene modelo `Archivo` para subida de archivos 3D y médicos:
```env
# AWS S3 o Cloudflare R2
AWS_ACCESS_KEY_ID="xxxxx"
AWS_SECRET_ACCESS_KEY="xxxxx"
AWS_REGION="eu-west-1"
AWS_S3_BUCKET="orthonoba-files"

# O Cloudflare R2
CLOUDFLARE_R2_ENDPOINT="https://xxxxx.r2.cloudflarestorage.com"
CLOUDFLARE_R2_ACCESS_KEY_ID="xxxxx"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="xxxxx"
CLOUDFLARE_R2_BUCKET="orthonoba-files"
```

---

## ANÁLISIS DE SEGURIDAD

### ⚠️ `.env` Y `.env.local` coexisten
```
.env        ← Puede contener variables no-secret (URL, dominio)
.env.local  ← DEBE contener todos los secrets
```
**Recomendación:** Documentar qué va en cada archivo. Los secrets nunca en `.env`.

### ⚠️ `JWT_SECRET` — Requisitos de seguridad
- Longitud mínima: 32 caracteres
- Entropía recomendada: 256 bits
- Rotar cada 90 días en producción
- Usar diferente valor en dev/staging/prod

**Generar secret seguro:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### ✅ Stripe webhook correctamente separado
`STRIPE_WEBHOOK_SECRET` separado de `STRIPE_SECRET_KEY` es correcto.

---

## `.env.example` ACTUALIZADO RECOMENDADO

```env
# ── Database ──────────────────────────────────────────────────────────────────
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# ── Auth ──────────────────────────────────────────────────────────────────────
JWT_SECRET="your-32-char-minimum-secret-here-use-crypto-randomBytes"

# ── Stripe ────────────────────────────────────────────────────────────────────
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PROFESSIONAL="price_..."
STRIPE_PRICE_BUSINESS="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."

# ── WhatsApp Cloud API ─────────────────────────────────────────────────────────
WHATSAPP_VERIFY_TOKEN="your-random-verify-token"
WHATSAPP_ACCESS_TOKEN="EAAxxxxx..."
WHATSAPP_PHONE_NUMBER_ID="1234567890"
WHATSAPP_BUSINESS_ACCOUNT_ID="0987654321"

# ── Twilio (Voice AI) ─────────────────────────────────────────────────────────
TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
TWILIO_AUTH_TOKEN="your_auth_token"
TWILIO_PHONE_NUMBER="+1234567890"

# ── Email ────────────────────────────────────────────────────────────────────
RESEND_API_KEY="re_xxxxxxx"
RESEND_FROM_EMAIL="noreply@orthonoba.com"

# ── App ───────────────────────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL="https://app.orthonoba.com"
NEXT_PUBLIC_APP_DOMAIN="orthonoba.com"
NODE_ENV="production"

# ── AI APIs ───────────────────────────────────────────────────────────────────
ANTHROPIC_API_KEY="sk-ant-api03-..."
OPENAI_API_KEY="sk-proj-..."

# ── File Storage (STL/DICOM/OBJ) ─────────────────────────────────────────────
AWS_ACCESS_KEY_ID="xxxxx"
AWS_SECRET_ACCESS_KEY="xxxxx"
AWS_REGION="eu-west-1"
AWS_S3_BUCKET="orthonoba-files"

# ── Observabilidad (opcional) ────────────────────────────────────────────────
# SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"
# NEXT_PUBLIC_SENTRY_DSN="https://xxxxx@sentry.io/xxxxx"
```

---

## VERIFICACIÓN DE VARIABLES EN `lib/env.ts`

El archivo `lib/env.ts` valida variables de entorno al arranque. Verificar que incluya:
- `DATABASE_URL` — obligatoria
- `JWT_SECRET` — obligatoria, validar longitud mínima
- `STRIPE_SECRET_KEY` — obligatoria en producción
- `STRIPE_WEBHOOK_SECRET` — obligatoria en producción
- `NEXT_PUBLIC_APP_URL` — obligatoria

**Patrón recomendado con Zod:**
```ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  ANTHROPIC_API_KEY: z.string().startsWith('sk-ant-'),
})

export const env = envSchema.parse(process.env)
```
