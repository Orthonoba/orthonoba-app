import { TrendingUp, Plus, Filter } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

const statuses = ["All", "New", "Contacted", "Qualified", "Proposal", "Won", "Lost"];

export default function LeadsPage() {
  return (
    <>
      <DashboardTopbar title="Leads" />
      <div className="p-6 space-y-5 max-w-7xl">

        <div className="flex items-center justify-between">
          <p className="text-[#A1A1AA] text-sm">
            Track and qualify every inbound lead automatically.
          </p>
          <Link
            href="/dashboard/leads/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            Add Lead
          </Link>
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {statuses.map((s) => (
            <button
              key={s}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                s === "All"
                  ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "text-[#71717A] hover:text-white hover:bg-white/5"
              }`}
            >
              {s}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-white/5 text-sm transition-colors flex-shrink-0">
            <Filter size={13} />
            Filter
          </button>
        </div>

        {/* Empty state */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-6 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <TrendingUp size={24} className="text-[#71717A]" />
          </div>
          <h3 className="text-white font-semibold mb-2">No leads yet</h3>
          <p className="text-[#71717A] text-sm max-w-sm">
            Leads are created automatically from WhatsApp, chat, and web forms.
          </p>
        </div>
      </div>
    </>
  );
}
