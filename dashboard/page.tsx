import Header from "@/components/Header";

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" subtitle="Bienvenido a Orthonoba 🚀" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div style={cardStyle}>
          <p style={cardLabel}>Pacientes activos</p>
          <p style={cardValue}>128</p>
        </div>
        <div style={cardStyle}>
          <p style={cardLabel}>Citas hoy</p>
          <p style={cardValue}>14</p>
        </div>
        <div style={cardStyle}>
          <p style={cardLabel}>Pendientes</p>
          <p style={cardValue}>5</p>
        </div>
        <div style={cardStyle}>
          <p style={cardLabel}>Ingresos mes</p>
          <p style={cardValue}>$12.4k</p>
        </div>
      </div>
    </>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
};

const cardLabel: React.CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "0 0 8px 0",
};

const cardValue: React.CSSProperties = {
  fontSize: "26px",
  fontWeight: 700,
  color: "#111827",
  margin: 0,
};
