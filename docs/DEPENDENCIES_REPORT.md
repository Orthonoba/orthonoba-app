# DEPENDENCIES REPORT — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Generado automáticamente desde `package.json`**

---

## RESUMEN

| Categoría                | Cantidad |
|--------------------------|----------|
| Dependencias de producción | 22     |
| Dependencias de desarrollo | 10     |
| Duplicadas / redundantes   | 4      |
| Obsoletas / en riesgo      | 2      |
| Faltantes críticas         | 4      |

---

## DEPENDENCIAS DE PRODUCCIÓN

| Paquete                        | Versión instalada | Última estable | Estado          | Notas                                    |
|--------------------------------|-------------------|----------------|-----------------|------------------------------------------|
| `next`                         | ^16.2.4           | 16.2.4         | ✅ Actual        |                                          |
| `react`                        | ^19.2.5           | 19.2.5         | ✅ Actual        |                                          |
| `react-dom`                    | ^19.2.5           | 19.2.5         | ✅ Actual        |                                          |
| `@prisma/client`               | ^5.22.0           | 6.x disponible | 🟡 Mejorable    | Prisma 6 disponible pero v5 estable      |
| `prisma`                       | ^5.22.0           | 6.x disponible | 🟡 Mejorable    | Igual que cliente                        |
| `stripe`                       | ^22.2.0           | 22.x           | ✅ Actual        |                                          |
| `@stripe/stripe-js`            | ^9.7.0            | 9.x            | ✅ Actual        |                                          |
| `next-intl`                    | ^4.13.0           | 4.x            | ✅ Actual        |                                          |
| `lucide-react`                 | ^1.17.0           | 0.x / 1.x      | 🟡 Verificar    | Versión 1.x es nueva línea mayor         |
| `recharts`                     | ^3.8.1            | 3.x            | ✅ Actual        |                                          |
| `bcrypt`                       | ^6.0.0            | 5.x            | 🟡 Verificar    | v6 puede ser alpha                       |
| `jose`                         | ^6.2.3            | 6.x            | ✅ Actual        | JWT moderno, Edge-compatible             |
| `jsonwebtoken`                 | ^9.0.3            | 9.x            | ⚠️ DUPLICADO    | Usar solo `jose` (ver abajo)             |
| `class-variance-authority`     | ^0.7.1            | 0.7.x          | ✅ Actual        | shadcn dependency                        |
| `clsx`                         | ^2.1.1            | 2.x            | ✅ Actual        |                                          |
| `tailwind-merge`               | ^3.6.0            | 3.x            | ✅ Actual        |                                          |
| `tw-animate-css`               | ^1.4.0            | 1.x            | ✅ Actual        |                                          |
| `@heroicons/react`             | ^2.2.0            | 2.x            | ✅ Actual        |                                          |
| `shadcn`                       | ^4.10.0           | 4.x            | 🟡 Verificar    | CLI package, normalmente devDependency   |
| `radix-ui`                     | ^1.4.3            | 1.x            | ⚠️ DUPLICADO    | Ver duplicados abajo                     |
| `@radix-ui/react-dialog`       | ^1.1.15           | 1.x            | ⚠️ DUPLICADO    | Ya incluido en `radix-ui`               |
| `@radix-ui/react-dropdown-menu`| ^2.1.16           | 2.x            | ⚠️ DUPLICADO    | Ya incluido en `radix-ui`               |
| `@radix-ui/react-select`       | ^2.2.6            | 2.x            | ⚠️ DUPLICADO    | Ya incluido en `radix-ui`               |
| `@radix-ui/react-tabs`         | ^1.1.13           | 1.x            | ⚠️ DUPLICADO    | Ya incluido en `radix-ui`               |
| `@radix-ui/react-tooltip`      | ^1.2.8            | 1.x            | ⚠️ DUPLICADO    | Ya incluido en `radix-ui`               |
| `pg`                           | ^8.20.0           | 8.x            | 🟠 REDUNDANTE   | Prisma gestiona la conexión              |

---

## DEPENDENCIAS DE DESARROLLO

| Paquete                   | Versión instalada | Estado       | Notas                                        |
|---------------------------|-------------------|--------------|----------------------------------------------|
| `typescript`              | 6.0.3             | ✅ Actual     | Versión más reciente                         |
| `@tailwindcss/postcss`    | ^4.2.2            | ✅ Actual     | Plugin correcto para Tailwind v4             |
| `tailwindcss`             | ^4.3.0            | ✅ Actual     |                                              |
| `postcss`                 | ^8.5.10           | ✅ Actual     |                                              |
| `autoprefixer`            | ^10.5.0           | 🟡 Redundante | Tailwind v4 incluye autoprefixer nativo      |
| `eslint`                  | ^9.39.4           | ✅ Actual     |                                              |
| `eslint-config-next`      | ^16.2.4           | ✅ Actual     |                                              |
| `dotenv`                  | ^17.4.2           | ✅ Actual     |                                              |
| `@types/bcrypt`           | ^6.0.0            | ✅ Actual     |                                              |
| `@types/jsonwebtoken`     | ^9.0.10           | ⚠️ Redundante | Si se migra a solo `jose`, no es necesario   |
| `@types/node`             | 25.6.0            | ✅ Actual     |                                              |
| `@types/pg`               | ^8.20.0           | ⚠️ Redundante | Si `pg` se elimina, eliminar también         |
| `@types/react`            | ^19.2.14          | ✅ Actual     |                                              |
| `@types/react-dom`        | ^19.2.3           | ✅ Actual     |                                              |

---

## DEPENDENCIAS DUPLICADAS / CONFLICTOS

### 🔴 Conflicto 1: Dos librerías JWT
```
jose          ^6.2.3   ← MANTENER (Edge-compatible, moderno, ES modules)
jsonwebtoken  ^9.0.3   ← ELIMINAR (CommonJS, no compatible con Edge runtime)
@types/jsonwebtoken    ← ELIMINAR también
```
**Acción:** Migrar todo el código de `jsonwebtoken` a `jose`.

---

### 🔴 Conflicto 2: Paquetes Radix UI duplicados
```
radix-ui                     ^1.4.3   ← Paquete unificado NUEVO
@radix-ui/react-dialog       ^1.1.15  ← REDUNDANTE con radix-ui
@radix-ui/react-dropdown-menu^2.1.16  ← REDUNDANTE con radix-ui
@radix-ui/react-select       ^2.2.6   ← REDUNDANTE con radix-ui
@radix-ui/react-tabs         ^1.1.13  ← REDUNDANTE con radix-ui
@radix-ui/react-tooltip      ^1.2.8   ← REDUNDANTE con radix-ui
```
**Acción:** Usar solo `radix-ui` (paquete unificado) y eliminar los `@radix-ui/*` individuales.  
⚠️ **Riesgo:** Versiones pueden diferir entre el paquete unificado y los individuales. Verificar antes de eliminar.

---

### 🟠 Redundancia: `pg` con Prisma
```
pg          ^8.20.0   ← POSIBLEMENTE REDUNDANTE
@types/pg   ^8.20.0   ← POSIBLEMENTE REDUNDANTE
```
**Acción:** Si se usa solo Prisma para DB, eliminar `pg` y `@types/pg`.  
⚠️ Verificar si `lib/db.ts` usa `pg` directamente antes de eliminar.

---

### 🟡 `shadcn` como dependencia de producción
```
shadcn  ^4.10.0  ← Debería ser devDependency o eliminarse
```
**Acción:** Mover a `devDependencies` o eliminar si solo se usa como CLI.

---

### 🟡 `autoprefixer` redundante en Tailwind v4
```
autoprefixer  ^10.5.0  ← REDUNDANTE
```
Tailwind v4 incluye prefijado automático. Si `postcss.config.js` no lo referencia, es peso muerto.  
**Acción:** Eliminar de `devDependencies` y verificar `postcss.config.js`.

---

## DEPENDENCIAS FALTANTES CRÍTICAS

### ❌ Falta: `@anthropic-ai/sdk`
El `.env.example` define `ANTHROPIC_API_KEY` pero no hay SDK instalado.  
El código en `services/agents.ts` probablemente usa `fetch` directo a la API.  
**Recomendación:** Instalar `@anthropic-ai/sdk` para tipado y manejo de errores robusto.

```bash
npm install @anthropic-ai/sdk
```

---

### ❌ Falta: `openai`
El `.env.example` define `OPENAI_API_KEY` pero no hay SDK instalado.  
**Recomendación:** Instalar solo si se necesita activamente.

```bash
npm install openai
```

---

### ❌ Falta: `twilio`
El sistema planea Voice AI pero no hay SDK de Twilio instalado.  
**Recomendación:** Instalar cuando se implemente el módulo de voz.

```bash
npm install twilio
npm install --save-dev @types/twilio
```

---

### ❌ Falta: Framework de testing
No hay ninguna dependencia de testing (`jest`, `vitest`, `@testing-library/react`, etc.).  
**Recomendación para Next.js 16 + React 19:**
```bash
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom
```

---

### ❌ Falta: `zod` (validación)
CLAUDE.md menciona "Validar inputs con Zod" pero `zod` no está en `package.json`.  
**Recomendación:**
```bash
npm install zod
```

---

## DECLARATIONS.D.TS — Módulos Sin Dependencia

El archivo `declarations.d.ts` declara tipos para módulos Three.js:
```ts
declare module 'three/examples/jsm/loaders/STLLoader'
declare module 'three/examples/jsm/loaders/OBJLoader'
declare module 'three/examples/jsm/controls/OrbitControls'
```

Pero `three` **no está instalado** en `package.json`.  
**Acción:** Instalar cuando se implemente el visor 3D, o eliminar las declaraciones.

```bash
npm install three @types/three
```

---

## PLAN DE LIMPIEZA RECOMENDADO

```bash
# 1. Eliminar duplicados JWT
npm uninstall jsonwebtoken @types/jsonwebtoken

# 2. Mover shadcn a devDependencies
npm uninstall shadcn && npm install --save-dev shadcn

# 3. Eliminar autoprefixer (redundante en Tailwind v4)
npm uninstall autoprefixer

# 4. Agregar dependencias faltantes críticas
npm install zod @anthropic-ai/sdk

# 5. Cuando se implemente Voice AI
npm install twilio

# 6. Testing
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

> ⚠️ **IMPORTANTE:** Antes de eliminar `@radix-ui/*` individuales, verificar que todos los imports en el código usen la nueva API de `radix-ui` unificado. Hacer en sprint separado.
