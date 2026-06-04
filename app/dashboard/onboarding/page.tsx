"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

    if (!token) {
      router.replace("/login");
      return;
    }

    fetch("/api/onboarding/status", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data: { steps?: { organization: boolean; plan: boolean; agent: boolean; whatsapp: boolean }; allDone?: boolean }) => {
        if (!data.steps) {
          router.replace("/dashboard");
          return;
        }
        if (!data.steps.organization) {
          router.replace("/dashboard/onboarding/organization");
        } else if (!data.steps.plan) {
          router.replace("/dashboard/onboarding/plan");
        } else if (!data.steps.agent) {
          router.replace("/dashboard/onboarding/agent");
        } else if (!data.steps.whatsapp) {
          router.replace("/dashboard/onboarding/whatsapp");
        } else {
          router.replace("/dashboard/onboarding/complete");
        }
      })
      .catch(() => router.replace("/dashboard/onboarding/organization"));
  }, [router]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 rounded-full border-2 border-[#D4AF37] border-t-transparent animate-spin" />
    </div>
  );
}
