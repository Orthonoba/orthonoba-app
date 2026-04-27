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
- No proponer cambios masivos sin antes hacer un plan en respuesta
