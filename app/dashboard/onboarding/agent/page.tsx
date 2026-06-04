"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, MessageSquare, Phone, TrendingUp, Loader2 } from "lucide-react";
import StepHeader from "../_components/StepHeader";

const AGENT_TYPES = [
  {
    type: "CHAT",
    icon: MessageSquare,
    label: "AI Receptionist",
    description: "Handles website chat, answers questions, qualifies leads",
    prompt:
      "You are a helpful customer service assistant for this business. Be friendly, professional, and concise. Help customers with their questions and guide them toward the right solution.",
  },
  {
    type: "WHATSAPP",
    icon: Bot,
    label: "WhatsApp AI",
    description: "Automates WhatsApp conversations and lead capture",
    prompt:
      "You are a WhatsApp business assistant. Respond naturally and conversationally. Help customers with their inquiries and capture their contact information when appropriate.",
  },
  {
    type: "VOICE",
    icon: Phone,
    label: "Voice Agent",
    description: "Handles inbound calls, qualifies leads, books appointments",
    prompt:
      "You are a voice agent. Keep responses brief and clear for spoken conversation. Speak naturally, be helpful, and confirm important information by repeating it back.",
  },
  {
    type: "LEAD_QUALIFIER",
    icon: TrendingUp,
    label: "Lead Qualifier",
    description: "Automatically scores and qualifies incoming leads",
    prompt:
      "You are a lead qualification specialist. Your goal is to understand the prospect's needs, timeline, budget, and decision-making process through friendly conversation. Capture key information to help the sales team follow up effectively.",
  },
];

export default function OnboardingAgentPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTypeSelect = (type: string, defaultPrompt: string) => {
    setSelectedType(type);
    if (!systemPrompt || AGENT_TYPES.some((t) => t.prompt === systemPrompt)) {
      setSystemPrompt(defaultPrompt);
    }
    if (!agentName) {
      const t = AGENT_TYPES.find((a) => a.type === type);
      if (t) setAgentName(t.label);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !agentName.trim()) return;

    setError(null);
    setLoading(true);

    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: agentName.trim(),
          type: selectedType,
          systemPrompt: systemPrompt.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create agent");

      router.push("/dashboard/onboarding/whatsapp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StepHeader
        current="agent"
        title="Create your first AI Agent"
        subtitle="Your agent will be ready to handle conversations immediately."
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Agent type selection */}
        <div>
          <p className="text-sm font-medium text-[#A1A1AA] mb-3">
            Agent type <span className="text-[#D4AF37]">*</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            {AGENT_TYPES.map(({ type, icon: Icon, label, description, prompt }) => (
              <button
                key={type}
                type="button"
                onClick={() => handleTypeSelect(type, prompt)}
                className={`p-4 rounded-xl border text-left transition-colors ${
                  selectedType === type
                    ? "border-[#D4AF37]/60 bg-[#D4AF37]/10"
                    : "border-white/10 bg-[#0E0E0E] hover:border-white/20"
                }`}
              >
                <Icon
                  size={18}
                  className={`mb-2 ${selectedType === type ? "text-[#D4AF37]" : "text-[#71717A]"}`}
                />
                <p
                  className={`text-sm font-semibold mb-0.5 ${
                    selectedType === type ? "text-white" : "text-[#A1A1AA]"
                  }`}
                >
                  {label}
                </p>
                <p className="text-xs text-[#71717A] leading-tight">{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Agent name */}
        <div>
          <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
            Agent name <span className="text-[#D4AF37]">*</span>
          </label>
          <input
            type="text"
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            placeholder="e.g. Aria, SalesBot, Reception AI"
            required
            className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors"
          />
        </div>

        {/* System prompt */}
        {selectedType && (
          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
              Instructions{" "}
              <span className="text-[#71717A] font-normal">(you can edit this)</span>
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={4}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors resize-none text-sm font-mono"
            />
          </div>
        )}

        {error && (
          <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !selectedType || !agentName.trim()}
          className="w-full h-11 rounded-xl bg-[#D4AF37] text-black font-semibold hover:bg-[#F5C542] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>Create Agent →</>
          )}
        </button>
      </form>
    </div>
  );
}
