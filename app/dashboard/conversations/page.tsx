import { MessageSquare, Filter } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const channels = ["All", "Chat", "WhatsApp", "Voice", "Email"];

export default function ConversationsPage() {
  return (
    <>
      <DashboardTopbar title="Conversations" />
      <div className="p-6 space-y-5 max-w-7xl">

        {/* Filters */}
        <div className="flex items-center gap-2">
          {channels.map((ch) => (
            <button
              key={ch}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                ch === "All"
                  ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "text-[#71717A] hover:text-white hover:bg-white/5"
              }`}
            >
              {ch}
            </button>
          ))}
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-white/5 text-sm transition-colors">
            <Filter size={13} />
            Filter
          </button>
        </div>

        {/* Empty state */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-6 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <MessageSquare size={24} className="text-[#71717A]" />
          </div>
          <h3 className="text-white font-semibold mb-2">No conversations yet</h3>
          <p className="text-[#71717A] text-sm max-w-sm">
            Conversations from your AI agents will appear here in real time.
          </p>
        </div>
      </div>
    </>
  );
}
