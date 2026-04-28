"use client";

import Link from "next/link";
import { useState } from "react";

/* ═══════════════════════════════════════════════════
   ORTHONOBA — Solicitar Demo Page
   ═══════════════════════════════════════════════════ */

const C = {
  amber: "#f59e0b",
  amberLight: "#fbbf24",
  orange: "#f97316",
  green: "#10b981",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  dark: "#020617",
  navy: "#0f172a",
  navyMid: "#1e293b",
  muted: "#64748b",
  border: "#e2e8f0",
  light: "#f8fafc",
  slate: "#334155",
};

const ROLES = [
  { id: "clinica", label: "Clínica / Consultorio", icon: "🏥", desc: "Orthodoncistas, odontólogos generales y especialistas" },
  { id: "laboratorio", label: "Laboratorio Dental", icon: "⚗️", desc: "Laboratorios de prótesis, ortodoncia y aligners" },
  { id: "ambos", label: "Clínica + Laboratorio", icon: "🔗", desc: "Gestiono clínica propia y laboratorio" },
  { id: "grupo", label: "Grupo / Cadena", icon: "🏢", desc: "Red de clínicas o laboratorios" },
];

const CHALLENGES = [
  "Pedidos y comunicación con el laboratorio",
  "Historial clínico y trazabilidad de casos",
  "Facturación y cobros",
  "Agenda y turnos de pacientes",
  "Seguimiento de tratamientos activos",
  "Reportes y analíticas del negocio",
  "Integración con herramientas actuales",
  "Acceso remoto a la información",
];

const STAFF_OPTIONS = ["Solo yo", "2–5 personas", "6–15 personas", "16–30 personas", "+30 personas"];
const TIME_OPTIONS = [
  "Mañana (9:00–12:00)",
  "Mediodía (12:00–14:00)",
  "Tarde (14:00–18:00)",
  "Cualquier horario",
];

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  rol: string;
  staff: string;
  desafios: string[];
  horario: string;
  mensaje: string;
};

const INITIAL: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  rol: "",
  staff: "",
  desafios: [],
  horario: "",
  mensaje: "",
};

/* ─── SIDEBAR ─── */
function Sidebar() {
  const items = [
    { icon: "🎯", title: "Demo personalizada", desc: "Adaptada a tu tipo de práctica, no una presentación genérica." },
    { icon: "⏱️", title: "30 minutos, sin rodeos", desc: "Mostramos exactamente las funciones que necesitás." },
    { icon: "🆓", title: "Sin costo ni compromiso", desc: "La demo es gratuita. Sin contratos ni tarjeta de crédito." },
    { icon: "🇦🇷", title: "Equipo en tu idioma", desc: "Soporte en español, zona horaria argentina." },
  ];

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(160deg, ${C.dark} 0%, ${C.navy} 55%, #0d1f3c 100%)`,
        padding: "56px 48px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100%",
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.14) 0%, transparent 70%)",
          filter: "blur(48px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${C.amber}, ${C.orange})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 900,
              color: "#000",
            }}
          >
            O
          </div>
          <span style={{ fontSize: 18, fontWeight: 900, color: "#fff", letterSpacing: "-0.03em" }}>
            ORTHONOBA
          </span>
        </Link>

        {/* Headline */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            borderRadius: 100,
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.25)",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.green,
              boxShadow: `0 0 8px ${C.green}`,
            }}
          />
          <span style={{ fontSize: 12, color: C.amberLight, fontWeight: 700, letterSpacing: "0.05em" }}>
            DEMO GRATUITA · SIN COMPROMISO
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(26px, 3vw, 36px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          Conocé ORTHONOBA{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${C.amber}, ${C.orange})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            en acción
          </span>
        </h1>
        <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.7, marginBottom: 44, maxWidth: 360 }}>
          Un especialista te va a mostrar, en vivo, cómo ORTHONOBA transforma la gestión de tu clínica o laboratorio.
        </p>

        {/* Value props */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {items.map((item) => (
            <div key={item.title} style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#f1f5f9", marginBottom: 3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social proof */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: 48,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ display: "flex", gap: 32 }}>
          {[
            { value: "+500", label: "Profesionales" },
            { value: "98%", label: "Satisfacción" },
            { value: "3×", label: "Más productivo" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 22, fontWeight: 900, color: C.amberLight, letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#475569", marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SUCCESS STATE ─── */
function SuccessScreen({ nombre }: { nombre: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "64px 48px",
        textAlign: "center",
        minHeight: "100%",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: `${C.green}18`,
          border: `2px solid ${C.green}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          marginBottom: 24,
        }}
      >
        ✅
      </div>
      <h2
        style={{
          fontSize: 28,
          fontWeight: 900,
          color: C.navy,
          letterSpacing: "-0.03em",
          marginBottom: 12,
        }}
      >
        ¡Gracias, {nombre.split(" ")[0]}!
      </h2>
      <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.7, maxWidth: 380, marginBottom: 36 }}>
        Recibimos tu solicitud. Un especialista de ORTHONOBA te va a contactar en las próximas{" "}
        <strong style={{ color: C.slate }}>24 horas hábiles</strong> para coordinar tu demo personalizada.
      </p>

      <div
        style={{
          background: C.light,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: "20px 28px",
          marginBottom: 36,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 800, color: C.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          ¿Qué sigue?
        </div>
        {[
          "Revisamos tu solicitud y perfil",
          "Te contactamos para confirmar horario",
          "Demo en vivo de 30 min vía videollamada",
          "Propuesta personalizada sin compromiso",
        ].map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < 3 ? 10 : 0 }}>
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: `${C.amber}20`,
                border: `1.5px solid ${C.amber}40`,
                color: C.amber,
                fontSize: 11,
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: 13.5, color: C.slate }}>{step}</span>
          </div>
        ))}
      </div>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 28px",
          borderRadius: 12,
          background: `linear-gradient(135deg, ${C.amber}, ${C.orange})`,
          color: "#000",
          fontWeight: 800,
          fontSize: 14,
          textDecoration: "none",
        }}
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}

/* ─── FORM ─── */
export default function SolicitarDemoPage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function toggleDesafio(d: string) {
    setForm((f) => ({
      ...f,
      desafios: f.desafios.includes(d) ? f.desafios.filter((x) => x !== d) : [...f.desafios, d],
    }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) e.nombre = "Tu nombre es requerido";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email válido requerido";
    if (!form.telefono.trim()) e.telefono = "Tu teléfono es requerido";
    if (!form.empresa.trim()) e.empresa = "El nombre de tu práctica es requerido";
    if (!form.rol) e.rol = "Seleccioná tu tipo de práctica";
    if (!form.staff) e.staff = "Indicá la cantidad de personal";
    if (!form.horario) e.horario = "Elegí un horario preferido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    height: 50,
    padding: "0 16px",
    borderRadius: 12,
    border: `1.5px solid ${C.border}`,
    background: "#fff",
    fontSize: 14.5,
    color: C.navy,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box",
  };

  const labelBase: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 700,
    color: C.slate,
    marginBottom: 7,
    letterSpacing: "-0.01em",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 5,
    fontWeight: 600,
  };

  function Field({
    label,
    field,
    type = "text",
    placeholder,
    required,
  }: {
    label: string;
    field: keyof FormData;
    type?: string;
    placeholder?: string;
    required?: boolean;
  }) {
    return (
      <div>
        <label style={labelBase}>
          {label}
          {required && <span style={{ color: C.amber, marginLeft: 3 }}>*</span>}
        </label>
        <input
          type={type}
          value={form[field] as string}
          onChange={(e) => set(field, e.target.value)}
          placeholder={placeholder}
          style={{
            ...inputBase,
            borderColor: errors[field] ? "#fca5a5" : C.border,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = C.amber;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${C.amber}18`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = errors[field] ? "#fca5a5" : C.border;
            e.currentTarget.style.boxShadow = "none";
          }}
        />
        {errors[field] && <p style={errorStyle}>{errors[field]}</p>}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 72px)",
        display: "grid",
        gridTemplateColumns: "420px 1fr",
        background: C.light,
      }}
    >
      {/* LEFT — Sidebar */}
      <Sidebar />

      {/* RIGHT — Form or Success */}
      <div
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {submitted ? (
          <SuccessScreen nombre={form.nombre} />
        ) : (
          <div style={{ padding: "52px 52px 64px", maxWidth: 680 }}>
            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 800,
                  color: C.amber,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: 10,
                }}
              >
                Solicitud de demo
              </span>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: C.navy,
                  letterSpacing: "-0.03em",
                  marginBottom: 8,
                }}
              >
                Completá el formulario
              </h2>
              <p style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.65 }}>
                Cuanto más sepamos de tu práctica, más personalizada y útil será tu demo.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* ── DATOS PERSONALES ── */}
              <SectionLabel>Tus datos</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
                <Field label="Nombre completo" field="nombre" placeholder="Ej: Dra. Valentina Torres" required />
                <Field label="Email profesional" field="email" type="email" placeholder="nombre@clinica.com" required />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 32 }}>
                <Field label="Teléfono / WhatsApp" field="telefono" type="tel" placeholder="+54 11 0000-0000" required />
                <Field label="Nombre de tu clínica / laboratorio" field="empresa" placeholder="Ej: Clínica OrthoSonrisa" required />
              </div>

              {/* ── TIPO DE PRÁCTICA ── */}
              <SectionLabel>Tipo de práctica</SectionLabel>
              {errors.rol && <p style={{ ...errorStyle, marginBottom: 10 }}>{errors.rol}</p>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {ROLES.map((r) => {
                  const selected = form.rol === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => set("rol", r.id)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "16px 18px",
                        borderRadius: 14,
                        border: selected ? `2px solid ${C.amber}` : `1.5px solid ${C.border}`,
                        background: selected ? `${C.amber}0c` : "#fff",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{r.icon}</span>
                      <div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: selected ? C.navy : C.slate,
                            marginBottom: 3,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {r.label}
                        </div>
                        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{r.desc}</div>
                      </div>
                      {selected && (
                        <span
                          style={{
                            marginLeft: "auto",
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: C.amber,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11,
                            color: "#000",
                            fontWeight: 900,
                            flexShrink: 0,
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* ── EQUIPO ── */}
              <SectionLabel>¿Cuántas personas trabajan en tu práctica?</SectionLabel>
              {errors.staff && <p style={{ ...errorStyle, marginBottom: 10 }}>{errors.staff}</p>}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {STAFF_OPTIONS.map((opt) => {
                  const selected = form.staff === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("staff", opt)}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 100,
                        border: selected ? `2px solid ${C.amber}` : `1.5px solid ${C.border}`,
                        background: selected ? `${C.amber}12` : "#fff",
                        color: selected ? C.navy : C.muted,
                        fontSize: 13.5,
                        fontWeight: selected ? 800 : 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* ── DESAFÍOS ── */}
              <SectionLabel>
                ¿Cuáles son tus principales desafíos? <OptLabel>(Elegí todos los que apliquen)</OptLabel>
              </SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
                {CHALLENGES.map((d) => {
                  const checked = form.desafios.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDesafio(d)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "11px 14px",
                        borderRadius: 12,
                        border: checked ? `1.5px solid ${C.blue}44` : `1.5px solid ${C.border}`,
                        background: checked ? `${C.blue}09` : "#fff",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s",
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 5,
                          border: checked ? `2px solid ${C.blue}` : `1.5px solid ${C.border}`,
                          background: checked ? C.blue : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 10,
                          color: "#fff",
                          fontWeight: 900,
                          transition: "all 0.15s",
                        }}
                      >
                        {checked ? "✓" : ""}
                      </span>
                      <span style={{ fontSize: 13, color: checked ? C.slate : C.muted, fontWeight: checked ? 600 : 400 }}>
                        {d}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* ── HORARIO ── */}
              <SectionLabel>Horario preferido para la demo</SectionLabel>
              {errors.horario && <p style={{ ...errorStyle, marginBottom: 10 }}>{errors.horario}</p>}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {TIME_OPTIONS.map((opt) => {
                  const selected = form.horario === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("horario", opt)}
                      style={{
                        padding: "9px 18px",
                        borderRadius: 100,
                        border: selected ? `2px solid ${C.purple}` : `1.5px solid ${C.border}`,
                        background: selected ? `${C.purple}12` : "#fff",
                        color: selected ? C.navy : C.muted,
                        fontSize: 13.5,
                        fontWeight: selected ? 800 : 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* ── MENSAJE OPCIONAL ── */}
              <SectionLabel>
                ¿Algo más que quieras contarnos? <OptLabel>(Opcional)</OptLabel>
              </SectionLabel>
              <textarea
                value={form.mensaje}
                onChange={(e) => set("mensaje", e.target.value)}
                placeholder="Ej: Uso actualmente X software, tengo N pacientes activos, me interesa especialmente la integración con laboratorio..."
                rows={4}
                style={{
                  ...inputBase,
                  height: "auto",
                  padding: "14px 16px",
                  resize: "vertical",
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = C.amber;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${C.amber}18`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {/* ── SUBMIT ── */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  height: 54,
                  borderRadius: 14,
                  background: loading
                    ? "#d1d5db"
                    : `linear-gradient(135deg, ${C.amber}, ${C.orange})`,
                  color: loading ? "#9ca3af" : "#000",
                  fontWeight: 900,
                  fontSize: 16,
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  boxShadow: loading ? "none" : "0 4px 28px rgba(245,158,11,0.35)",
                  transition: "all 0.2s",
                  letterSpacing: "-0.01em",
                  fontFamily: "inherit",
                }}
              >
                {loading ? (
                  <>
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        border: "2.5px solid #9ca3af",
                        borderTopColor: "transparent",
                        animation: "spin 0.7s linear infinite",
                        display: "inline-block",
                      }}
                    />
                    Enviando solicitud...
                  </>
                ) : (
                  "Solicitar mi demo personalizada →"
                )}
              </button>

              <p style={{ textAlign: "center", fontSize: 12.5, color: "#94a3b8", marginTop: 16 }}>
                Al enviar, aceptás nuestra{" "}
                <Link href="#" style={{ color: C.amber, textDecoration: "none", fontWeight: 600 }}>
                  política de privacidad
                </Link>
                . Nunca enviamos spam.
              </p>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

/* ─── HELPERS ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 13,
        fontWeight: 800,
        color: C.slate,
        textTransform: "uppercase",
        letterSpacing: "0.06em",
        marginBottom: 14,
        paddingBottom: 10,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {children}
    </div>
  );
}

function OptLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 500, color: C.muted, textTransform: "none", letterSpacing: 0 }}>
      {children}
    </span>
  );
}
