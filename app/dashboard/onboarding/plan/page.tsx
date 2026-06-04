"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import StepHeader from "../_components/StepHeader";

const PLANS = [
  {
    id: "STARTER",
    name: "Starter",
    price: 97,
    description: "Perfect for small businesses",
    features: [
      "1 AI Agent",
      "500 conversations/month",
      "1,000 contacts",
      "5 automations",
      "Web chat",
      "Email support",
    ],
    badge: null,
  },
  {
    id: "PROFESSIONAL",
    name: "Professional",
    price: 297,
    description: "For growing teams",
    features: [
      "5 AI Agents",
      "5,000 conversations/month",
      "10,000 contacts",
      "25 automations",
      "WhatsApp integration",
      "Voice agents",
      "Priority support",
    ],
    badge: "Most Popular",
  },
  {
    id: "BUSINESS",
    name: "Business",
    price: 697,
    description: "Full platform access",
    features: [
      "20 AI Agents",
      "25,000 conversations/month",
      "Unlimited contacts",
      "Unlimited automations",
      "Full WhatsApp platform",
      "Voice & SMS",
      "Dedicated support",
    ],
    badge: null,
  },
];

function OnboardingPlanContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Stripe returns here with ?success=true after payment
  useEffect(() => {
    if (searchParams.get("success") === "true") {
      router.replace("/dashboard/onboarding/agent");
    }
  }, [searchParams, router]);

  const handleSelectPlan = async (planId: string) => {
    setError(null);
    setLoading(planId);

    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId,
          successPath: "/dashboard/onboarding/plan?success=true",
          cancelPath: "/dashboard/onboarding/plan?canceled=true",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(null);
    }
  };

  const handleContactEnterprise = () => {
    window.location.href = "mailto:sales@orthonoba.app?subject=Enterprise Plan";
  };

  return (
    <div>
      <StepHeader
        current="plan"
        title="Choose your plan"
        subtitle="All plans include a 14-day free trial. Cancel anytime."
      />

      {searchParams.get("canceled") === "true" && (
        <div className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
          Payment was cancelled. Select a plan to continue.
        </div>
      )}

      {error && (
        <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-xl border p-5 transition-colors ${
              plan.badge
                ? "border-[#D4AF37]/40 bg-[#D4AF37]/5"
                : "border-white/10 bg-[#0E0E0E]"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-2.5 left-4 text-xs font-semibold bg-[#D4AF37] text-black px-2.5 py-0.5 rounded-full">
                {plan.badge}
              </span>
            )}

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-white">{plan.name}</span>
                  <span className="text-2xl font-bold text-white">
                    €{plan.price}
                    <span className="text-sm font-normal text-[#71717A]">/mo</span>
                  </span>
                </div>
                <p className="text-xs text-[#71717A] mb-3">{plan.description}</p>
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                      <Check size={11} className="text-[#D4AF37] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={loading !== null}
                className={`flex-shrink-0 h-9 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                  plan.badge
                    ? "bg-[#D4AF37] text-black hover:bg-[#F5C542]"
                    : "bg-white/10 text-white hover:bg-white/15"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  "Select"
                )}
              </button>
            </div>
          </div>
        ))}

        {/* Enterprise */}
        <div className="rounded-xl border border-white/5 bg-[#0E0E0E] p-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-white">Enterprise</span>
              <p className="text-xs text-[#71717A] mt-0.5">
                Custom pricing · Unlimited everything · SLA
              </p>
            </div>
            <button
              onClick={handleContactEnterprise}
              className="h-9 px-4 rounded-lg text-sm font-semibold bg-white/10 text-white hover:bg-white/15 transition-colors"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-[#71717A] mt-6">
        Powered by Stripe · Secure payments · Cancel anytime
      </p>
    </div>
  );
}

export default function OnboardingPlanPage() {
  return (
    <Suspense>
      <OnboardingPlanContent />
    </Suspense>
  );
}
