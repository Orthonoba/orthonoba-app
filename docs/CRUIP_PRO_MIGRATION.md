# CRUIP PRO MIGRATION — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase 2 del Roadmap**  
**Compatibilidad:** Tailwind CSS v4 · Next.js 16 App Router · React 19

---

## SCORE DE COMPATIBILIDAD: **72/100** 🟡

Cruip Pro es compatible a nivel de stack pero requiere más trabajo de adaptación que Tailwind Plus, principalmente por los conflictos de variables CSS entre shadcn/ui y los sistemas de diseño de Cruip.

---

## QUÉ ES CRUIP PRO

Cruip Pro (cruip.com) ofrece:
- Templates SaaS premium completos para Next.js
- Componentes de dashboard, analytics, auth pages
- Marketing templates con animaciones
- Optimizado específicamente para SaaS B2B — caso de uso perfecto para Orthonoba

**Productos relevantes para Orthonoba:**
- **Mosaic** — Dashboard template completo
- **Stellar** — SaaS landing page
- **Zinc** — Dark UI components

---

## ANÁLISIS DE COMPATIBILIDAD PROFUNDO

### ✅ Compatible

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Next.js App Router | ✅ | Cruip Pro tiene versiones Next.js App Router |
| React 19 | ✅ | Compatible (verificar release notes de Cruip) |
| TypeScript | ✅ | Entrega código TypeScript |
| Dark Theme | ✅ | Cruip tiene templates dark-first |
| Tailwind CSS | 🟡 | Depende de la versión del template (v3 o v4) |

### ⚠️ Requiere Trabajo

| Aspecto | Problema | Complejidad |
|---------|----------|-------------|
| Variables CSS shadcn vs Cruip | Ambos usan `--background`, `--foreground`, `--primary` | Alta |
| Sistema de colores | Cruip usa su propia paleta, Orthonoba usa gold/obsidian | Media |
| Tailwind v3 vs v4 | Templates de Cruip pueden ser v3 | Media |
| Fuentes | Cruip puede asumir fuente diferente | Baja |
| Animaciones | Cruip tiene su propio sistema de animaciones | Media |

---

## EL CONFLICTO PRINCIPAL: VARIABLES CSS

### Shadcn/ui (actual en Orthonoba)
```css
/* Definidas en globals.css por shadcn */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --accent: 210 40% 96.1%;
  --radius: 0.5rem;
}
```

### Cruip Pro (posibles variables similares)
```css
/* Variables típicas de Cruip */
:root {
  --background: /* valor Cruip */;
  --foreground: /* valor Cruip */;
  --accent: /* valor Cruip — diferente a shadcn */;
}
```

### Solución: Namespace CSS
```css
/* styles/cruip-scope.css */
/* Aislar componentes Cruip en su propio scope */
.cruip {
  /* Override shadcn variables SOLO dentro de .cruip */
  --background: var(--color-panel);    /* usar tokens Orthonoba */
  --foreground: #FFFFFF;
  --primary: var(--color-gold);
  --primary-foreground: var(--color-obsidian);
  --muted: var(--color-panel-2);
  --accent: var(--color-panel-3);
  --border: var(--color-ono-border);
}
```

---

## VERIFICACIÓN DE VERSIÓN TAILWIND

**Antes de comprar un template de Cruip Pro, verificar:**
1. ¿El template usa Tailwind v3 o v4?
2. ¿Tiene `tailwind.config.js` (v3) o `@theme {}` en CSS (v4)?

### Si el template es Tailwind v3
El template usará `tailwind.config.js` con `extend.colors`. Migrar a v4 requiere:

```js
// tailwind.config.js (v3 — Cruip template)
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { 500: '#D4AF37' }
      }
    }
  }
}
```

```css
/* globals.css (v4 — Orthonoba) — EQUIVALENTE */
@theme {
  --color-brand-500: #D4AF37;
}
```

**Estrategia para templates v3:** Convertir todas las clases custom del template a v4 `@theme` syntax. Las clases Tailwind estándar son compatibles entre v3 y v4.

---

## PLAN DE INTEGRACIÓN DETALLADO

### FASE 2A — Preparación (3 días)

#### Día 1: Adquisición y análisis
```bash
# 1. Adquirir template en cruip.com
# 2. Descomprimir y analizar estructura
# 3. Identificar:
#    - Versión de Tailwind usada
#    - Variables CSS definidas
#    - Componentes más relevantes para Orthonoba
# 4. Crear rama
git checkout -b feat/cruip-pro-phase2
```

#### Día 2: Setup de compatibilidad
```css
/* styles/cruip-compat.css */
/* 
  Mapeo de variables CSS de Cruip al sistema Orthonoba
  Importar DESPUÉS de shadcn y ANTES de usar componentes Cruip
*/

/* Si Cruip usa variables HSL */
.cruip {
  --background: 5 5% 5%;           /* #050505 = obsidian */
  --card: 0 0% 5.5%;               /* #0E0E0E = panel */
  --card-foreground: 0 0% 100%;    /* white */
  --primary: 44 64% 52%;           /* #D4AF37 = gold */
  --primary-foreground: 5 5% 5%;   /* obsidian */
  --secondary: 0 0% 11%;           /* #1C1C1C */
  --muted: 0 0% 9%;                /* #161616 = panel-2 */
  --muted-foreground: 240 4% 46%;  /* silver */
  --accent: 0 0% 12%;              /* #1E1E1E = panel-3 */
  --border: 37 18% 13%;            /* ono-border */
  --radius: 0.5rem;
}
```

#### Día 3: Prueba de compatibilidad
```tsx
// Crear página de prueba (NO en producción)
// app/test-cruip/page.tsx
// Importar 2-3 componentes de Cruip y verificar que renderizan correctamente
```

---

### FASE 2B — Dashboard UI (5-7 días)

#### Prioridad 1: Analytics Charts
**Componente Cruip recomendado:** Mosaic Dashboard → Analytics section  
**Componente Orthonoba:** `app/dashboard/analytics/page.tsx`

```tsx
// Patrón de integración:
// 1. Copiar componente chart de Cruip
// 2. Wrappear en <div className="cruip"> para aislar variables
// 3. Reemplazar datos mock con queries Prisma reales
// 4. Mantener Recharts como librería de charting (ya instalado)
```

#### Prioridad 2: Data Tables
**Componente Cruip:** Mosaic → Transactions / Users tables  
**Componentes Orthonoba:** Contacts, Leads, Conversations pages

```tsx
// Adaptar tabla Cruip:
// 1. Copiar <Table> component
// 2. Wrappear en .cruip scope
// 3. Conectar con datos reales via Prisma
// 4. Agregar paginación (take/skip)
```

#### Prioridad 3: KPI Cards
**Componente Cruip:** Stats cards con trends  
**Componente Orthonoba:** `app/dashboard/page.tsx` KPI section

```tsx
// Reemplazar los 6 KPI hardcodeados (todos con "—")
// con componentes Cruip conectados a datos reales
```

#### Prioridad 4: Forms
**Componentes Cruip:** Settings forms, profile forms  
**Componentes Orthonoba:** `app/dashboard/settings/page.tsx`

---

### FASE 2C — Marketing Pages (3-4 días)

Si Cruip Pro tiene templates de landing SaaS:
- Homepage alternativa más moderna
- Pricing page con toggle mensual/anual
- About/Company page

---

## COMPONENTES CRUIP MAPEADOS A ORTHONOBA

| Categoría Cruip | Componente Orthonoba | Status | Prioridad |
|-----------------|---------------------|--------|-----------|
| Dashboard Overview | `/dashboard/page.tsx` | Placeholder | P0 |
| Analytics Charts | `/dashboard/analytics` | Placeholder | P1 |
| User Table | `/dashboard/contacts` | Placeholder | P1 |
| Transactions | `/dashboard/billing` | Funcional | P2 |
| Activity Feed | Dashboard sidebar | Ausente | P2 |
| Settings Form | `/dashboard/settings` | Placeholder | P2 |
| Auth Pages | `/(auth)/login` | Funcional | P3 |
| Landing Hero | `[locale]/page.tsx` | Funcional | P3 |
| Pricing | `[locale]/pricing` | Funcional | P3 |

---

## CHECKLIST POR COMPONENTE CRUIP

- [ ] Verificado en rama `feat/cruip-pro-phase2`
- [ ] Wrappado en `.cruip` CSS scope
- [ ] Colores mapeados a paleta Orthonoba
- [ ] Variables CSS no se filtran fuera del scope
- [ ] Test de dark mode con `@custom-variant dark`
- [ ] Datos reales conectados (no mocks)
- [ ] i18n con next-intl (sin strings hardcoded)
- [ ] Responsive: 375px / 768px / 1280px
- [ ] Accesibilidad básica (contraste ≥ 4.5:1)
- [ ] No hay imports de CSS globales del template

---

## ESTIMACIÓN DE TIEMPO

| Tarea | Horas estimadas |
|-------|----------------|
| Adquisición y análisis de template | 4h |
| Setup de compat CSS namespace | 3h |
| Analytics dashboard | 8h |
| Data tables (contacts + leads) | 10h |
| KPI cards con datos reales | 6h |
| Settings forms | 6h |
| QA completo 3 breakpoints | 6h |
| **TOTAL** | **~43 horas / 1.5 sprints** |

---

## RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| Template en Tailwind v3 | Media | Medio | Migrar clases custom a v4 |
| Variables CSS rompen shadcn existente | Alta | Alto | CSS namespace `.cruip` obligatorio |
| React 19 incompatibilidad | Baja | Alto | Verificar con latest Cruip release |
| Diseño Cruip no es oscuro | Media | Medio | Solo considerar templates dark-first |
| Datos mock difíciles de reemplazar | Media | Medio | Planificar data layer antes de UI |

---

## ALTERNATIVAS A CRUIP PRO

Si la compatibilidad de Cruip Pro resulta problemática:

| Alternativa | Compatibilidad | Precio | Notas |
|-------------|---------------|--------|-------|
| **Tremor** (tremor.so) | ✅ React 19 + Tailwind | Gratis | Especializado en dashboard/analytics |
| **shadcn/ui blocks** | ✅ Perfecto | Gratis | Integrado con lo que ya existe |
| **Radix Themes** | ✅ Buena | Gratis | Sistema completo basado en Radix |
| **Headless UI** (Tailwind) | ✅ Excelente | Gratis | Parte del ecosistema Tailwind |

**Recomendación:** Si Cruip Pro es v3 o tiene conflictos serios, evaluar **Tremor** como alternativa — es especializado en dashboards SaaS, usa Tailwind y es React 19 compatible.
