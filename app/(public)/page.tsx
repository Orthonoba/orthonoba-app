import Link from "next/link";

const MODULES = [
  { label: "Gestión de Casos",  color: "#3b82f6" },
  { label: "Visor 3D",          color: "#06b6d4" },
  { label: "Diseño CAD",        color: "#8b5cf6" },
  { label: "Portal Paciente",   color: "#f43f5e" },
  { label: "Alineadores",       color: "#10b981" },
  { label: "Flujo de Trabajo",  color: "#f59e0b" },
];

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(165deg, #020617 0%, #0f172a 40%, #1e293b 100%)",
        padding: "100px 0 80px",
      }}
    >
      {/* Subtle grid */}
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
      {/* Amber glow */}
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="container-ortho" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 680 }}>
          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              margin: "0 0 40px",
            }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ORTHONOBA
            </span>
          </h1>

          <Link
            href="/login"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              background: "rgba(255,255,255,0.06)",
              color: "#e2e8f0",
              fontWeight: 600,
              fontSize: 15,
              borderRadius: 12,
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.12)",
            }}
          >
            Acceder
          </Link>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section style={{ padding: "80px 0", background: "#f8fafc" }}>
      <div className="container-ortho">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {MODULES.map((m) => (
            <div
              key={m.label}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: 32,
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: m.color + "14",
                  border: `1px solid ${m.color}28`,
                  marginBottom: 16,
                }}
              />
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#0f172a",
                  margin: 0,
                }}
              >
                {m.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Modules />
    </>
  );
}
