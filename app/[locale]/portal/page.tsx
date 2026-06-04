import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FolderKanban, FileText, Receipt, HeadphonesIcon, Files } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Portal | ORTHONOBA",
  description: "ORTHONOBA client portal — projects, documents, invoices and support.",
};

const PORTAL_SECTIONS = [
  { icon: FolderKanban, label: "Projects",   href: "portal/projects",  desc: "Track your active projects and deliverables." },
  { icon: FileText,     label: "Documents",  href: "portal/documents", desc: "Access proposals, contracts and reports." },
  { icon: Receipt,      label: "Invoices",   href: "portal/invoices",  desc: "View and download your invoices." },
  { icon: HeadphonesIcon, label: "Support",  href: "portal/support",   desc: "Open support tickets and get help." },
  { icon: Files,        label: "Files",      href: "portal/files",     desc: "Access shared files and deliverables." },
];

export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-obsidian min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 border-b border-white/6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4">Client Portal</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 tracking-tight">
            Your ORTHONOBA Portal
          </h1>
          <p className="text-silver text-lg max-w-2xl mx-auto leading-relaxed">
            Manage your projects, documents, invoices and support requests in one place.
          </p>
        </div>
      </section>

      {/* Portal sections */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-panel border border-gold/10 rounded-2xl p-6 mb-8 flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shrink-0">
              <span className="text-sm">🔒</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Portal in Development</p>
              <p className="text-xs text-silver/70 leading-relaxed">
                The full client portal is being built. Current clients can access their projects via direct links shared by our team. Full portal launch is planned for Q3 2026.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTAL_SECTIONS.map(({ icon: Icon, label, href, desc }) => (
              <div
                key={`${href}-${label}`}
                className="bg-panel border border-white/6 rounded-2xl p-5 opacity-60 cursor-not-allowed"
              >
                <div className="w-8 h-8 rounded-lg bg-gold/8 border border-gold/10 flex items-center justify-center text-gold mb-4">
                  <Icon size={15} />
                </div>
                <p className="text-sm font-semibold text-white mb-1.5">{label}</p>
                <p className="text-xs text-silver/60 leading-relaxed">{desc}</p>
                <p className="text-[10px] text-muted mt-3 uppercase tracking-wider font-bold">Coming Soon</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-silver text-sm mb-4">Need to access your project now?</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/25 text-gold rounded-lg text-sm font-semibold hover:bg-gold/6 transition-colors"
            >
              Contact your account manager <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
