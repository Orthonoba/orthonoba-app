import type { ReactNode } from "react";
import Link from "next/link";

export const metadata = { title: "Setup — Orthonoba" };

export default function OnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <span className="text-white font-bold text-lg tracking-tight">ORTHONOBA</span>
        <Link
          href="/dashboard"
          className="text-xs text-[#71717A] hover:text-[#A1A1AA] transition-colors"
        >
          Skip setup →
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl">{children}</div>
      </main>

      <footer className="px-6 py-4 text-center text-xs text-[#71717A]">
        Need help?{" "}
        <a
          href="mailto:support@orthonoba.app"
          className="text-[#D4AF37] hover:underline"
        >
          support@orthonoba.app
        </a>
      </footer>
    </div>
  );
}
