import Link from "next/link";

/* ═══════════════════════════════════════════════════
   ORTHONOBA — Landing Page / Home
   ═══════════════════════════════════════════════════ */

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(165deg, #020617 0%, #0f172a 40%, #1e293b 100%)",
        padding: "100px 0 80px",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div
        className="container-ortho"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 720 }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 100,
              marginBottom: 24,
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px #10b981",
              }}
            />
            <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 600 }}>
              +500 profesionales ya conectados
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#f8fafc",
              margin: 0,
            }}
          >
            Simplifica tu flujo de{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              trabajo dental digital
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 18,
              color: "#94a3b8",
              marginTop: 20,
              lineHeight: 1.7,
              maxWidth: 560,
            }}
          >
            Conecta tu clínica, laboratorio y pacientes en una sola plataforma.
            Prescripción digital, visor 3D, diseño CAD, alineadores y
            seguimiento en tiempo real.
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              gap: 14,
              marginTop: 36,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/demo"
              style={{
                padding: "16px 36px",
                background: "#f59e0b",
                color: "#000",
                fontWeight: 800,
                fontSize: 15,
                borderRadius: 12,
                textDecoration: "none",
                transition: "all 0.2s",
                boxShadow: "0 4px 24px rgba(245,158,11,0.3)",
              }}
            >
              Reserva una Demo Gratis
            </Link>
            <Link
              href="/precios"
              style={{
                padding: "16px 36px",
                background: "rgba(255,255,255,0.06)",
                color: "#e2e8f0",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 12,
                textDecoration: "none",
                border: "1.5px solid rgba(255,255,255,0.12)",
                transition: "all 0.2s",
              }}
            >
              Ver Planes y Precios
            </Link>
          </div>

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 48,
              flexWrap: "wrap",
            }}
          >
            {[
              { n: "500+", l: "Profesionales" },
              { n: "12", l: "Integraciones" },
              { n: "99.9%", l: "Uptime" },
              { n: "< 60s", l: "Diseño IA" },
            ].map((s) => (
              <div
                key={s.l}
                style={{ display: "flex", alignItems: "baseline", gap: 6 }}
              >
                <span
                  style={{ fontSize: 22, fontWeight: 900, color: "#f59e0b" }}
                >
                  {s.n}
                </span>
                <span style={{ fontSize: 12, color: "#64748b" }}>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROBLEM / SOLUTION ─── */
function ProblemSolution() {
  return (
    <section style={{ padding: "80px 0", background: "#ffffff" }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Gestiona los casos de laboratorio{" "}
            <span style={{ color: "#f59e0b" }}>sin el caos</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#64748b",
              marginTop: 12,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            ORTHONOBA unifica recetas digitales, flujos de trabajo 3D, gestión
            de laboratorio y comunicación en la única plataforma totalmente
            integrada.
          </p>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}
        >
          {/* Without */}
          <div
            style={{
              background: "#fef2f2",
              borderRadius: 16,
              padding: 36,
              border: "1px solid #fecaca",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#991b1b",
                marginBottom: 20,
              }}
            >
              ❌ Sin ORTHONOBA
            </h3>
            {[
              "Recetas en papel o formularios manuales",
              "Comunicación caótica con el laboratorio",
              "Sistemas desconectados entre escáner y producción",
              "Seguimiento manual de cada caso",
              "Retrabajos frecuentes por información incompleta",
            ].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 16 }}>✕</span>
                <span style={{ fontSize: 14, color: "#7f1d1d" }}>{t}</span>
              </div>
            ))}
          </div>

          {/* With */}
          <div
            style={{
              background: "#f0fdf4",
              borderRadius: 16,
              padding: 36,
              border: "1px solid #bbf7d0",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#166534",
                marginBottom: 20,
              }}
            >
              ✅ Con ORTHONOBA
            </h3>
            {[
              "Recetas 100% digitales con validación automática",
              "Flujo conectado desde el escaneo hasta la entrega",
              "Comunicación centralizada con anotaciones 3D",
              "Seguimiento en tiempo real con 12 estados",
              "Menos retrabajos gracias a verificación con IA",
            ].map((t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 16 }}>✓</span>
                <span style={{ fontSize: 14, color: "#14532d" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PLATFORM FEATURES ─── */
function PlatformFeatures() {
  const features = [
    {
      icon: "👥",
      title: "Gestión de Pacientes",
      desc: "Historial clínico digital completo, expedientes, escaneos y fotografías organizados por paciente.",
      color: "#3b82f6",
    },
    {
      icon: "🧊",
      title: "Visor 3D Interactivo",
      desc: "Visualiza archivos STL, OBJ, PLY y DICOM directamente en el navegador. Anotaciones, mediciones y cortes transversales.",
      color: "#06b6d4",
    },
    {
      icon: "✏️",
      title: "Diseño CAD por Especialidades",
      desc: "Prótesis fija, implantes, ortodoncia, removibles, estética y maxilofacial. Cada especialidad con su flujo propio.",
      color: "#8b5cf6",
    },
    {
      icon: "💬",
      title: "Comunicación Integrada",
      desc: "Chat en tiempo real entre clínica, laboratorio y especialista. Notas y archivos vinculados a cada caso.",
      color: "#10b981",
    },
    {
      icon: "📂",
      title: "Subida de Archivos",
      desc: "Upload de STL, OBJ, DICOM, imágenes con validación automática de formato, calidad y tamaño por IA.",
      color: "#f97316",
    },
    {
      icon: "📋",
      title: "Flujo de Trabajo",
      desc: "12 estados de tracking tipo FedEx. Vista Kanban, notificaciones push, alertas de retraso automáticas.",
      color: "#f59e0b",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            PLATAFORMA
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Todo lo que necesitas en un solo lugar
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e2e8f0",
                transition: "all 0.2s",
                cursor: "default",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: f.color + "12",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 16,
                  border: `1px solid ${f.color}22`,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#0f172a",
                  marginBottom: 8,
                }}
              >
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WORKFLOW STEPS ─── */
function WorkflowSteps() {
  const steps = [
    {
      n: "01",
      title: "Escaneo Digital",
      desc: "Captura con iTero, TRIOS, Medit, Carestream, Planmeca o Sirona. El archivo se sube automáticamente.",
      color: "#3b82f6",
    },
    {
      n: "02",
      title: "Prescripción Digital",
      desc: "El doctor completa la prescripción con detalles del tratamiento, instrucciones y requisitos del caso.",
      color: "#8b5cf6",
    },
    {
      n: "03",
      title: "Revisión con IA",
      desc: "La IA estandariza el envío, detecta detalles faltantes y reduce errores antes de la producción.",
      color: "#f59e0b",
    },
    {
      n: "04",
      title: "Diseño y Aprobación",
      desc: "Diseño CAD en Exocad/3Shape. El doctor revisa y aprueba en el visor 3D con anotaciones.",
      color: "#10b981",
    },
    {
      n: "05",
      title: "Producción y Entrega",
      desc: "Impresión 3D o fresado CNC. Tracking en tiempo real hasta la entrega al consultorio.",
      color: "#f43f5e",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#ffffff" }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            FLUJO DE TRABAJO
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Del escaneo a la producción en 5 pasos
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {steps.map((step, i) => (
            <div
              key={step.n}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,
                padding: "28px 0",
                borderBottom:
                  i < steps.length - 1 ? "1px solid #f1f5f9" : "none",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  flexShrink: 0,
                  background: step.color + "0d",
                  border: `2px solid ${step.color}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  fontWeight: 900,
                  color: step.color,
                  fontFamily: "monospace",
                }}
              >
                {step.n}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: 4,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#64748b",
                    lineHeight: 1.6,
                    maxWidth: 560,
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SOLUTIONS BY ROLE ─── */
function SolutionsByRole() {
  const roles = [
    {
      icon: "🏥",
      title: "Para Clínicas",
      color: "#3b82f6",
      features: [
        "Prescripción digital en minutos",
        "Estado de cada caso en tiempo real",
        "Portal del paciente integrado",
        "Aprobación de diseños en visor 3D",
      ],
      href: "/clinicas",
    },
    {
      icon: "🔬",
      title: "Para Laboratorios",
      color: "#10b981",
      features: [
        "VisualDLP — gestión de producción",
        "Cronometraje de tareas por técnico",
        "Inventario y control de equipos",
        "Facturación y reportes automáticos",
      ],
      href: "/laboratorios",
    },
    {
      icon: "😁",
      title: "Para Pacientes",
      color: "#f43f5e",
      features: [
        "App iOS/Android con diseño de sonrisa IA",
        "Captura de 8 fotos guiadas con AR",
        "Tracking de tratamiento en tiempo real",
        "Firma digital de consentimientos",
      ],
      href: "/pacientes",
    },
    {
      icon: "🦷",
      title: "Alineadores",
      color: "#06b6d4",
      features: [
        "ProSmile — marca propia",
        "Marca blanca — tu branding",
        "Retenedores digitales",
        "Dispositivos Sleep Apnea",
      ],
      href: "/alineadores",
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="container-ortho">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#f59e0b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 12,
            }}
          >
            SOLUCIONES
          </span>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            Una plataforma, múltiples soluciones
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 20,
          }}
        >
          {roles.map((role) => (
            <Link
              key={role.title}
              href={role.href}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e2e8f0",
                textDecoration: "none",
                transition: "all 0.2s",
                display: "block",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    fontSize: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: role.color + "10",
                    border: `1px solid ${role.color}22`,
                  }}
                >
                  {role.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a" }}>
                  {role.title}
                </h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {role.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                      fontSize: 14,
                      color: "#475569",
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        flexShrink: 0,
                        background: role.color + "15",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: role.color,
                        fontWeight: 700,
                      }}
                    >
                      ✓
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  color: role.color,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Más información →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── INTEGRATIONS BAR ─── */
function IntegrationsBar() {
  const logos = [
    "iTero",
    "TRIOS",
    "Medit",
    "Carestream",
    "Planmeca",
    "Sirona",
    "Exocad",
    "3Shape",
    "Formlabs",
    "SprintRay",
    "Roland",
  ];

  return (
    <section
      style={{
        padding: "56px 0",
        background: "#ffffff",
        borderTop: "1px solid #f1f5f9",
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      <div className="container-ortho">
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            color: "#94a3b8",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          Integraciones y socios de ORTHONOBA
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {logos.map((logo) => (
            <span
              key={logo}
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#cbd5e1",
                letterSpacing: "0.02em",
                padding: "8px 16px",
                borderRadius: 8,
                transition: "color 0.2s",
              }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSolution />
      <PlatformFeatures />
      <WorkflowSteps />
      <SolutionsByRole />
      <IntegrationsBar />
    </>
  );
}
