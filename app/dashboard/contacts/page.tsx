import { Users, Plus, Search } from "lucide-react";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <>
      <DashboardTopbar title="Contacts" />
      <div className="p-6 space-y-5 max-w-7xl">

        <div className="flex items-center justify-between">
          <p className="text-[#A1A1AA] text-sm">
            Unified contact database synced from all your channels.
          </p>
          <Link
            href="/dashboard/contacts/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-semibold rounded-lg hover:bg-[#F5C542] transition-colors"
          >
            <Plus size={15} />
            Add Contact
          </Link>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="w-full bg-[#0E0E0E] border border-white/5 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[#71717A] focus:outline-none focus:border-[#D4AF37]/40"
          />
        </div>

        {/* Empty state */}
        <div className="bg-[#0E0E0E] border border-white/5 rounded-xl px-6 py-16 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <Users size={24} className="text-[#71717A]" />
          </div>
          <h3 className="text-white font-semibold mb-2">No contacts yet</h3>
          <p className="text-[#71717A] text-sm max-w-sm">
            Contacts are automatically created from WhatsApp conversations and web forms.
          </p>
        </div>
      </div>
    </>
  );
}
