"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import StepHeader from "../_components/StepHeader";

const INDUSTRIES = [
  { value: "digital_agency", label: "Digital Agency" },
  { value: "marketing_agency", label: "Marketing Agency" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS / Software" },
  { value: "consulting", label: "Consulting" },
  { value: "law_firm", label: "Law Firm" },
  { value: "medical_clinic", label: "Medical Clinic" },
  { value: "dental_practice", label: "Dental Practice" },
  { value: "restaurant", label: "Restaurant" },
  { value: "real_estate", label: "Real Estate" },
  { value: "retail", label: "Retail" },
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "other", label: "Other" },
];

export default function OnboardingOrganizationPage() {
  const router = useRouter();
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry) {
      setError("Please select your industry.");
      return;
    }
    setError(null);
    setLoading(true);

    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

    try {
      const res = await fetch("/api/organizations/current", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ industry, website, phone }),
      });

      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Failed to save");
      }

      router.push("/dashboard/onboarding/plan");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StepHeader
        current="organization"
        title="Tell us about your business"
        subtitle="This helps us tailor Orthonoba to your specific needs."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Industry */}
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
            Industry <span className="text-[#D4AF37]">*</span>
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
            className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled className="text-[#71717A]">
              Select your industry…
            </option>
            {INDUSTRIES.map((i) => (
              <option key={i.value} value={i.value} className="bg-[#0E0E0E]">
                {i.label}
              </option>
            ))}
          </select>
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
            Website{" "}
            <span className="text-[#71717A] font-normal">(optional)</span>
          </label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourcompany.com"
            className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
            Phone number{" "}
            <span className="text-[#71717A] font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+34 600 000 000"
            className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors"
          />
        </div>

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !industry}
          className="w-full h-11 rounded-xl bg-[#D4AF37] text-black font-semibold hover:bg-[#F5C542] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 mt-2"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>Continue →</>
          )}
        </button>
      </form>
    </div>
  );
}
