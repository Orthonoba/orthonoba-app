import Link from "next/link";

/* ═══════════════════════════════════════════════════
   ORTHONOBA — Beneficios Page
   ═══════════════════════════════════════════════════ */

const COLORS = {
  amber: "#f59e0b",
  amberLight: "#fbbf24",
  green: "#10b981",
  blue: "#3b82f6",
  cyan: "#06b6d4",
  purple: "#8b5cf6",
  pink: "#f43f5e",
  orange: "#f97316",
  dark: "#020617",
  navy: "#0f172a",
  navyMid: "#1e293b",
  slate: "#334155",
  muted: "#64748b",
  border: "#e2e8f0",
  light: "#f8fafc",
};

/* ─── DECORATIONS ─── */
function GridPattern() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.035,
        backgroundImage:
          "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        pointerEvents: "none",
      }}
    />
  );
}

function GlowOrb({
  top, right, left, bottom, color = "rgba(245,158,11,0.14)", size = 480,
}: {
  top?: number | string; right?: number | string; left?: number | string; bottom?: number | string;
  color?: string; size?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top, right, left, bottom,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(48px)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(165deg, ${COLORS.dark} 0%, ${COLORS.navy} 45%, ${COLORS.navyMid} 100%)`,
        padding: "110px 0 90px",
      }}
    >
      <GridPattern />
      <GlowOrb top={-120} right={-80} color="rgba(245,158,11,0.13)" size={560} />
      <GlowOrb top={200} left={-160} color="rgba(16,185,129,0.08)" size={420} />

      <div className="container-ortho" style={{ position: "relative", zIndex: 2 }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            borderRadius: 100,
            marginBottom: 28,
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.28)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: COLORS.green,
              boxShadow: `0 0 10px ${COLORS.green}`,
            }}
          />
          <span style={{ fontSize: 13, color: COLORS.amberLight, fontWeight: 700, letterSpacing: "0.04em" }}>
            La plataforma dental más completa de Latinoamérica
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(38px, 5vw, 58px)",
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
            color: "#fff",
            maxWidth: 780,
            marginBottom: 22,
          }}
        >
          Todo lo que necesitas,{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.orange})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            exactamente donde lo necesitas
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: 620,
            marginBottom: 44,
          }}
        >
          ORTHONOBA conecta clínicas, laboratorios y pacientes en un solo ecosistema digital.
          Menos fricción, más resultados, cero papeleo.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link
            href="/solicitar-demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "15px 32px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.orange})`,
              color: "#000",
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 4px 28px rgba(245,158,11,0.35)",
              letterSpacing: "-0.01em",
            }}
          >
            Solicitar demo gratuita →
          </Link>
          <Link
            href="/contacto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "15px 32px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.14)",
              color: "#e2e8f0",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Hablar con un experto
          </Link>
        </div>

        {/* Stats strip */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 64,
            paddingTop: 40,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "+500", label: "Profesionales activos" },
            { value: "98%", label: "Satisfacción de usuarios" },
            { value: "3×", label: "Más rápido que el método tradicional" },
            { value: "0", label: "Instalación requerida" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.amberLight, letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SIN / CON COMPARISON ─── */
function Comparison() {
  const without = [
    "Pedidos por WhatsApp sin trazabilidad",
    "Archivos STL perdidos en email",
    "Sin historial clínico centralizado",
    "Cobros y pagos manuales propensos a errores",
    "Pacientes sin acceso a su información",
    "Coordinación telefónica con laboratorios",
    "Retrasos frecuentes en entregas",
  ];
  const with_ = [
    "Pedidos digitales con seguimiento en tiempo real",
    "Archivos vinculados al caso clínico automáticamente",
    "Historial 360° por paciente, accesible desde cualquier lugar",
    "Facturación y pagos integrados con un clic",
    "Portal del paciente con su propio acceso seguro",
    "Comunicación directa clínica ↔ laboratorio en la plataforma",
    "Alertas de vencimiento y entrega automatizadas",
  ];

  return (
    <section style={{ padding: "88px 0", background: COLORS.light }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.amber,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            El antes y el después
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: COLORS.navy,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            ¿Cómo cambia tu flujo de trabajo?
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>
            Dos realidades, un mismo sector. La diferencia está en la tecnología.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* SIN ORTHONOBA */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "36px 32px",
              border: "1.5px solid #fecaca",
              boxShadow: "0 2px 20px rgba(239,68,68,0.06)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 100,
                background: "#fef2f2",
                border: "1px solid #fecaca",
                marginBottom: 28,
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#dc2626", letterSpacing: "0.04em" }}>
                Sin ORTHONOBA
              </span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {without.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#fef2f2",
                      border: "1.5px solid #fca5a5",
                      color: "#dc2626",
                      fontSize: 13,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ✕
                  </span>
                  <span style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CON ORTHONOBA */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: "36px 32px",
              border: "1.5px solid #6ee7b7",
              boxShadow: "0 2px 20px rgba(16,185,129,0.08)",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                borderRadius: 100,
                background: "#f0fdf4",
                border: "1px solid #86efac",
                marginBottom: 28,
              }}
            >
              <span style={{ fontSize: 16 }}>✦</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#059669", letterSpacing: "0.04em" }}>
                Con ORTHONOBA
              </span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
              {with_.map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "#f0fdf4",
                      border: "1.5px solid #6ee7b7",
                      color: "#10b981",
                      fontSize: 13,
                      fontWeight: 900,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ fontSize: 14.5, color: "#1e293b", lineHeight: 1.55, fontWeight: 500 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ─── */
const FEATURES = [
  {
    icon: "🦷",
    color: COLORS.blue,
    title: "Gestión de casos clínicos",
    desc: "Crea, edita y da seguimiento a cada caso ortodóncico con historial completo, imágenes y documentos adjuntos.",
  },
  {
    icon: "🏭",
    color: COLORS.cyan,
    title: "Portal de laboratorio integrado",
    desc: "Envía pedidos digitales al lab con especificaciones precisas. Recibe confirmaciones, progresos y entregas desde la plataforma.",
  },
  {
    icon: "📄",
    color: COLORS.purple,
    title: "Facturación automática",
    desc: "Genera facturas, controla pagos y emite comprobantes sin salir de ORTHONOBA. Compatible con múltiples métodos de pago.",
  },
  {
    icon: "📦",
    color: COLORS.orange,
    title: "Trazabilidad total",
    desc: "Cada archivo, pedido y comunicación queda registrado con fecha, hora y responsable. Auditoría completa en tiempo real.",
  },
  {
    icon: "🗓️",
    color: COLORS.green,
    title: "Agenda y turnos inteligentes",
    desc: "Calendario visual con turnos, recordatorios automáticos por WhatsApp y notificaciones para clínica y paciente.",
  },
  {
    icon: "📊",
    color: COLORS.pink,
    title: "Reportes y analíticas",
    desc: "Dashboards con métricas clave: casos activos, ingresos, tiempos de entrega, rendimiento del laboratorio y más.",
  },
  {
    icon: "🔒",
    color: COLORS.amber,
    title: "Seguridad y privacidad",
    desc: "Datos encriptados, acceso por roles, backups automáticos y cumplimiento con normativa de protección de datos de salud.",
  },
  {
    icon: "🌐",
    color: COLORS.cyan,
    title: "Acceso desde cualquier lugar",
    desc: "100% en la nube. Sin instalación. Funciona en computadora, tablet y celular con la misma experiencia fluida.",
  },
  {
    icon: "🤝",
    color: COLORS.purple,
    title: "Red de colaboración",
    desc: "Conecta tu clínica con múltiples laboratorios, referencia casos entre colegas y amplía tu red profesional.",
  },
];

function Features() {
  return (
    <section style={{ padding: "88px 0", background: "#fff" }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.amber,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            Funcionalidades
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: COLORS.navy,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Todo en una sola plataforma
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Herramientas diseñadas específicamente para el sector odontológico y ortodóncico.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 18,
                padding: "28px 26px",
                transition: "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: f.color + "18",
                  border: `1.5px solid ${f.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: COLORS.navy,
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 13.5, color: COLORS.muted, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WORKFLOW ─── */
const STEPS = [
  {
    n: "01",
    color: COLORS.blue,
    icon: "👤",
    title: "Alta del paciente",
    desc: "Registra al paciente con datos clínicos, odontograma, imágenes y consentimientos. Todo digital desde el primer momento.",
  },
  {
    n: "02",
    color: COLORS.purple,
    icon: "🦷",
    title: "Planificación del caso",
    desc: "Diseña el plan de tratamiento, asigna el tipo de aparatología y vincula archivos STL, radiografías y fotos intraorales.",
  },
  {
    n: "03",
    color: COLORS.amber,
    icon: "📤",
    title: "Pedido al laboratorio",
    desc: "Envía el pedido al laboratorio con un clic. Especificaciones, archivos y plazos quedan registrados automáticamente.",
  },
  {
    n: "04",
    color: COLORS.orange,
    icon: "⚙️",
    title: "Producción y seguimiento",
    desc: "El laboratorio actualiza el estado del pedido en tiempo real. La clínica recibe notificaciones de avance y entrega estimada.",
  },
  {
    n: "05",
    color: COLORS.green,
    icon: "✅",
    title: "Entrega y cierre",
    desc: "Registra la entrega, agenda la cita de colocación y emite la factura. El historial queda cerrado y auditado.",
  },
];

function Workflow() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "88px 0",
        background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.navy} 60%, #0d1f3c 100%)`,
      }}
    >
      <GridPattern />
      <GlowOrb top="10%" left="5%" color="rgba(59,130,246,0.1)" size={400} />
      <GlowOrb bottom={-100} right={-60} color="rgba(245,158,11,0.1)" size={500} />

      <div className="container-ortho" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.amber,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            Flujo de trabajo
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Del registro a la entrega,{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.orange})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              sin fricciones
            </span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18,
                padding: "28px 32px",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: s.color + "22",
                  border: `1.5px solid ${s.color}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 20,
                }}
              >
                {s.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: s.color, letterSpacing: "0.12em" }}>
                    PASO {s.n}
                  </span>
                  <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${s.color}44, transparent)` }} />
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#f1f5f9",
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUTIONS ─── */
const SOLUTIONS = [
  {
    tag: "Solución para Clínicas",
    color: COLORS.blue,
    icon: "🏥",
    title: "Centro de control clínico",
    desc: "Gestiona todos tus pacientes, tratamientos y pedidos desde un dashboard unificado. Nunca pierdas el hilo de ningún caso.",
    items: [
      "Dashboard con casos activos en tiempo real",
      "Historial clínico digital por paciente",
      "Gestión de múltiples profesionales y sillones",
      "Recordatorios automáticos de turnos",
      "Reportes de productividad mensual",
    ],
    cta: "Ver demo para clínicas",
  },
  {
    tag: "Solución para Laboratorios",
    color: COLORS.purple,
    icon: "⚗️",
    title: "Sistema de producción digital",
    desc: "Recibe pedidos claros y estructurados, organiza tu producción y entrega con total trazabilidad sin llamadas ni emails.",
    items: [
      "Bandeja de pedidos con prioridades",
      "Especificaciones técnicas digitales",
      "Control de tiempos de producción",
      "Comunicación directa con clínicas",
      "Facturación y cobros integrados",
    ],
    cta: "Ver demo para laboratorios",
  },
  {
    tag: "Solución para Pacientes",
    color: COLORS.green,
    icon: "😊",
    title: "Portal del paciente",
    desc: "Acceso propio para ver el estado de tu tratamiento, descargar documentos, ver turnos y comunicarte con tu clínica.",
    items: [
      "Acceso seguro con cuenta personal",
      "Seguimiento de tratamiento en tiempo real",
      "Descarga de presupuestos y facturas",
      "Historial de consultas y radiografías",
      "Notificaciones de próximas citas",
    ],
    cta: "Ver el portal del paciente",
  },
];

function Solutions() {
  return (
    <section style={{ padding: "88px 0", background: COLORS.light }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.amber,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            Soluciones
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: COLORS.navy,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Una plataforma, tres realidades
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, marginTop: 12, maxWidth: 500, margin: "12px auto 0" }}>
            Cada actor del ecosistema dental tiene su propio espacio, adaptado a sus necesidades.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SOLUTIONS.map((s, i) => (
            <div
              key={s.tag}
              style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1.2fr" : "1.2fr 1fr",
                gap: 0,
                background: "#fff",
                borderRadius: 24,
                overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Info side */}
              <div style={{ padding: "44px 40px", order: i % 2 === 0 ? 1 : 2 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "5px 14px",
                    borderRadius: 100,
                    background: s.color + "15",
                    border: `1px solid ${s.color}30`,
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{s.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: s.color, letterSpacing: "0.06em" }}>
                    {s.tag.toUpperCase()}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 26,
                    fontWeight: 900,
                    color: COLORS.navy,
                    marginBottom: 14,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, color: COLORS.muted, lineHeight: 1.7, marginBottom: 28 }}>
                  {s.desc}
                </p>
                <Link
                  href="/solicitar-demo"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 24px",
                    borderRadius: 12,
                    background: s.color,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.cta} →
                </Link>
              </div>

              {/* Feature list side */}
              <div
                style={{
                  padding: "44px 40px",
                  background: s.color + "08",
                  borderLeft: i % 2 === 0 ? `1px solid ${s.color}20` : "none",
                  borderRight: i % 2 !== 0 ? `1px solid ${s.color}20` : "none",
                  order: i % 2 === 0 ? 2 : 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                  {s.items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: s.color + "20",
                          border: `1.5px solid ${s.color}40`,
                          color: s.color,
                          fontSize: 12,
                          fontWeight: 900,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: 14.5, color: COLORS.slate, lineHeight: 1.55, fontWeight: 500 }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ROLE BENEFITS ─── */
const ROLES = [
  {
    icon: "🏥",
    role: "Clínicas & Ortodoncistas",
    color: COLORS.blue,
    headline: "Más pacientes, menos caos",
    benefits: [
      { icon: "⏱️", title: "Ahorro de tiempo", desc: "Reducí hasta un 60% el tiempo administrativo con flujos automatizados." },
      { icon: "💰", title: "Más ingresos", desc: "Atendé más casos sin aumentar personal gracias a la eficiencia operativa." },
      { icon: "📋", title: "Cero papeleo", desc: "Historias clínicas, consentimientos y presupuestos 100% digitales." },
      { icon: "🔗", title: "Labs en red", desc: "Conectate con múltiples laboratorios y comparate calidad y precio." },
    ],
  },
  {
    icon: "⚗️",
    role: "Laboratorios Dentales",
    color: COLORS.purple,
    headline: "Producción organizada, cobros seguros",
    benefits: [
      { icon: "📥", title: "Pedidos claros", desc: "Recibí especificaciones completas y archivos listos para producir desde el inicio." },
      { icon: "📈", title: "Más clínicas cliente", desc: "Expandí tu cartera conectándote con clínicas en toda la red ORTHONOBA." },
      { icon: "💳", title: "Cobros garantizados", desc: "Facturación integrada con seguimiento de pagos y alertas de vencimiento." },
      { icon: "🗂️", title: "Sin caos de email", desc: "Todos los pedidos, archivos y comunicaciones en un solo lugar organizado." },
    ],
  },
  {
    icon: "😊",
    role: "Pacientes",
    color: COLORS.green,
    headline: "Tu tratamiento, siempre en tu mano",
    benefits: [
      { icon: "👁️", title: "Visibilidad total", desc: "Sabé exactamente en qué etapa está tu tratamiento, sin llamar a la clínica." },
      { icon: "📅", title: "Turnos y recordatorios", desc: "Recibí alertas automáticas de tus próximas citas por WhatsApp o email." },
      { icon: "📂", title: "Documentos digitales", desc: "Accedé a presupuestos, facturas y estudios desde cualquier dispositivo." },
      { icon: "🔐", title: "Privacidad garantizada", desc: "Tus datos de salud están protegidos con los más altos estándares de seguridad." },
    ],
  },
];

function RoleBenefits() {
  return (
    <section style={{ padding: "88px 0", background: "#fff" }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.amber,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            Valor por rol
          </span>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 900,
              color: COLORS.navy,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Beneficios concretos para cada actor
          </h2>
          <p style={{ fontSize: 16, color: COLORS.muted, marginTop: 12, maxWidth: 520, margin: "12px auto 0" }}>
            ORTHONOBA está diseñado para que clínicas, laboratorios y pacientes ganen por igual.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {ROLES.map((r) => (
            <div key={r.role}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 16,
                    background: r.color + "18",
                    border: `1.5px solid ${r.color}35`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                  }}
                >
                  {r.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      color: r.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: 2,
                    }}
                  >
                    {r.role}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: COLORS.navy,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {r.headline}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {r.benefits.map((b) => (
                  <div
                    key={b.title}
                    style={{
                      background: r.color + "07",
                      border: `1px solid ${r.color}22`,
                      borderRadius: 16,
                      padding: "22px 20px",
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 12 }}>{b.icon}</div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 800,
                        color: COLORS.navy,
                        marginBottom: 6,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {b.title}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6 }}>{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── INTEGRATIONS ─── */
const INTEGRATIONS = [
  { name: "WhatsApp", icon: "💬", desc: "Recordatorios y alertas automáticas" },
  { name: "Email", icon: "📧", desc: "Notificaciones y documentos" },
  { name: "Google Calendar", icon: "📅", desc: "Sincronización de turnos" },
  { name: "MercadoPago", icon: "💳", desc: "Pagos online integrados" },
  { name: "Factura Electrónica", icon: "🧾", desc: "Emisión automática AFIP/SAT" },
  { name: "Dropbox / Drive", icon: "☁️", desc: "Almacenamiento de archivos STL" },
  { name: "3Shape", icon: "🦷", desc: "Importación de escaneos 3D" },
  { name: "Invisalign", icon: "✨", desc: "Integración de casos aligners" },
];

function Integrations() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: COLORS.light,
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 800,
              color: COLORS.amber,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 12,
            }}
          >
            Integraciones
          </span>
          <h2
            style={{
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 900,
              color: COLORS.navy,
              letterSpacing: "-0.02em",
            }}
          >
            Conectado con las herramientas que ya usás
          </h2>
          <p style={{ fontSize: 15, color: COLORS.muted, marginTop: 10, maxWidth: 480, margin: "10px auto 0" }}>
            ORTHONOBA se integra con las plataformas más populares del sector sin configuraciones complejas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {INTEGRATIONS.map((item) => (
            <div
              key={item.name}
              style={{
                background: "#fff",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 16,
                padding: "22px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: COLORS.light,
                  border: `1px solid ${COLORS.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.navy, marginBottom: 2 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36, fontSize: 14, color: COLORS.muted }}>
          ¿Usás otra herramienta?{" "}
          <Link href="/contacto" style={{ color: COLORS.amber, fontWeight: 700, textDecoration: "none" }}>
            Contanos y la evaluamos →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── FINAL CTA ─── */
function FinalCTA() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "96px 0",
        background: `linear-gradient(160deg, ${COLORS.dark} 0%, ${COLORS.navy} 60%, #0a1a3a 100%)`,
        textAlign: "center",
      }}
    >
      <GridPattern />
      <GlowOrb top="20%" left="50%" color="rgba(245,158,11,0.1)" size={600} />

      <div className="container-ortho" style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            borderRadius: 100,
            background: "rgba(245,158,11,0.1)",
            border: "1px solid rgba(245,158,11,0.25)",
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: COLORS.green,
              boxShadow: `0 0 10px ${COLORS.green}`,
            }}
          />
          <span style={{ fontSize: 13, color: COLORS.amberLight, fontWeight: 700 }}>
            Demo disponible hoy mismo
          </span>
        </div>

        <h2
          style={{
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 900,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.12,
            marginBottom: 18,
          }}
        >
          Empezá a transformar tu práctica{" "}
          <span
            style={{
              background: `linear-gradient(90deg, ${COLORS.amber}, ${COLORS.orange})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            dental hoy
          </span>
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto 44px",
          }}
        >
          Sin costo de implementación. Sin contratos a largo plazo.
          Solo resultados desde el primer día.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/solicitar-demo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 36px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${COLORS.amber}, ${COLORS.orange})`,
              color: "#000",
              fontWeight: 900,
              fontSize: 16,
              textDecoration: "none",
              boxShadow: "0 4px 32px rgba(245,158,11,0.4)",
              letterSpacing: "-0.01em",
            }}
          >
            Solicitar demo gratuita →
          </Link>
          <Link
            href="/contacto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "16px 36px",
              borderRadius: 14,
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.14)",
              color: "#e2e8f0",
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            Hablar con ventas
          </Link>
        </div>

        <p style={{ marginTop: 28, fontSize: 13, color: "#475569" }}>
          Sin tarjeta de crédito requerida · Onboarding incluido · Soporte en español
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */
export default function BeneficiosPage() {
  return (
    <>
      <Hero />
      <Comparison />
      <Features />
      <Workflow />
      <Solutions />
      <RoleBenefits />
      <Integrations />
      <FinalCTA />
    </>
  );
}
