# TAILWIND PLUS MIGRATION V2 — ORTHONOBA.APP
**Fecha:** 2026-06-04 | **Fase F** | NO instalar aún

---

## ESTADO: Plan de migración. Tailwind Plus NO instalado.

---

## MÓDULOS DEL DASHBOARD A MIGRAR

Los siguientes módulos tienen UI placeholder. Tailwind Plus aportará componentes de aplicación premium.

### PRIORIDAD 1 — Módulos con datos reales próximamente

#### `/dashboard/billing`
**Componente Tailwind Plus:** Application UI → Description Lists + Billing
```
Diseñar:
  [ ] Plan actual con badge tier (FREE/STARTER/PRO...)
  [ ] Próxima fecha de facturación
  [ ] Historial de facturas (tabla con PDF link)
  [ ] Botón "Cambiar plan" → Stripe Portal
  [ ] Botón "Gestionar suscripción"
  [ ] Indicador de uso (conversations, agents, storage)
  [ ] Banner de upgrade si está cerca del límite
```

#### `/dashboard/analytics`
**Componente Tailwind Plus:** Application UI → Stats + Charts
```
Diseñar:
  [ ] 4 KPI cards: Conversations, AI Messages, Leads, Revenue
  [ ] Línea de tendencia por semana
  [ ] Top 3 agentes por resolución
  [ ] Gráfico de canales (WhatsApp vs Chat vs Voice)
  [ ] Cost tracking por modelo de IA
  [ ] Tabla de eventos recientes
```

#### `/dashboard/settings`
**Componente Tailwind Plus:** Application UI → Forms + Settings
```
Diseñar:
  [ ] Sección: Información de la organización
  [ ] Sección: Configuración del equipo (invitar miembros)
  [ ] Sección: Integraciones (WhatsApp, Stripe, Twilio)
  [ ] Sección: API Keys
  [ ] Sección: Zona de peligro (eliminar organización)
  [ ] Upload de logo con preview
```

---

### PRIORIDAD 2 — Módulos CRM

#### `/dashboard/leads`
**Componente Tailwind Plus:** Application UI → Kanban / Lists
```
Diseñar:
  [ ] Vista Kanban: NEW → CONTACTED → QUALIFIED → PROPOSAL → WON/LOST
  [ ] Vista tabla con filtros
  [ ] Card de lead con: nombre, empresa, valor, assigned to, fecha
  [ ] Quick actions: cambiar estado, asignar, agregar nota
  [ ] Filtros: estado, asignado a, fecha, valor
  [ ] Búsqueda global
```

#### `/dashboard/contacts`
**Componente Tailwind Plus:** Application UI → Tables
```
Diseñar:
  [ ] Tabla paginada (25/página) con search
  [ ] Columnas: nombre, email, empresa, teléfono, fecha creación
  [ ] Click para abrir detalle del contacto
  [ ] Import CSV (diseño de UI, lógica después)
  [ ] Export (pendiente)
  [ ] Filtros: industry, país, fecha
```

---

### PRIORIDAD 3 — Módulos de comunicación

#### `/dashboard/conversations`
**Componente Tailwind Plus:** Application UI → Lists
```
Diseñar:
  [ ] Lista de conversaciones con: canal icon, nombre, último mensaje, fecha
  [ ] Badge de canal (WhatsApp/Chat/Voice/Email)
  [ ] Status badge (OPEN/CLOSED/PENDING)
  [ ] Click → abrir hilo de conversación
  [ ] Filtro por canal y estado
  [ ] Count badge en sidebar
```

#### `/dashboard/whatsapp`
**Componente Tailwind Plus:** Application UI → Settings + Descriptions
```
Diseñar:
  [ ] Estado de cuenta conectada (phone number, WABA ID)
  [ ] Botón conectar nueva cuenta
  [ ] Estadísticas: mensajes enviados/recibidos hoy
  [ ] Lista de templates activos
  [ ] Configurar agente por defecto para WhatsApp
```

#### `/dashboard/voice`
**Componente Tailwind Plus:** Application UI → Stats + Tables
```
Diseñar:
  [ ] KPIs: Total Calls, Avg Duration, Resolution Rate
  [ ] Tabla de llamadas recientes: número, duración, estado, agente
  [ ] Play recording (si está disponible)
  [ ] Transcript por llamada
  [ ] Número Twilio activo + estado
  [ ] Configurar agente de voz
```

#### `/dashboard/agents`
**Componente Tailwind Plus:** Application UI → Cards + Forms
```
Diseñar:
  [ ] Grid de agentes: card con nombre, tipo, modelo, canal, status
  [ ] Toggle para activar/desactivar
  [ ] Botón "Editar" → modal/drawer con todos los campos
  [ ] Botón "Crear agente" → wizard de 3 pasos
  [ ] Badge de conversaciones activas por agente
  [ ] Indicador de uso de tokens del mes
```

---

## PROCESO DE INTEGRACIÓN POR MÓDULO

```
Para cada módulo:

1. Seleccionar componente de Tailwind Plus Application UI
2. Copiar HTML/JSX del componente
3. Adaptar colores:
   bg-white → bg-panel
   bg-gray-50 → bg-panel-2
   text-gray-900 → text-white
   text-gray-500 → text-silver
   bg-indigo-600 → bg-gold
   ring-indigo-500 → ring-gold
4. Conectar con datos reales (queries Prisma)
5. Agregar paginación donde corresponda
6. Test en 375px / 768px / 1280px
```

---

## COMPATIBILIDAD TÉCNICA

| Aspecto | Estado |
|---------|--------|
| Tailwind CSS v4 | ✅ Compatible (templates v4 disponibles) |
| Next.js App Router | ✅ Compatible |
| React 19 | ✅ Compatible |
| shadcn/ui coexistencia | ✅ Sin conflicto (distintas variables) |
| Dark mode `@custom-variant` | ✅ Funciona con `.dark` class |
| next-intl | Adaptar strings hardcoded manualmente |

---

## ESTIMACIÓN

| Módulo | Horas |
|--------|-------|
| Billing | 6h |
| Analytics | 8h |
| Settings | 8h |
| Leads (Kanban) | 10h |
| Contacts | 6h |
| Conversations | 6h |
| WhatsApp | 5h |
| Voice | 7h |
| Agents | 7h |
| **TOTAL** | **~63h / 2 sprints** |
