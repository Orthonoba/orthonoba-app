"use client";

import { Bell, Search } from "lucide-react";

type Props = {
  title?: string;
};

export default function DashboardTopbar({ title }: Props) {
  return (
    <header className="h-14 border-b border-white/5 bg-[#0B0F1A]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
      {title && (
        <h1 className="text-white font-semibold text-sm">{title}</h1>
      )}
      <div className="flex items-center gap-2 ml-auto">
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/5 transition-colors">
          <Search size={15} />
        </button>
        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:text-white hover:bg-white/5 transition-colors relative">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        </button>
      </div>
    </header>
  );
}
