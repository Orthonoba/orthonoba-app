# CLAUDE.md — ORTHONOBA.APP SYSTEM

## 🧠 ROL DEL SISTEMA

Este proyecto corresponde a **Orthonoba.app**, una plataforma SaaS tecnológica especializada para:

- Clínicas dentales
- Laboratorios dentales
- Profesionales odontológicos
- Gestión de pacientes
- Producción CAD/CAM dental

El sistema combina:

- CRM dental básico
- Gestión de pacientes
- Fichas clínicas digitales
- Subida de archivos STL / OBJ / DICOM
- Flujo de trabajo laboratorio → clínica
- Facturación integrada
- Panel multi-rol (clínica / laboratorio / paciente / admin)

---

# 🔄 FLUJO DE TRABAJO DEL AGENTE IA

1. Analizar contexto del usuario o módulo
2. Identificar rol (clínica, laboratorio, admin, paciente)
3. Proponer estructura modular sin romper arquitectura base
4. Generar código limpio en Next.js + TypeScript
5. Mantener separación estricta de módulos
6. Validar consistencia visual + UX
7. No inventar datos médicos ni funcionales no definidos

---

# ❓ PREGUNTAS (SOLO UNA VEZ)

Antes de generar estructuras complejas, el sistema debe preguntar:

- ¿El módulo es para clínica o laboratorio?
- ¿Es funcionalidad CRM, CAD, o administrativa?
- ¿Debe ser visible en menú o interno?
- ¿Requiere integración con archivos STL / DICOM?

Estas preguntas se hacen una sola vez por contexto de tarea.

---

# 🎨 AJUSTES ESTÉTICOS GLOBALES

## PRESSET A — "ORTHONOBA.APP CORE"

Sistema principal SaaS dental

### Identidad visual:

- Limpio, clínico, tecnológico
- Alto nivel profesional (tipo software médico)
- UX optimizada para uso rápido en clínicas

### Paleta base:

- Azul clínico profundo (#1E3A8A)
- Blanco médico (#FFFFFF)
- Gris suave (#F3F4F6)
- Verde validación (#10B981)
- Rojo alerta (#EF4444)

### Tipografía:

- Inter / Geist / SF Pro

### Animaciones:

- Framer Motion
- easing: `power3.out`
- transiciones suaves pero rápidas

### UI:

- Dashboards modulares
- Sidebar por roles
- Cards clínicas limpias
- Tablas médicas optimizadas

---

## 🧩 SISTEMA DE DISEÑO FIJO (NO CAMBIAR)

- Componentes reutilizables obligatorios
- No crear estilos inconsistentes
- UI basada en design system central
- Tokens de diseño centralizados
- Layout responsive obligatorio
- Dark mode compatible

---

## 🎞 TEXTURA VISUAL

- Superficie limpia tipo SaaS médico
- Profundidad suave (elevación ligera)
- Sombras sutiles
- Glassmorphism controlado (solo en headers)
- Evitar saturación visual

---

## ⚙️ ARQUITECTURA DE COMPONENTES

### Filosofía:

- Modular
- Escalable
- Separación por dominio (clínica / laboratorio)

### Estructura:

- /components (UI global)
- /modules (funcionalidad SaaS)
- /app (routing Next.js)
- /lib (lógica de negocio)
- /config (menús + roles)

### Protocolo:

- No lógica dentro de UI
- No mezclar clínica y laboratorio
- Cada módulo independiente

---

## 🧱 FOOTER SYSTEM

El footer debe contener:

- Información legal dental
- GDPR compliance
- Soporte técnico
- Versión del sistema
- Branding Orthonoba

Debe ser:

- Minimalista
- Informativo
- No invasivo

---

# 🧪 REQUISITOS TÉCNICOS

- Next.js (App Router)
- TypeScript obligatorio
- TailwindCSS
- Neon PostgreSQL
- Prisma o Drizzle ORM
- Autenticación por roles
- Multi-tenant (clínicas/labs separados)
- Subida de archivos (STL / OBJ / DICOM)
- Seguridad médica (GDPR)

---

# 🌙 PRESET B — "MIDNIGHT LUXE"

## Estilo:

- Oscuro elegante
- Alta gama premium
- Inspirado en software médico privado

### Paleta:

- Negro profundo (#0B0F1A)
- Azul noche (#111827)
- Dorado suave (#C9A227)
- Gris humo (#9CA3AF)

### Uso:

- Clínicas premium
- Laboratorios de alta gama
- Panel administrativo avanzado

---

# 🧱 PRESET C — "BRUTALIST SIGNAL"

## Estilo:

- Crudo
- Técnico
- Funcional
- Sin decoración innecesaria

### Paleta:

- Blanco puro (#FFFFFF)
- Negro absoluto (#000000)
- Rojo técnico (#FF0000)
- Gris estructura (#D1D5DB)

### Características:

- UI directa sin adornos
- Máxima velocidad de lectura
- Enfoque en datos
- Tablas densas
- Interfaces tipo ingeniería

---

# 🧠 PRINCIPIO GENERAL DEL SISTEMA

Orthonoba.app no es una web.

Es un:

- Sistema operativo dental SaaS
- Infraestructura clínica digital
- Plataforma de laboratorio CAD/CAM
- CRM médico especializado

---

# 🚫 RESTRICCIONES IMPORTANTES

- No inventar datos médicos
- No romper estructura modular
- No mezclar presets visuales sin control
- No generar UI sin contexto de rol
- No modificar sistema de diseño base

---

# 🚀 OBJETIVO FINAL

Construir una plataforma escalable para:

- Clínicas dentales digitales
- Laboratorios CAD/CAM
- Gestión completa del paciente
- Automatización clínica
- Producción dental digital STL → laboratorio → entrega

# Orthonoba — Contexto del proyecto

## Qué es

Plataforma healthtech para el sector Odontológico/médico/Clínicas dentales/Pacientes. Combina:

- Sitio corporativo público (landing, beneficios, contacto, solicitar-demo,modulo autenticación y usuarios, funcion acceso a la plataforma Roles Clinica-laboratorios dentales y pacientes,Modulo Dashboard clinicas dentalescon resumen de casos ,estados-recibido y en proceso y terminado)
  -Modulo dashboard laboratorio dental (Función:Gestión interna del laboratorio ;Incluye -Casos recibidos,gestion de estados,panel de trabajos CAD,Subida de archivos STL,Solicitar recogida)
  -Modulo Gestion de casos (Funcion;Centro del sistema:incluye;-crear caso clinico-datos del paciente-tipo de trabajo-subida de archivos STL-OBJ-DICOM JPG,PNG.+asignacion al laboratorio y seguimiento de estado)
  -modulo gestion de archivos(subida STL,Subida e imagenes,subida de archivos finales CAD, almacenamiento externo en NEON POSTGRE SQL,enlaces seguros a archivos)
  -Modulo visor 3D (Visualizacion de modelos dentales-Visualizacion STL inicial-visualizacion STL final+Rotacion + Zoom + Vista simplificada paciente + vista tecnica clinica/laboratorio dental)
  -Modulo Portal Paciente(funcion; Interaación Paciente clínica con .Acceso independiente\*Subida de fotografias de frente ,lateral derecha e izquierda ,superior inferior apertura y cieer de la boca +sonrisa mas boca cerrada..visual del resultado final,opcional STLopcional escaneo Facial)
  -Modulo captacionde pacientes para LEADS marketing
  -Modulo solicitud de diseño CAD
  -Modulo Produccion CAD laboratorio
  -Modulo ALINEADORES PROSmile y marca Blanca Ortodoncia
- Dashboard privado para usuarios autenticados
- API interna para gestión de datos médicos
- Funcionalidades de e-commerce/SaaS

## Stack técnico

- **Framework**: Next.js 15 (App Router, NO Pages Router)
- **Lenguaje**: TypeScript estricto
- **Base de datos**: Neon Postgres (serverless)
- **ORM**: Prisma (ver `prisma/schema.prisma` para el esquema)
- **Estilos**: Tailwind CSS
- **Autenticación**: Propia, sobre Neon. Rutas en `app/(auth)/`
- **Linter**: ESLint (`eslint.config.mjs`)
- **Gestor de tareas**: Task Master AI (`.taskmaster/`)
- **OS de desarrollo**: Windows (PowerShell)

## Estructura del proyecto

- `app/` — Rutas del App Router (cada carpeta = una ruta pública)
- `app/(auth)/` — Grupo de rutas de auth (login, register, forgot-password)
- `app/api/` — Route Handlers (endpoints de la API)
- `app/dashboard/` — Área privada (requiere autenticación)
- `components/` — Componentes React reutilizables
- `components/lib/` — Utilidades de componentes
- `hooks/` — React hooks personalizados (NO confundir con Claude hooks)
- `lib/` — Lógica compartida (db client, helpers, validaciones)
- `services/` — Capa de servicios (lógica de negocio)
- `prisma/` — Schema y migraciones de Prisma
- `sql/` — Scripts SQL sueltos (revisar antes de ejecutar)
- `public/` — Assets estáticos
- `styles/` — Estilos globales
- `types/` — Tipos TypeScript compartidos
- `tasks/` — ⚠️ Revisar si debe estar dentro de `app/` (genera ruta pública /tasks)
- `test/` — ⚠️ Lo mismo, revisar si debe estar dentro de `app/`

## Convenciones de código

- Componentes en **PascalCase** (`Button.tsx`, `Header.tsx`) — actualmente están en minúsculas, mantener el estilo del proyecto existente
- Server Components por defecto, `"use client"` solo cuando sea necesario (interactividad, hooks de React, browser APIs)
- Usar Server Actions para mutaciones cuando sea posible
- Validar inputs con Zod antes de tocar la DB
- Nunca importar el cliente de Prisma directamente en componentes — usar la capa `services/`
- Manejo de errores: nunca exponer mensajes crudos de Prisma al usuario final

## Comandos

- `npm run dev` — desarrollo local
- `npm run build` — build de producción
- `npm run lint` — ESLint
- `npx prisma studio` — UI para inspeccionar la DB
- `npx prisma migrate dev` — crear/aplicar migración
- `npx prisma generate` — regenerar cliente

## Reglas innegociables

1. **NUNCA** modificar archivos en `.next/`, `node_modules/`, `.taskmaster/` directamente
2. **NUNCA** commitear `.env.local` ni secretos. Usar `.env.example` como referencia
3. **NUNCA** ejecutar `prisma migrate reset` en producción
4. **NUNCA** hacer `git push --force` a `main`
5. **SIEMPRE** correr `npm run lint` y `tsc --noEmit` antes de proponer un commit
6. **SIEMPRE** que toques el schema de Prisma, generar la migración con `prisma migrate dev --name <descripción>`
7. **SIEMPRE** validar inputs de auth con Zod (login, register, forgot-password)
8. Datos médicos = sensibles. Tratar con cuidado extra: no loggear, no enviar a servicios externos sin consentimiento explícito

## Lo que NO debes hacer

- No mezclar Pages Router con App Router
- No usar `getServerSideProps` ni `getStaticProps` (eso es Pages Router)
- No hardcodear strings de UI — preparar para i18n (español por defecto)
- No instalar librerías sin justificarlo (preferir nativo de Next/React)

---

# ORTHONOBA DESIGN SYSTEM

## Principios

- **Ultra Premium** — Cada píxel debe comunicar excelencia
- **Swiss Design** — Orden, jerarquía tipográfica, retícula clara
- **Minimalismo** — Si puede removerse sin perder sentido, se remueve
- **Espacio en blanco** — Es un elemento activo de diseño, no espacio vacío
- **Tipografía grande** — Los títulos dominan. La jerarquía es visual y clara
- **Máximo contraste** — Negro profundo + oro. Sin ambigüedad de lectura
- **Mobile First** — Diseñar desde 375px, escalar hacia arriba
- **B2B Enterprise** — Audiencia profesional. Sin decoración infantil

## Paleta de Colores

| Token Tailwind   | Variable CSS              | Valor     | Uso                          |
|------------------|---------------------------|-----------|------------------------------|
| `bg-obsidian`    | `--orthonoba-black`       | `#050505` | Fondo base de página         |
| `bg-panel`       | `--orthonoba-panel`       | `#0E0E0E` | Cards, footer, sidebar       |
| `bg-panel-2`     | `--orthonoba-panel-2`     | `#161616` | Hover states, paneles sec.   |
| `bg-panel-3`     | `--orthonoba-panel-3`     | `#1E1E1E` | Bordes elevados              |
| `text-gold`      | `--orthonoba-gold`        | `#D4AF37` | Acento principal, CTAs       |
| `bg-gold-light`  | `--orthonoba-gold-light`  | `#F5C542` | Hover del acento gold        |
| `text-silver`    | `--orthonoba-silver`      | `#A1A1AA` | Texto secundario             |
| `text-muted`     | `--orthonoba-muted`       | `#71717A` | Texto terciario, hints       |

## Arquitectura del Design System

```
styles/
  design-tokens.css   ← Fuente de verdad: --orthonoba-* variables
  colors.css          ← Estados interactivos, bordes, opacidades
  typography.css      ← Escala tipográfica, tracking, line-heights
  spacing.css         ← Section gaps, container widths, border-radius
app/
  globals.css         ← @import "tailwindcss" + @theme (tokens → utilities)
```

## Uso Correcto

```tsx
/* VÍA CLASES TAILWIND (preferido para layout/color) */
<div className="bg-obsidian text-gold">...</div>
<button className="bg-gold text-obsidian hover:bg-gold-light">...</button>

/* VÍA VARIABLES CSS (para inline styles, gradients, sombras) */
<div style={{ color: "var(--orthonoba-gold)" }}>...</div>
<div style={{ background: "var(--gradient-gold-subtle)" }}>...</div>
```

## Regla Crítica: NUNCA saturar visualmente

- Sin gradientes de colores múltiples en una sola sección
- Sin más de 2 tipografías en una pantalla
- Sin tarjetas con múltiples colores de acento
- Sin testimonios, métricas o datos inventados
- Sin elementos decorativos sin función

## Stack de Estilos

- **Tailwind v4** — `@import "tailwindcss"` + `@theme {}` (no `tailwind.config.ts`)
- **PostCSS** — Solo `@tailwindcss/postcss` (sin `autoprefixer`, incluido en v4)
- **Fuente** — Inter (variable `--font-inter` desde Next.js Font Optimization)
- **VS Code warning `@theme`** — Falsa alarma del CSS Language Server. No es un error real.

## Comando Post-Cambios CSS

Después de modificar cualquier archivo en `styles/` o `app/globals.css`:

```bash
# Detener dev server, limpiar caché y reiniciar
Remove-Item -Recurse -Force .next
npm run dev
```
