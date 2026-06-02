import Header from "@/components/Header";

const SLOTS = 4;

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: SLOTS }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
          >
            <div className="h-3 w-24 bg-gray-100 rounded mb-3" />
            <div className="h-8 w-16 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}
