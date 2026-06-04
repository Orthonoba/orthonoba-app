# AUDIT REPORT — ORTHONOBA.APP

**Fecha:** 2026-06-04  
**Proyecto:** Orthonoba (Dental SaaS / AI Agency)  
**Stack:** Next.js 15 · React 19 · TypeScript 6 · Tailwind v4 · Prisma 5 · PostgreSQL (Neon) · next-intl 4  
**Estado:** Solo lectura — ningún archivo modificado

---

## 1. RUTAS EXISTENTES

### Grupo `(auth)` — Autenticación (sin locale)

| Ruta | Archivo |
|------|---------|
| `/login` | `app/(auth)/login/page.tsx` |
| `/register` | `app/(auth)/register/page.tsx` |
| `/forgot-password` | `app/(auth)/forgot-password/page.tsx` |

Sin layout.tsx, loading.tsx ni error.tsx en este grupo.

---

### Grupo `[locale]` — Rutas públicas internacionalizadas (it / de / fr / en)

| Ruta | Archivo |
|------|---------|
| `/` | `app/[locale]/page.tsx` |
| `/about` | `app/[locale]/about/page.tsx` |
| `/ai-agents` | `app/[locale]/ai-agents/page.tsx` |
| `/automation` | `app/[locale]/automation/page.tsx` |
| `/blog` | `app/[locale]/blog/page.tsx` |
| `/case-studies` | `app/[locale]/case-studies/page.tsx` |
| `/contact` | `app/[locale]/contact/page.tsx` |
| `/consultation` | `app/[locale]/consultation/page.tsx` |
| `/marketing` | `app/[locale]/marketing/page.tsx` |
| `/pricing` | `app/[locale]/pricing/page.tsx` |
| `/portfolio` | `app/[locale]/portfolio/page.tsx` |
| `/portal` | `app/[locale]/portal/page.tsx` |
| `/resources` | `app/[locale]/resources/page.tsx` |
| `/resources/[slug]` | `app/[locale]/resources/[slug]/page.tsx` |
| `/services` | `app/[locale]/services/page.tsx` |
| `/services/[slug]` | `app/[locale]/services/[slug]/page.tsx` |
| `/solutions` | `app/[locale]/solutions/page.tsx` |
| `/solutions/[slug]` | `app/[locale]/solutions/[slug]/page.tsx` |
| `/web-development` | `app/[locale]/web-development/page.tsx` |
| `/company` | `app/[locale]/company/page.tsx` |
| `/company/founder` | `app/[locale]/company/founder/page.tsx` |
| `/company/[slug]` | `app/[locale]/company/[slug]/page.tsx` |
| `/industries` | `app/[locale]/industries/page.tsx` |
| `/industries/[slug]` | `app/[locale]/industries/[slug]/page.tsx` |

Archivos especiales presentes: `app/[locale]/layout.tsx`, `app/sitemap.ts`  
Archivos especiales **ausentes**: `error.tsx`, `loading.tsx`, `not-found.tsx` en cualquier nivel.

---

### Dashboard privado

| Ruta | Archivo |
|------|---------|
| `/dashboard` | `app/dashboard/page.tsx` |
| — | `app/dashboard/layout.tsx` |

---

### API Routes

| Endpoint | Archivo | Método |
|----------|---------|--------|
| `/api/auth/login` | `app/api/auth/login/route.ts` | POST |
| `/api/auth/register` | `app/api/auth/register/route.ts` | POST |
| `/api/pacientes` | `app/api/pacientes/route.ts` | POST |
| `/api/v1/auth/login` | `app/api/v1/auth/login/route.ts` | POST |
| `/api/v1/auth/forgot-password` | `app/api/v1/auth/forgot-password/route.ts` | POST |
| `/api/v1/contact` | `app/api/v1/contact/route.ts` | POST |
| `/api/v1/courses` | `app/api/v1/courses/route.ts` | ? |
| `/api/v1/demo-request` | `app/api/v1/demo-request/route.ts` | ? |

---

## 2. COMPONENTES EXISTENTES

### `components/layout/`

| Archivo | Tipo | Notas |
|---------|------|-------|
| `Header.tsx` | `"use client"` | Navegación principal + mega-menu |
| `Footer.tsx` | Server Component | Footer público |
| `MegaMenu.tsx` | `"use client"` | Menú desplegable con soluciones y empresa |

### `components/dashboard/`

| Archivo | Tipo | Notas |
|---------|------|-------|
| `Navbar.tsx` | `"use client"` | Navbar del dashboard, logout, click-outside |
| `PageHeader.tsx` | Server Component | Header de página interna |

### `components/sections/`

| Archivo | Tipo | Notas |
|---------|------|-------|
| `Hero.tsx` | Server Component | Sección hero con dot-grid |
| `Services.tsx` | Server Component | Listado de servicios |
| `Platform.tsx` | Server Component | Features de plataforma |
| `Industries.tsx` | Server Component | Showcase de industrias |
| `Founder.tsx` | Server Component | Historia del fundador |
| `CTA.tsx` | Server Component | Call-to-action |

### `components/ui/`

| Archivo | Tipo | Notas |
|---------|------|-------|
| `Button.tsx` | Server Component | Variantes: primary, secondary, ghost / sizes: sm, md, lg |
| `Card.tsx` | Server Component | Wrapper de tarjeta |
| `Container.tsx` | Server Component | max-w-7xl con padding responsive |

### Nivel raíz de `components/`

| Archivo | Tipo | Notas |
|---------|------|-------|
| `Siderbar.tsx` | `"use client"` | **Typo en el nombre** (debería ser "Sidebar") |
| `siderbar.module.css` | CSS Module | Asociado al componente con typo |

### Directorios vacíos

- `components/lib/` — **vacío**, sin archivos

---

## 3. COMPONENTES HUÉRFANOS

| Componente | Problema |
|------------|----------|
| `components/Siderbar.tsx` | Nombre con typo; si se usa desde `app/dashboard/layout.tsx` funciona, pero el nombre erróneo es un bug de mantenimiento |
| `components/sections/Founder.tsx` | Solo existe ruta `/company/founder` — verificar si la sección también aparece en home |
| `components/sections/Platform.tsx` | No se encontró referencia clara de qué ruta la usa |

---

## 4. CSS NO UTILIZADO / PROBLEMAS CSS

| Archivo | Estado | Problema |
|---------|--------|----------|
| `app/globals.css` | Dudoso | Existe un `app/globals.css` secundario además del principal `styles/globals.css`. El layout en `app/[locale]/layout.tsx` importa `../globals.css` — necesita verificar cuál de los dos se aplica realmente |
| `styles/auth.ts` | **Muerto** | Archivo con extensión `.ts` dentro de `styles/`, con 1 sola línea de contenido — no es un archivo CSS válido ni un módulo TS útil |
| `components/siderbar.module.css` | En uso pero mal nombrado | Funciona, pero el typo lo hace difícil de encontrar |

### Arquitectura CSS actual

```
styles/globals.css          ← Punto de entrada principal
  @import "tailwindcss"
  @import tokens.css
  @import colors.css
  @import typography.css
  @import spacing.css
  @theme { ... }            ← Extensiones Tailwind v4
```

Tokens clave definidos: `--orthonoba-black (#050505)`, `--orthonoba-gold (#D4AF37)`, `--orthonoba-silver (#A1A1AA)`, etc.

---

## 5. APIs NO UTILIZADAS / PROBLEMAS DE API

| Endpoint | Problema |
|----------|----------|
| `/api/auth/login` + `/api/v1/auth/login` | **Duplicado** — misma lógica en dos rutas distintas |
| `/api/auth/register` | Versión legacy sin `/v1/` — no hay equivalente v1 documentado |
| `/api/pacientes` | Sin versión `/v1/` — inconsistente con el resto del sistema |
| `/api/v1/courses` | **Propósito desconocido** — no hay módulo de cursos definido en la plataforma dental ni en el pivot de AI Agency |
| `/api/v1/contact` | Implementación actual solo hace `console.log` — no persiste datos ni envía email |
| `/api/v1/demo-request` | Contenido no analizado — verificar si persiste datos o solo loggea |

---

## 6. DEPENDENCIAS NO UTILIZADAS

### Dependencias instaladas sin uso evidente en el código actual

| Paquete | Tipo | Problema |
|---------|------|----------|
| `recharts` | dependency | Librería de gráficos — no se encontraron importaciones en componentes actuales. El dashboard es básico sin charts |
| `autoprefixer` | devDependency | Tailwind v4 ya incluye autoprefixer — duplicado e innecesario |
| `@prisma/client` + `prisma` | dependency | Instalados, schema mínimo presente, pero las APIs de auth usan `pg` directamente — el cliente Prisma no se usa en la lógica de negocio actual |

### Dependencias en uso

| Paquete | Uso |
|---------|-----|
| `next` | Framework principal |
| `react` / `react-dom` | UI |
| `next-intl` | i18n con `[locale]` routing |
| `pg` | Conexión directa a PostgreSQL (lib/db.ts) |
| `bcrypt` | Hash de contraseñas (services/auth.ts) |
| `jsonwebtoken` | JWT (services/auth.ts) |
| `lucide-react` | Iconos en componentes |
| `tailwindcss` | Estilos |
| `@tailwindcss/postcss` | PostCSS plugin para Tailwind v4 |
| `typescript` | Tipado |
| `eslint` / `eslint-config-next` | Linting |

---

## 7. CARPETAS DUPLICADAS / MAL UBICADAS

| Carpeta | Ubicación | Problema |
|---------|-----------|----------|
| `dashboard/` | **Raíz del proyecto** | Existe `app/dashboard/` (la ruta real) Y `dashboard/page.tsx` en la raíz. El de la raíz no es enrutable por Next.js |
| `test/` | **Raíz del proyecto** | Contiene un `test/page.tsx` fuera de `app/` — no es una ruta de Next.js ni un test runner estándar |
| `hooks/` | Raíz | Directorio vacío — no tiene ningún hook implementado |
| `components/lib/` | `components/lib/` | Directorio vacío — sin utilidades |

---

## 8. ARCHIVOS MUERTOS

| Archivo | Razón |
|---------|-------|
| `dashboard/page.tsx` | Fuera de `app/` — no enrutable, no se ejecuta nunca |
| `test/page.tsx` | Fuera de `app/` — no es test runner ni ruta válida |
| `styles/auth.ts` | Extensión `.ts` en carpeta de estilos, contenido vacío/inútil |
| `docs/brand-directrices.skill.md` | Placeholder vacío |
| `docs/canvas-design.skill.md` | Placeholder vacío |
| `docs/claude-api.skill.md` | Placeholder vacío |
| `docs/comunicac-inter.skill.md` | Placeholder vacío |
| `docs/context7-cli.skill.md` | Placeholder vacío |
| `docs/creator.skill.md` | Placeholder vacío |
| `docs/docs.skill.md` | Placeholder vacío |
| `docs/fronted-design.skill.md` | Placeholder vacío |
| `docs/mcp-builder.skill.md` | Placeholder vacío |
| `docs/paginas.web.skill.md` | Placeholder vacío |
| `docs/pdf.skill.md` | Placeholder vacío |
| `docs/pruebas-de-aplic.skill.md` | Placeholder vacío |
| `docs/superpowers.skill.md` | Placeholder vacío |
| `docs/theme-factory.skill.md` | Placeholder vacío |
| `docs/web-builder.skill.md` | Placeholder vacío |

> **Total archivos muertos identificados: 19**

---

## 9. IMPORTS ROTOS / INCONSISTENCIAS

| Problema | Detalle |
|----------|---------|
| **Schema Prisma vs. base de datos real** | `prisma/schema.prisma` define `Paciente`, `Caso`, `Archivo` — pero la tabla `users` usada por auth no está en el schema (se crea manualmente vía `sql/neon-users.sql`). Si se ejecuta `prisma migrate reset`, se pierde la tabla de usuarios |
| **`typescript.ignoreBuildErrors: true`** | En `next.config.ts` — suprime errores de TypeScript en build. Pueden existir errores de tipos silenciados que ocultan bugs reales |
| **`next.config.ts` versión `"next"` declarada como `^16.2.4`** | `package.json` usa `"next": "^16.2.4"` — versión no oficial publicada (Next.js actual es 14/15). Revisar si es un fork o typo |
| **Dos entradas CSS** | `app/globals.css` y `styles/globals.css` coexisten — potencial confusión sobre cuál se importa realmente |
| **`proxy.ts` en raíz** | Archivo renombrado para next-intl middleware. En Next.js el middleware debe llamarse `middleware.ts` — verificar si `proxy.ts` está correctamente referenciado en `next.config.ts` |

---

## 10. QUÉ DEBE CONSERVARSE

### Infraestructura core (no tocar)

| Elemento | Razón |
|----------|-------|
| `app/[locale]/` (todo) | Routing i18n funcional con next-intl |
| `app/(auth)/` (todo) | Flujo de autenticación |
| `app/dashboard/` | Dashboard privado |
| `app/api/v1/` (excepto duplicados) | Versión canónica de la API |
| `components/layout/` | Header, Footer, MegaMenu en uso |
| `components/sections/` | Secciones del homepage |
| `components/ui/` | Design system primitivos |
| `components/dashboard/` | Componentes de dashboard |
| `lib/db.ts` | Pool de conexión a Neon |
| `services/auth.ts` | Lógica de autenticación |
| `styles/` (excepto `auth.ts`) | Sistema de diseño completo |
| `prisma/schema.prisma` | Schema ORM |
| `sql/neon-users.sql` | Migración manual de usuarios |
| `types/index.ts` | Tipos compartidos |
| `src/` | Configuración de next-intl (i18n routing) |
| `proxy.ts` / middleware | Middleware de localización |
| `app/sitemap.ts` | SEO — sitemap multilingüe |
| `.taskmaster/` | Framework de tareas automatizadas |
| `CLAUDE.md` | Documentación del sistema para IA |

---

## 11. QUÉ DEBE ELIMINARSE

### Prioridad ALTA — Eliminar sin riesgo

| Elemento | Razón |
|----------|-------|
| `dashboard/` (raíz) | Carpeta huérfana, no enrutable, duplica `app/dashboard/` |
| `test/` (raíz) | Carpeta huérfana, no es test runner ni ruta válida |
| `styles/auth.ts` | Archivo vacío con extensión incorrecta en carpeta de estilos |
| `hooks/` (si permanece vacío) | Directorio vacío sin función |
| `components/lib/` (si permanece vacío) | Directorio vacío sin función |

### Prioridad ALTA — Consolidar / Eliminar uno

| Elemento | Acción |
|----------|--------|
| `/api/auth/login` + `/api/v1/auth/login` | Mantener solo `/api/v1/auth/login`, redirigir o eliminar el legacy |
| `/api/auth/register` | Migrar a `/api/v1/auth/register` y eliminar el legacy |
| `/api/pacientes` | Migrar a `/api/v1/pacientes` y eliminar el legacy |

### Prioridad MEDIA — Revisar antes de eliminar

| Elemento | Razón |
|----------|-------|
| `app/api/v1/courses/route.ts` | Propósito desconocido — puede ser un módulo en desarrollo o un artefacto del pivot |
| `recharts` (dependencia) | No hay gráficos implementados — si no se planean, desinstalar |
| `autoprefixer` (devDependency) | Tailwind v4 lo incluye internamente — redundante |
| 14 archivos `*.skill.md` vacíos en `docs/` | Placeholders sin contenido — limpiar o rellenar |

### Prioridad BAJA — Deuda técnica a resolver

| Elemento | Acción recomendada |
|----------|-------------------|
| `Siderbar.tsx` + `siderbar.module.css` | Renombrar a `Sidebar.tsx` / `sidebar.module.css` |
| `typescript.ignoreBuildErrors: true` | Eliminar flag, corregir errores de tipo reales |
| Tabla `users` fuera de Prisma | Agregar modelo `User` al schema de Prisma |
| `app/globals.css` duplicado | Unificar en un solo entry point CSS |
| Sin `error.tsx` ni `loading.tsx` | Crear fallbacks de error y loading en rutas críticas |
| `@types/node: 25.6.0` (exacto, sin `^`) | Cambiar a versión con caret para recibir parches |

---

## RESUMEN EJECUTIVO

| Categoría | Cantidad | Estado |
|-----------|----------|--------|
| Rutas activas | 28 | OK |
| Componentes | 16 | OK (1 con typo) |
| Componentes huérfanos potenciales | 3 | Verificar |
| API Routes | 8 | 3 duplicadas |
| Archivos muertos | 19 | Eliminar |
| Carpetas mal ubicadas | 4 | Limpiar 2 |
| Dependencias no utilizadas | 3 | Revisar |
| Imports/configuraciones rotas | 5 | Corregir |
| CSS files | 7 | 1 muerto, 1 dudoso |

**Bloqueantes críticos antes de cualquier deploy:**
1. Verificar que `proxy.ts` actúa como `middleware.ts` correctamente
2. Resolver la doble entrada CSS (`app/globals.css` vs `styles/globals.css`)
3. Confirmar versión real de Next.js (`^16.2.4` no existe como paquete oficial)

---

*Informe generado por auditoría estática — sin modificaciones al código.*  
*Esperando aprobación para ejecutar cualquier limpieza.*
