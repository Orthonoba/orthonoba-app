import Header from "@/components/header";

const stats = [
  { label: "Pacientes activos", value: "128" },
  { label: "Citas hoy", value: "14" },
  { label: "Pendientes", value: "5" },
  { label: "Ingresos mes", value: "$12.4k" },
];

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" subtitle="Bienvenido a Orthonoba" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500 mb-2">{label}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
