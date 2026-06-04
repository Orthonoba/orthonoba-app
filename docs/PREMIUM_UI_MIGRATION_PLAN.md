# PREMIUM UI MIGRATION PLAN — ORTHONOBA.APP
**Fecha:** 2026-06-04  
**Scope:** Compatibilidad con Tailwind Plus · Compatibilidad con Cruip Pro · Plan de migración visual seguro

---

## ESTADO ACTUAL DEL DESIGN SYSTEM

### Stack CSS Actual
```
Tailwind CSS v4.3.0
├── @theme {} en app/globals.css          (tokens de color/animación)
├── styles/tokens.css                     (variables CSS --orthonoba-*)
├── styles/colors.css                     (estados interactivos)
├── styles/typography.css                 (escala tipográfica)
├── styles/spacing.css                    (espaciado/containers)
└── tw-animate-css                        (animaciones adicionales)
```

### Paleta Principal Actual
| Token              | Valor     |
|--------------------|-----------|
| `--color-obsidian` | `#050505` |
| `--color-panel`    | `#0E0E0E` |
| `--color-gold`     | `#D4AF37` |
| `--color-gold-light`| `#F5C542`|
| `--color-silver`   | `#A1A1AA` |
| `--color-muted`    | `#71717A` |

---

## COMPATIBILIDAD CON TAILWIND PLUS

### ¿Qué es Tailwind Plus?
Tailwind Plus (anteriormente Tailwind UI Pro) es una colección de componentes y templates premium construidos con Tailwind CSS. Se integra como código fuente copiable, no como dependencia npm.

### Análisis de Compatibilidad

| Aspecto                         | Estado      | Notas                                                         |
|---------------------------------|-------------|---------------------------------------------------------------|
| Tailwind CSS v4                 | ✅ Compatible| Tailwind Plus usa v3/v4. Verificar versión del componente     |
| Sintaxis `@theme {}`           | ✅ Compatible| Tailwind Plus v4 usa el mismo patrón                         |
| Variables CSS personalizadas    | ✅ Compatible| Tailwind Plus las respeta                                     |
| Componentes React / JSX         | ✅ Compatible| Tailwind Plus entrega código copiable                         |
| Dark mode con `@custom-variant` | 🟡 Verificar | Tailwind Plus puede usar `.dark` class vs `media` query       |
| Nombres de colores personalizados| ⚠️ Conflicto| Tailwind Plus asume colores estándar (slate, zinc, etc.)      |
| shadcn/ui coexistencia          | 🟡 Verificar | Posibles colisiones de nombres de variables CSS               |

### Conflictos Potenciales con Tailwind Plus

#### Conflicto 1: Variables de color
Tailwind Plus asume nombres estándar de colores Tailwind (`gray-900`, `zinc-800`, etc.).  
Orthonoba usa nombres personalizados (`obsidian`, `panel`, `gold`).

**Impacto:** Los componentes de Tailwind Plus copiados necesitarán remapeo de clases.

**Solución:** Crear un archivo de mapeo:
```css
/* styles/tw-plus-compat.css */
@theme {
  --color-gray-900: var(--color-panel);
  --color-gray-800: var(--color-panel-2);
  --color-gray-700: var(--color-panel-3);
  --color-white: #FFFFFF;
  --color-black: var(--color-obsidian);
}
```

#### Conflicto 2: Dark mode
Orthonoba usa `@custom-variant dark (&:is(.dark *))` en globals.css.  
Tailwind Plus puede asumir `dark:` con `media` o `class` strategy.

**Solución:** Verificar que `@custom-variant dark` sea compatible con los componentes que se integren.

---

### Score de Compatibilidad Tailwind Plus: **82/100**

Los componentes de Tailwind Plus son código HTML/JSX reutilizable. La integración es viable pero requiere adaptar los nombres de color. No hay bloqueos técnicos.

---

## COMPATIBILIDAD CON CRUIP PRO

### ¿Qué es Cruip Pro?
Cruip Pro es una biblioteca de templates y componentes UI premium para SaaS y apps de marketing, construidos con Tailwind CSS. Ofrece React/Next.js templates listos para usar.

### Análisis de Compatibilidad

| Aspecto                          | Estado        | Notas                                                       |
|----------------------------------|---------------|-------------------------------------------------------------|
| Next.js App Router               | ✅ Compatible  | Cruip Pro soporta App Router en versiones recientes         |
| Tailwind CSS v4                  | 🟡 Verificar  | Cruip Pro puede estar en v3. Revisar versión exacta         |
| TypeScript                       | ✅ Compatible  | Cruip Pro entrega componentes en TS                         |
| React 19                         | 🟡 Verificar  | Verificar si Cruip Pro es compatible con React 19           |
| shadcn/ui coexistencia           | ⚠️ Conflicto  | Ambos usan variables CSS `--background`, `--foreground`, etc. |
| Variables CSS de Cruip           | ⚠️ Conflicto  | Cruip usa nombres genéricos que colisionan con shadcn       |
| `tw-animate-css`                | ✅ Compatible  | Ya instalado en el proyecto                                 |

### Conflictos Potenciales con Cruip Pro

#### Conflicto 1: Variables CSS de shadcn vs Cruip
Shadcn usa:
```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 221.2 83.2% 53.3%;
```

Cruip Pro puede usar variables similares con valores diferentes. Al importar ambos, las últimas definiciones ganan.

**Solución:**
```css
/* Aislar Cruip Pro en un namespace */
.cruip-component {
  --background: /* valor Cruip */;
  --foreground: /* valor Cruip */;
}
```

#### Conflicto 2: Fuentes
Cruip puede asumir una fuente específica. Orthonoba usa Inter vía `--font-inter`.

**Solución:** Verificar `font-sans` en el template de Cruip y remapear si es necesario.

#### Conflicto 3: Tailwind v3 vs v4
Si Cruip Pro está construido con Tailwind v3:
- No usa `@theme {}` sino `tailwind.config.js`
- Las utilidades como `bg-primary` pueden no funcionar en v4 sin adaptación

**Solución:** Revisar la versión de Tailwind usada en el template Cruip Pro específico antes de integrar.

---

### Score de Compatibilidad Cruip Pro: **68/100**

La integración de Cruip Pro requiere más trabajo de adaptación que Tailwind Plus. Los conflictos de variables CSS con shadcn son el mayor riesgo. Viable pero requiere sprint dedicado.

---

## PLAN DE MIGRACIÓN VISUAL SEGURO

### Principios
1. **No eliminar** ningún componente existente
2. **Añadir en paralelo**, no reemplazar directamente
3. **Probar en rama separada** antes de mergear
4. **Un componente a la vez** (no migración en bloque)

---

### FASE 1 — Preparación (1-2 días)
**Sin riesgo — no toca código de producción**

- [ ] Crear rama `feat/ui-migration`
- [ ] Instalar Tailwind Plus y/o adquirir Cruip Pro
- [ ] Analizar las variables CSS de los templates nuevos
- [ ] Crear `styles/tw-plus-compat.css` con los mapeos necesarios
- [ ] Verificar versión de Tailwind en templates comprados

---

### FASE 2 — Compatibilidad Base (2-3 días)
**Riesgo bajo — solo CSS, no afecta lógica**

- [ ] Resolver conflicto de variables CSS entre shadcn / Cruip / Orthonoba
- [ ] Crear namespace CSS para componentes importados de Cruip
- [ ] Verificar dark mode con nuevos componentes
- [ ] Probar fuentes en templates nuevos

---

### FASE 3 — Migración de Componentes Marketing (3-5 días)
**Riesgo medio — reemplaza secciones visuales**

Orden recomendado (de menos a más crítico):
1. `Hero.tsx` → reemplazar con version Tailwind Plus/Cruip
2. `PricingPreview.tsx` → componente clave para conversión
3. `MetricsSection.tsx` → componente decorativo, bajo riesgo
4. `CTA.tsx` → componente de conversión
5. `Services.tsx`, `Industries.tsx` → secciones descriptivas
6. `Header.tsx` / `Footer.tsx` → con más cuidado, son globales

---

### FASE 4 — Migración de Dashboard UI (5-7 días)
**Riesgo alto — afecta UX del producto principal**

- [ ] Sidebar navigation
- [ ] Cards de métricas/analytics
- [ ] Tablas de datos (contacts, leads, agents)
- [ ] Formularios (onboarding, settings)
- [ ] Modales y drawers

---

### FASE 5 — QA y Regresión (2-3 días)
- [ ] Test visual en Chrome, Firefox, Safari
- [ ] Test en móvil (375px, 390px, 414px)
- [ ] Test en tablet (768px, 1024px)
- [ ] Test accesibilidad básica (contraste, keyboard nav)
- [ ] Verificar que todas las rutas del ROUTES_REPORT funcionan
- [ ] Test de flujos críticos (login, onboarding, checkout Stripe)

---

## CHECKLIST PREVIO A PRODUCCIÓN

### Código
- [ ] `typescript.ignoreBuildErrors` eliminado de `next.config.ts`
- [ ] `tsc --noEmit` pasa sin errores
- [ ] `npm run lint` pasa sin errores
- [ ] No hay `console.log` con datos sensibles
- [ ] No hay API keys hardcodeadas

### Seguridad
- [ ] `middleware.ts` creado y protegiendo `/dashboard/*`
- [ ] Rate limiting en endpoints públicos
- [ ] Verificación de firma en webhook de Stripe
- [ ] Verificación de token en webhook de WhatsApp
- [ ] `JWT_SECRET` rotado para producción
- [ ] CORS configurado correctamente

### Base de Datos
- [ ] `prisma migrate deploy` ejecutado en producción (no `migrate dev`)
- [ ] `prisma generate` ejecutado post-deploy
- [ ] Backup de la DB antes del primer deploy
- [ ] Pool de conexiones configurado para serverless (Neon)

### Stripe
- [ ] Usando `sk_live_*` (no `sk_test_*`) en producción
- [ ] Webhook endpoint registrado en Stripe Dashboard
- [ ] Precios creados en Stripe y IDs en variables de entorno
- [ ] Test del flujo completo de checkout en staging

### WhatsApp
- [ ] Webhook URL registrada en Meta Developer Console
- [ ] `WHATSAPP_VERIFY_TOKEN` configurado
- [ ] Test de envío/recepción de mensajes
- [ ] Número de teléfono verificado en Meta Business

### Vercel
- [ ] Variables de entorno configuradas en Vercel Dashboard
- [ ] Dominio personalizado configurado
- [ ] SSL activo
- [ ] `NEXT_PUBLIC_APP_URL` apunta al dominio de producción
- [ ] Build exitoso en Vercel (`npm run build` sin errores)

### Performance
- [ ] Imágenes optimizadas con `next/image`
- [ ] Fonts cargadas con `next/font`
- [ ] No hay imports de librerías completas (tree-shaking activo)
- [ ] Cache headers configurados

### SEO
- [ ] `app/sitemap.ts` incluye todas las rutas públicas
- [ ] Meta tags configurados en cada página
- [ ] `robots.txt` presente en `/public`
- [ ] Open Graph images configuradas

---

## RIESGOS DETECTADOS (RESUMEN)

| ID   | Riesgo                                      | Severidad | Impacto                                    |
|------|---------------------------------------------|-----------|---------------------------------------------|
| R-01 | `ignoreBuildErrors: true`                   | 🔴 Crítico | Errores TypeScript silenciados en producción |
| R-02 | Sin `middleware.ts`                         | 🔴 Crítico | Dashboard accesible sin autenticación        |
| R-03 | Sin tests automatizados                     | 🔴 Crítico | Regresiones no detectadas                    |
| R-04 | Duplicación de librerías JWT                | 🟠 Alto   | Inconsistencia en manejo de tokens           |
| R-05 | Conflictos CSS shadcn/Cruip Pro             | 🟠 Alto   | Diseño roto al integrar componentes externos |
| R-06 | Falta `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`  | 🟠 Alto   | Stripe frontend no funcional                 |
| R-07 | Variables WhatsApp incompletas              | 🟠 Alto   | Integración WhatsApp parcialmente funcional  |
| R-08 | Sin rate limiting en endpoints públicos     | 🟠 Alto   | Vulnerabilidad a abuse/DDoS                  |
| R-09 | `module.exports` en `.ts`                  | 🟡 Medio  | Inconsistencia ESM/CJS                       |
| R-10 | Rutas auth sin locale                       | 🟡 Medio  | Experiencia multi-idioma inconsistente       |
| R-11 | `tasks/` y `test/` generan rutas públicas  | 🟡 Medio  | Exposición de código de pruebas              |
| R-12 | Tailwind Plus v3 vs v4                      | 🟡 Medio  | Incompatibilidad si template es v3           |
| R-13 | `three.js` declarado pero no instalado      | 🟡 Medio  | Visor 3D no funcional                        |
| R-14 | Sin `zod` para validación                  | 🟡 Medio  | Validación de inputs manual, propenso a bugs |
| R-15 | Sin servicio de email configurado           | 🟡 Medio  | Forgot-password no funcional en producción   |
