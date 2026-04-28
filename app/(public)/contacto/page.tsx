import type { Metadata } from "next";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   ORTHONOBA — Contacto Page
   ═══════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Contacto — ORTHONOBA",
  description:
    "Ponte en contacto con el equipo de ORTHONOBA. Estamos disponibles por email y teléfono para resolver tus dudas.",
};

const COLORS = {
  amber: "#f59e0b",
  amberLight: "#fbbf24",
  green: "#10b981",
  blue: "#3b82f6",
  dark: "#020617",
  navy: "#0f172a",
  navyMid: "#1e293b",
  muted: "#64748b",
  border: "#e2e8f0",
  light: "#f8fafc",
};

/* ─── HERO ─── */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(165deg, ${COLORS.dark} 0%, ${COLORS.navy} 40%, ${COLORS.navyMid} 100%)`,
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
          pointerEvents: "none",
        }}
      />
      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.13) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-ortho" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
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
              background: COLORS.green,
              boxShadow: `0 0 8px ${COLORS.green}`,
            }}
          />
          <span style={{ fontSize: 13, color: COLORS.amberLight, fontWeight: 600 }}>
            Respondemos en menos de 24 h
          </span>
        </div>

        <h1
          style={{
            fontSize: 52,
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#f8fafc",
            margin: "0 auto 20px",
            maxWidth: 680,
          }}
        >
          Hablemos sobre tu{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.amber} 0%, ${COLORS.amberLight} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            flujo de trabajo dental
          </span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          ¿Tienes preguntas sobre ORTHONOBA? Nuestro equipo está listo para ayudarte a conectar tu clínica o laboratorio.
        </p>
      </div>
    </section>
  );
}

/* ─── CONTACT CARDS ─── */
function ContactCards() {
  const channels = [
    {
      icon: "✉️",
      label: "Email",
      value: "info@orthonoba.digital",
      href: "mailto:info@orthonoba.digital",
      note: "Para consultas generales y soporte",
      color: COLORS.amber,
    },
    {
      icon: "📱",
      label: "Móvil / WhatsApp",
      value: "+34 667 209 395",
      href: "tel:+34667209395",
      note: "Lunes a viernes, 9 h – 19 h (CET)",
      color: COLORS.green,
    },
  ];

  return (
    <section style={{ padding: "80px 0", background: "#ffffff" }}>
      <div className="container-ortho">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
            maxWidth: 760,
            margin: "0 auto",
          }}
        >
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              style={{
                display: "block",
                background: COLORS.light,
                borderRadius: 20,
                padding: "40px 36px",
                border: `1px solid ${COLORS.border}`,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              {/* Icon bubble */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: ch.color + "15",
                  border: `1px solid ${ch.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  marginBottom: 20,
                }}
              >
                {ch.icon}
              </div>

              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: COLORS.muted,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {ch.label}
              </p>

              <p
                style={{
                  fontSize: 20,
                  fontWeight: 800,
                  color: COLORS.navy,
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}
              >
                {ch.value}
              </p>

              <p style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.5 }}>
                {ch.note}
              </p>

              <div
                style={{
                  marginTop: 20,
                  fontSize: 13,
                  fontWeight: 700,
                  color: ch.color,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Contactar ahora →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA BOTTOM ─── */
function CtaBottom() {
  return (
    <section
      style={{
        padding: "80px 0",
        background: COLORS.light,
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div className="container-ortho" style={{ textAlign: "center" }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: COLORS.amber,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 12,
          }}
        >
          ¿PREFIERES VERLO EN ACCIÓN?
        </span>

        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: COLORS.navy,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Reserva una demo gratuita
        </h2>

        <p
          style={{
            fontSize: 16,
            color: COLORS.muted,
            maxWidth: 480,
            margin: "0 auto 36px",
            lineHeight: 1.7,
          }}
        >
          Te mostramos cómo ORTHONOBA encaja en tu flujo de trabajo en una sesión personalizada de 30 minutos.
        </p>

        <Link
          href="/solicitar-demo"
          style={{
            display: "inline-block",
            padding: "16px 40px",
            background: COLORS.amber,
            color: "#000",
            fontWeight: 800,
            fontSize: 15,
            borderRadius: 12,
            textDecoration: "none",
            boxShadow: "0 4px 24px rgba(245,158,11,0.3)",
            transition: "all 0.2s",
          }}
        >
          Solicitar Demo Gratis
        </Link>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */

export default function ContactoPage() {
  return (
    <>
      <Hero />
      <ContactCards />
      <CtaBottom />
    </>
  );
}
