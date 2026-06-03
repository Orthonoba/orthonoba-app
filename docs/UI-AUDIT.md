# UI-AUDIT — ORTHONOBA Design System

**Fecha:** 2026-06-04  
**Auditor:** Claude Code  
**Versión App:** Next.js 16 + Tailwind v4 + next-intl v4  
**Estado final:** CORREGIDO

---

## 1. RESUMEN EJECUTIVO

La aplicación cargaba pero sin identidad visual. Los colores premium (oro, negro, grafito) no aparecían porque el **build cache de `.next/` era anterior a la definición de los tokens en `@theme`**. Adicionalmente, se detectaron 4 problemas estructurales secundarios que se corrigieron.

---

## 2. ERRORES ENCONTRADOS

### CRÍTICO — Tokens de color ausentes del build compilado

**Archivo:** `app/globals.css` → `.next/dev/static/chunks/app_globals_*.css`  
**Síntoma:** `bg-obsidian`, `text-gold`, `bg-panel`, `text-silver` no generaban ninguna regla CSS. Los componentes usaban esas clases pero el navegador no recibía el `background-color` ni `color` correspondiente.  
**Causa:** El archivo `.next/dev/static/chunks/app_globals_*.css` fue inspeccionado y confirmó que `--color-obsidian`, `--color-gold`, `--color-silver` y `--color-panel` **no aparecían en el bloque `@layer theme`**. Solo los tokens de tipografía (`--font-sans`, `--font-mono`) estaban presentes. El build cache era stale — generado antes de que los tokens de color fueran agregados al `@theme`.  
**Impacto:** Toda la identidad visual (fondo negro, textos en oro, panels) era invisible. La página cargaba con estilos por defecto del navegador.

---

### IMPORTANTE — `styles/globals.css` vacío y confuso

**Archivo:** `styles/globals.css`  
**Síntoma:** Archivo de 1 línea (vacío). Nombre idéntico al archivo real `app/globals.css`.  
**Causa:** Residuo de una migración anterior. Ningún layout lo importaba, pero creaba confusión.  
**Estado:** Archivo dejado vacío (no se eliminó para no romper posibles referencias futuras). Documentado en CLAUDE.md.

---

### IMPORTANTE — `autoprefixer` en PostCSS innecesario

**Archivo:** `postcss.config.js`  
**Síntoma:** `autoprefixer` listado como plugin junto a `@tailwindcss/postcss`.  
**Causa:** En Tailwind v4, `@tailwindcss/postcss` ya incluye el manejo de prefijos. `autoprefixer` es redundante y puede causar conflictos en el orden de procesamiento de propiedades CSS.  
**Fix aplicado:** Eliminado `autoprefixer` del config.

---

### AVISO — `app/layout.tsx` sin `<html>` ni `<body>`

**Archivo:** `app/layout.tsx`  
**Síntoma:** El Root Layout retorna solo `{children}` sin estructura HTML.  
**Diagnóstico:** Esto es **intencional y correcto** para el patrón de i18n de next-intl v4. La estructura `<html lang={locale}>` y `<body>` se provee en `app/[locale]/layout.tsx`, lo que permite que el atributo `lang` sea dinámico por idioma. Ver next-intl docs: App Router with i18n routing.  
**Estado:** No requería cambio funcional. Se agregó un comentario explicativo en el archivo para claridad futura.

---

### AVISO — VS Code warning `Unknown at rule @theme`

**Síntoma:** VS Code muestra error en `app/globals.css` para la directiva `@theme`.  
**Causa:** El Language Server de CSS de VS Code no reconoce las directivas específicas de Tailwind v4 (`@theme`, `@source`, `@layer`). Esto es un **falso positivo del editor**, no un error real.  
**Fix:** Instalar la extensión "Tailwind CSS IntelliSense" de Bradlc en VS Code. Esta extensión enseña al editor las directivas de Tailwind v4 y elimina el warning.

---

### AVISO — CSS duplicado importado en dos layouts

**Archivos:** `app/layout.tsx` + `app/[locale]/layout.tsx`  
**Síntoma:** `app/globals.css` era importado desde ambos layouts (`import "./globals.css"` y `import "../globals.css"`).  
**Diagnóstico:** Next.js deduplica CSS globales, por lo que no hay doble carga. Sin embargo, es confuso. Se eliminó el import de `app/layout.tsx` (el root layout ahora solo tiene el comentario explicativo).

---

## 3. ARCHIVOS MODIFICADOS

| Archivo | Tipo de cambio | Descripción |
|---------|---------------|-------------|
| `app/globals.css` | Modificado | Limpieza + comentarios + imports de design tokens |
| `app/layout.tsx` | Modificado | Eliminado import CSS duplicado, agregado comentario |
| `postcss.config.js` | Modificado | Eliminado `autoprefixer` (redundante en Tailwind v4) |
| `components/sections/hero.tsx` | Modificado | Inline styles → `var(--orthonoba-*)` variables |

---

## 4. ARCHIVOS CREADOS

| Archivo | Descripción |
|---------|-------------|
| `styles/design-tokens.css` | Fuente de verdad: `--orthonoba-*` CSS custom properties |
| `styles/colors.css` | Estados interactivos, bordes, opacidades, glass |
| `styles/typography.css` | Escala tipográfica, tracking, line-heights, pesos |
| `styles/spacing.css` | Section gaps, container widths, border-radius |
| `docs/UI-AUDIT.md` | Este archivo |

---

## 5. ARQUITECTURA FINAL DEL SISTEMA DE ESTILOS

```
app/
  globals.css                   ← ENTRY POINT
    @import "tailwindcss"       → Tailwind v4 core
    @import styles/design-tokens.css
    @import styles/colors.css
    @import styles/typography.css
    @import styles/spacing.css
    @theme { ... }              → Genera utilities: bg-obsidian, text-gold, etc.

styles/
  design-tokens.css             ← --orthonoba-* variables en :root
  colors.css                    ← Bordes, estados, glass, gold opacity ramp
  typography.css                ← Font stack, display scale, tracking
  spacing.css                   ← Section gaps, containers, radius
```

---

## 6. CÓMO USAR EL DESIGN SYSTEM

### Via Tailwind classes (preferido)
```tsx
<section className="bg-obsidian pt-24 pb-16">
  <h1 className="text-white text-6xl font-bold tracking-tight">
    Premium <span className="text-gold">Agency</span>
  </h1>
  <p className="text-silver/70 text-lg">Descripción</p>
  <button className="bg-gold text-obsidian hover:bg-gold-light px-6 py-3 rounded-lg font-bold">
    CTA
  </button>
</section>
```

### Via CSS variables (inline styles / gradients)
```tsx
<div style={{
  background: "var(--gradient-gold-subtle)",
  color: "var(--orthonoba-gold)",
}}>
```

### Tabla de equivalencias
```
Clase Tailwind     →  CSS Variable              →  Valor
bg-obsidian        →  --orthonoba-black          →  #050505
bg-panel           →  --orthonoba-panel           →  #0E0E0E
text-gold          →  --orthonoba-gold            →  #D4AF37
bg-gold-light      →  --orthonoba-gold-light      →  #F5C542
text-silver        →  --orthonoba-silver          →  #A1A1AA
text-muted         →  --orthonoba-muted           →  #71717A
```

---

## 7. ACCIÓN REQUERIDA DESPUÉS DE ESTE AUDIT

Para que los cambios tomen efecto en el navegador:

```powershell
# 1. Detener el dev server (Ctrl+C)

# 2. Limpiar el build cache
Remove-Item -Recurse -Force .next

# 3. Reiniciar
npm run dev
```

**Sin este paso**, el navegador seguirá usando el CSS compilado anterior que no tiene los tokens de color.

---

## 8. ESTADO FINAL

| Componente | Estado |
|-----------|--------|
| Tailwind v4 config | ✅ Correcto (`@theme` en `globals.css`, sin `tailwind.config.ts`) |
| Design tokens CSS | ✅ Creados en `styles/` |
| `app/globals.css` | ✅ Limpio, imports correctos, `@theme` completo |
| `app/layout.tsx` | ✅ Correcto para next-intl (pass-through intencional) |
| `app/[locale]/layout.tsx` | ✅ Correcto (`<html lang>` + `<body>`) |
| `postcss.config.js` | ✅ Solo `@tailwindcss/postcss` |
| Inline styles en componentes | ✅ Usan `var(--orthonoba-*)` |
| CLAUDE.md | ✅ Actualizado con Design System section |
| VS Code warning | ℹ️ Instalar Tailwind CSS IntelliSense extension |
