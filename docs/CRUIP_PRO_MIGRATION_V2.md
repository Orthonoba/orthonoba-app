# CRUIP PRO MIGRATION V2 — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase G** | NO instalar aún

---

## ESTADO: Plan de migración. Cruip Pro NO instalado.

---

## PÁGINAS DE MARKETING A MIGRAR

### PRIORIDAD 1 — Conversión crítica

#### `/{locale}` — Homepage
**Componente Cruip recomendado:** Stellar / Landing SaaS
```
Secciones a migrar:
  [ ] Hero: headline + CTA + screenshot del dashboard
  [ ] Métricas: 3-4 números de impacto (conversaciones, leads, uptime)
  [ ] Features: 6 cards con iconos (AI Agents, WhatsApp, Voice, CRM, Analytics, Automations)
  [ ] How it works: 3 pasos animados
  [ ] Testimonials: 3 empresas (cuando existan clientes reales)
  [ ] Pricing preview: 3 tiers con CTA
  [ ] Final CTA: "Empezar gratis 14 días"

REGLA: No inventar métricas ni testimoniales.
Usar placeholders honestos hasta tener datos reales.
```

#### `/{locale}/pricing`
**Componente Cruip recomendado:** Pricing con toggle mensual/anual
```
Diseñar:
  [ ] Toggle Mensual / Anual (descuento del 20%)
  [ ] 4 tiers visibles: STARTER, PRO, BUSINESS + ENTERPRISE (custom)
  [ ] Features list por tier
  [ ] CTA: "Empezar gratis" → /register
  [ ] FAQ de preguntas frecuentes (6-8 preguntas)
  [ ] Comparativa completa en tabla al fondo
```

---

### PRIORIDAD 2 — SEO y captación

#### `/{locale}/services`
**Componente Cruip:** Features grid + alternating sections
```
  [ ] Header con hero de servicios
  [ ] Grid 2x3: AI Agents, Voice, WhatsApp, CRM, Analytics, Automations
  [ ] Cada servicio: icono + título + descripción + link a detalle
  [ ] CTA final: "Ver planes" → /pricing
```

#### `/{locale}/services/[slug]`
**Template:** Landing de servicio individual
```
Servicios a cubrir (dinámico desde slug):
  - ai-agents, voice-center, whatsapp-business, crm, analytics, automations
Estructura:
  [ ] Hero del servicio
  [ ] Beneficios (3-4 puntos)
  [ ] Cómo funciona (steps)
  [ ] Casos de uso
  [ ] CTA con demostración
```

#### `/{locale}/solutions`
**Componente Cruip:** Feature sections por industria
```
  [ ] Hero con propuesta de valor por sector
  [ ] Grid de industrias con iconos
  [ ] Link a página de industria específica
```

#### `/{locale}/solutions/[slug]`
```
Soluciones verticales:
  - digital-agency, dental-practice, medical-clinic, legal-firm,
    real-estate, hospitality, financial-services
Estructura: Hero + Benefits + How it works + Case study + CTA
```

#### `/{locale}/industries/[slug]`
```
Similar a solutions pero enfocado en el sector, no en Orthonoba.
Content marketing para SEO.
```

---

### PRIORIDAD 3 — Autoridad y confianza

#### `/{locale}/blog`
**Componente Cruip:** Blog grid + sidebar
```
  [ ] Grid de artículos con: imagen, categoría, título, extracto, fecha
  [ ] Filtro por categoría
  [ ] Search
  [ ] Newsletter CTA
  [ ] Artículos relacionados

NOTA: Implementar con MDX o Sanity CMS para contenido dinámico.
```

#### `/{locale}/case-studies`
**Componente Cruip:** Case study cards + detail page
```
  [ ] Grid de casos: logo empresa, industria, resultado principal
  [ ] Página detalle: problema, solución, resultados con métricas
  [ ] Testimonial del cliente
  [ ] CTA "Ver cómo funciona"

NOTA: Solo publicar casos reales con permiso del cliente.
```

#### `/{locale}/portfolio`
**Componente Cruip:** Masonry grid o filterable portfolio
```
  [ ] Grid de proyectos: imagen, nombre, categoría, tecnologías
  [ ] Filtro: AI, Automations, WhatsApp, Voice, CRM
  [ ] Detalle de proyecto
```

---

### PRIORIDAD 4 — Conversión directa

#### `/{locale}/contact`
**Componente Cruip:** Split contact form
```
  [ ] Formulario: nombre, email, empresa, mensaje
  [ ] Info de contacto: email, teléfono, ubicación
  [ ] Mapa (opcional)
  [ ] Validado con Zod (contactFormSchema — ya existe)
  [ ] POST /api/v1/contact (ya implementado)
```

#### `/{locale}/consultation`
**Componente Cruip:** Booking/demo form
```
  [ ] Form de solicitud de consultoría
  [ ] Calendario de disponibilidad (Calendly embed o similar)
  [ ] Confirmación automática por email
  [ ] POST /api/v1/demo-request (ya implementado)
```

---

## PROCESO DE INTEGRACIÓN CRUIP PRO

### Pre-requisitos
```bash
# 1. Adquirir Cruip Pro en cruip.com
# 2. Identificar versión de Tailwind (v3 vs v4)
# 3. Crear rama
git checkout -b feat/cruip-pro-marketing
```

### Variables CSS — Namespace obligatorio

Para evitar conflictos con shadcn/ui del dashboard:
```css
/* styles/cruip-scope.css */
.cruip-page {
  --background: var(--color-obsidian);
  --foreground: #ffffff;
  --primary: var(--color-gold);
  --primary-foreground: var(--color-obsidian);
  --muted: var(--color-panel-2);
  --border: var(--color-ono-border);
  --radius: 0.5rem;
}
```

```tsx
// app/[locale]/layout.tsx — añadir clase al body
<body className="cruip-page">
  {children}
</body>
```

### Si template es Tailwind v3
```js
// tailwind.config.js v3 de Cruip → convertir a globals.css v4:
// colors.brand.500: '#D4AF37' → @theme { --color-brand-500: #D4AF37; }
// Solo afecta clases custom del template, las estándar son compatibles
```

---

## CHECKLIST POR PÁGINA CRUIP

- [ ] Rama `feat/cruip-pro-marketing` activa
- [ ] Colores remapeados a paleta Orthonoba
- [ ] CSS scope `.cruip-page` aplicado
- [ ] Strings de UI en `src/locales/{locale}/common.json`
- [ ] Links usan `Link` de `next-intl` (no `<a href>`)
- [ ] Imágenes con `next/image` y `priority` en LCP
- [ ] Test móvil (375px) y desktop (1280px)
- [ ] No hay datos inventados (métricas, testimoniales)
- [ ] CSP no bloquea recursos del template
- [ ] Lighthouse > 85 en Performance y SEO

---

## COMPATIBILIDAD TÉCNICA

| Aspecto | Estado |
|---------|--------|
| Next.js 16 App Router | ✅ Cruip Pro soporta App Router |
| React 19 | ✅ Verificar en release notes de Cruip |
| Tailwind v4 | 🟡 Depende del template (verificar antes de comprar) |
| next-intl | Adaptar strings hardcoded |
| shadcn/ui (dashboard) | ✅ Aislado con `.cruip-page` scope |
| CSP headers | Verificar que recursos de Cruip no sean bloqueados |

---

## ALTERNATIVA A CRUIP PRO (si hay incompatibilidades)

Si Cruip Pro tiene problemas de compatibilidad con Tailwind v4:

| Alternativa | Ventaja | URL |
|-------------|---------|-----|
| **Tailwind Plus** (marketing) | Mismo ecosistema Tailwind, v4 garantizado | tailwindplus.com |
| **shadcn/ui blocks** | Ya integrado, gratuito | ui.shadcn.com/blocks |
| **Aceternity UI** | Animaciones premium, React 19 | ui.aceternity.com |
| **Magic UI** | Componentes hero modernos | magicui.design |

---

## ESTIMACIÓN

| Página / Sección | Horas |
|------------------|-------|
| Homepage completa | 10h |
| Pricing page | 6h |
| Services + slug | 8h |
| Solutions + slug | 8h |
| Industries slugs | 6h |
| Blog (estructura) | 6h |
| Case Studies | 6h |
| Contact + Consultation | 5h |
| Portfolio | 5h |
| QA visual completo | 8h |
| **TOTAL** | **~68h / 2 sprints** |
