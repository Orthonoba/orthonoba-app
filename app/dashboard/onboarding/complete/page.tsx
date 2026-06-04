"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Bot, MessageSquare, Zap, Users, ArrowRight } from "lucide-react";
import StepHeader from "../_components/StepHeader";

type Status = {
  steps: { organization: boolean; plan: boolean; agent: boolean; whatsapp: boolean };
  org: { name: string; plan: string; industry: string | null };
};

const PLAN_LABELS: Record<string, string> = {
  STARTER: "Starter",
  PROFESSIONAL: "Professional",
  BUSINESS: "Business",
  ENTERPRISE: "Enterprise",
  FREE: "Free Trial",
};

const QUICK_LINKS = [
  { label: "Manage Agents", href: "/dashboard/agents", icon: Bot },
  { label: "View Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { label: "Automations", href: "/dashboard/automations", icon: Zap },
  { label: "Contacts", href: "/dashboard/contacts", icon: Users },
];

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;
    if (!token) return;

    fetch("/api/onboarding/status", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => null);
  }, []);

  return (
    <div>
      <StepHeader
        current="complete"
        title="You're all set!"
        subtitle="Your AI platform is ready. Let's get your first conversation."
      />

      {/* Status cards */}
      <div className="space-y-2 mb-8">
        <StatusRow
          label="Business profile"
          done={status?.steps.organization ?? true}
          detail="Industry & contact info saved"
        />
        <StatusRow
          label="Plan active"
          done={status?.steps.plan ?? false}
          detail={
            status?.org.plan
              ? `${PLAN_LABELS[status.org.plan] ?? status.org.plan} plan — 14-day free trial`
              : "Select a plan to activate"
          }
          href={!status?.steps.plan ? "/dashboard/onboarding/plan" : undefined}
        />
        <StatusRow
          label="AI Agent created"
          done={status?.steps.agent ?? false}
          detail="Ready to handle conversations"
          href={!status?.steps.agent ? "/dashboard/onboarding/agent" : undefined}
        />
        <StatusRow
          label="WhatsApp"
          done={status?.steps.whatsapp ?? false}
          detail={
            status?.steps.whatsapp
              ? "Connected and receiving messages"
              : "Not connected yet — set up in Settings"
          }
          optional
          href={!status?.steps.whatsapp ? "/dashboard/onboarding/whatsapp" : undefined}
        />
      </div>

      {/* Go to dashboard CTA */}
      <Link
        href="/dashboard"
        className="block w-full h-12 rounded-xl bg-[#D4AF37] text-black font-semibold hover:bg-[#F5C542] transition-colors flex items-center justify-center gap-2 mb-6"
      >
        Go to Dashboard
        <ArrowRight size={16} />
      </Link>

      {/* Quick links */}
      <div className="rounded-xl border border-white/5 bg-[#0E0E0E] p-4">
        <p className="text-xs font-medium text-[#71717A] mb-3 uppercase tracking-wider">
          Quick links
        </p>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_LINKS.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <Icon size={14} className="text-[#D4AF37]" />
              <span className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  done,
  detail,
  optional,
  href,
}: {
  label: string;
  done: boolean;
  detail: string;
  optional?: boolean;
  href?: string;
}) {
  const content = (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
        done
          ? "border-emerald-500/20 bg-emerald-500/5"
          : optional
          ? "border-white/5 bg-[#0E0E0E]"
          : "border-amber-500/20 bg-amber-500/5"
      } ${href ? "cursor-pointer hover:border-[#D4AF37]/30" : ""}`}
    >
      <CheckCircle2
        size={18}
        className={done ? "text-emerald-400" : optional ? "text-[#71717A]" : "text-amber-400"}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="text-xs text-[#71717A] truncate">{detail}</p>
      </div>
      {href && !done && (
        <span className="text-xs text-[#D4AF37] flex-shrink-0">Set up →</span>
      )}
    </div>
  );

  if (href && !done) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
