# TAILWIND PLUS MIGRATION — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase 1 del Roadmap**  
**Compatibilidad:** Tailwind CSS v4.3.0 + Next.js 16 App Router

---

## SCORE DE COMPATIBILIDAD: **85/100** ✅

Tailwind Plus es altamente compatible con el stack actual. Los componentes son código fuente copiable (no una dependencia npm), lo que elimina conflictos de versiones. El único trabajo real es el remapeo de colores.

---

## QUÉ ES TAILWIND PLUS

Tailwind Plus (tailwindplus.com — antes Tailwind UI) proporciona:
- Componentes React/HTML premium con Tailwind CSS
- Application UI: formularios, tablas, sidebars, cards, modals
- Marketing: heroes, features, pricing, CTAs, testimonials
- Ecommerce: product pages, carts (no relevante para Orthonoba)

**Modelo de integración:** Copy-paste de código fuente — no npm install.

---

## ANÁLISIS DE COMPATIBILIDAD

### ✅ Factores Favorables

| Aspecto | Estado | Notas |
|---------|--------|-------|
| Tailwind CSS v4 | ✅ Compatible | Tailwind Plus v4 usa `@theme {}` nativo |
| Next.js App Router | ✅ Compatible | Componentes como Server/Client Components |
| React 19 | ✅ Compatible | Componentes React estándar |
| TypeScript | ✅ Compatible | Tailwind Plus entrega TS cuando se selecciona |
| shadcn/ui coexistencia | ✅ Compatible | Son independientes — no comparten variables CSS |
| `tw-animate-css` | ✅ Compatible | No interfiere |
| Componentes CVA | ✅ Compatible | Tailwind Plus no usa CVA (independiente) |

### ⚠️ Factores que Requieren Adaptación

| Aspecto | Problema | Solución |
|---------|----------|---------|
| Paleta de colores | Tailwind Plus usa `gray`, `zinc`, `slate` — Orthonoba usa `obsidian`, `gold`, `panel` | Remapeo de clases al integrar |
| Dark mode | Tailwind Plus puede usar `.dark` class o `media` | Verificar que `@custom-variant dark (&:is(.dark *))` sea compatible |
| Variables CSS naming | Tailwind Plus no usa `--orthonoba-*` | Variables de Orthonoba no interfieren |

---

## ANÁLISIS DE CONFLICTOS DE COLOR

### Paleta Tailwind Plus (estándar)
```
gray-50   → fondos claros
gray-100  → hover en claro
gray-900  → textos oscuros
white     → fondos
black     → texto base
zinc-*    → variante de gris
slate-*   → variante de gris azulado
```

### Paleta Orthonoba (actual)
```css
/* @theme en globals.css */
--color-obsidian:   #050505  /* fondo base */
--color-panel:      #0E0E0E  /* cards */
--color-panel-2:    #161616  /* hover */
--color-panel-3:    #1E1E1E  /* bordes */
--color-gold:       #D4AF37  /* acento */
--color-gold-light: #F5C542  /* hover gold */
--color-silver:     #A1A1AA  /* texto sec */
--color-muted:      #71717A  /* texto ter */
```

### Mapeo recomendado al copiar componentes Tailwind Plus
```
Tailwind Plus  →  Orthonoba equivalente
─────────────────────────────────────────
bg-white       →  bg-obsidian (dark theme)
bg-gray-50     →  bg-panel
bg-gray-100    →  bg-panel-2
bg-gray-900    →  bg-obsidian
text-gray-900  →  text-white
text-gray-600  →  text-silver
text-gray-400  →  text-muted
border-gray-200→  border-ono-border
bg-indigo-600  →  bg-gold
text-indigo-600→  text-gold
hover:bg-indigo-500 → hover:bg-gold-light
ring-indigo-600→  ring-gold
```

---

## COMPONENTES RECOMENDADOS PARA INTEGRAR

### FASE 1A — Sitio Marketing (Prioridad Alta)

#### Hero Section
**Componente a reemplazar:** `components/sections/Hero.tsx`  
**Tailwind Plus categoria:** Marketing / Hero Sections  
**Template recomendado:** "With background image" o "Split with screenshot"

```tsx
// Patrón de integración:
// 1. Copiar HTML de Tailwind Plus
// 2. Reemplazar colores gray/* → obsidian/panel/gold
// 3. Adaptar a next/image para imágenes
// 4. Conectar con next-intl para i18n
```

#### Pricing Section
**Componente a reemplazar:** `components/sections/PricingPreview.tsx`  
**Tailwind Plus categoria:** Marketing / Pricing  
**Template recomendado:** "Three tiers" con highlight en tier central

Orthonoba tiene 5 tiers (FREE, STARTER, PROFESSIONAL, BUSINESS, ENTERPRISE) — seleccionar template que soporte múltiples tiers.

#### Feature Section
**Componentes a reemplazar:** `AIWorkforceSection.tsx`, `AutomationSection.tsx`, `DigitalTransformationSection.tsx`  
**Tailwind Plus categoria:** Marketing / Feature Sections

#### CTA Section
**Componente a reemplazar:** `components/sections/CTA.tsx`  
**Tailwind Plus categoria:** Marketing / CTA Sections

---

### FASE 1B — Application UI (Prioridad Media)

#### Sidebar Navigation
**Componente a mejorar:** `components/dashboard/DashboardSidebar.tsx`  
**Tailwind Plus categoria:** Application UI / Navigation / Sidebar Navigation

#### Stats / KPI Cards
**Componente a crear:** Dashboard KPI cards con datos reales  
**Tailwind Plus categoria:** Application UI / Stats

#### Tables
**Componentes a crear:** Contacts, Leads, Conversations tables  
**Tailwind Plus categoria:** Application UI / Lists / Tables

#### Forms
**Componentes a crear:** Settings, Onboarding forms  
**Tailwind Plus categoria:** Application UI / Forms

---

## PROCESO DE INTEGRACIÓN PASO A PASO

### Pre-requisitos
```bash
# 1. Adquirir Tailwind Plus en tailwindplus.com
# 2. Crear rama
git checkout -b feat/tailwind-plus-phase1
```

### Paso 1 — Crear archivo de mapeo de colores
```css
/* styles/tw-plus-compat.css */
/* 
  Agrega aliases para facilitar la adopción de componentes Tailwind Plus
  sin modificar la paleta principal de Orthonoba
*/
@theme {
  /* Alias para componentes copiados de Tailwind Plus */
  --color-brand:        var(--color-gold);
  --color-brand-hover:  var(--color-gold-light);
  --color-surface:      var(--color-panel);
  --color-surface-2:    var(--color-panel-2);
  --color-base:         var(--color-obsidian);
}
```

### Paso 2 — Copiar componente desde Tailwind Plus
```tsx
// Ejemplo: Hero copiado y adaptado
// ORIGINAL Tailwind Plus (claro):
// <div className="bg-white">
//   <h1 className="text-gray-900">...</h1>
// </div>

// ADAPTADO Orthonoba:
// <div className="bg-obsidian">
//   <h1 className="text-white">...</h1>
// </div>
```

### Paso 3 — Conectar i18n
```tsx
// Cualquier texto hardcoded en Tailwind Plus → usar next-intl
import { useTranslations } from 'next-intl'

const t = useTranslations('Hero')
// <h1>{t('headline')}</h1>
```

### Paso 4 — Adaptar imágenes
```tsx
// ANTES (img tag de Tailwind Plus)
<img src="https://tailwindplus.com/..." className="..." />

// DESPUÉS (next/image)
import Image from 'next/image'
<Image src="/images/hero-screenshot.png" alt="..." width={1200} height={800} priority />
```

---

## CHECKLIST DE INTEGRACIÓN

### Por cada componente de Tailwind Plus integrado:
- [ ] Colores remapeados (`gray/*` → paleta Orthonoba)
- [ ] Textos conectados a `next-intl` (sin strings hardcoded)
- [ ] Imágenes convertidas a `next/image`
- [ ] Links convertidos a `next-intl` navigation (`<Link>`)
- [ ] Dark mode verificado con `@custom-variant dark`
- [ ] Test en móvil (375px) y desktop (1280px)
- [ ] Verificar accesibilidad (contraste, aria labels)
- [ ] Sin imports de CSS externos del template (usar globals.css)

---

## COMPONENTES QUE NO SE DEBEN MIGRAR

| Componente | Razón para mantener |
|------------|---------------------|
| `components/ui/Button.tsx` | CVA-based, bien implementado, base de shadcn |
| `components/ui/Input.tsx` | Integrado con formularios existentes |
| `components/ui/dialog.tsx` | Radix UI base, no reemplazar |
| `components/ui/table.tsx` | Base para tablas de datos |
| `lib/utils.ts` (cn) | Función utilitaria base |

---

## ESTIMACIÓN DE TIEMPO

| Tarea | Horas estimadas |
|-------|----------------|
| Setup y mapeo de colores | 2h |
| Hero.tsx migration | 4h |
| PricingPreview.tsx migration | 6h |
| CTA.tsx migration | 3h |
| 3 Feature sections migration | 8h |
| Dashboard KPI cards | 4h |
| QA visual (3 breakpoints) | 4h |
| **TOTAL** | **~31 horas / 1 sprint** |

---

## RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| Template de Tailwind Plus en v3 (no v4) | Baja | Verificar versión al comprar; migrar clases si necesario |
| Conflicto de dark mode | Media | Testear con `@custom-variant dark` antes de integrar |
| Rotura de i18n con textos hardcoded | Alta | Checklist obligatorio por componente |
| LCP peor con imágenes sin optimizar | Alta | Usar `next/image` con `priority` en hero |
