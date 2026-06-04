"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, ExternalLink, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import StepHeader from "../_components/StepHeader";

export default function OnboardingWhatsAppPage() {
  const router = useRouter();
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [wabaId, setWabaId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  const webhookUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/api/whatsapp/webhook`
      : "https://yourapp.com/api/whatsapp/webhook";

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumberId.trim() || !wabaId.trim() || !accessToken.trim()) return;

    setError(null);
    setLoading(true);

    const token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

    try {
      const res = await fetch("/api/whatsapp/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          phoneNumberId: phoneNumberId.trim(),
          wabaId: wabaId.trim(),
          accessToken: accessToken.trim(),
          displayName: displayName.trim() || "WhatsApp Business",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to connect");

      router.push("/dashboard/onboarding/complete");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/dashboard/onboarding/complete");
  };

  return (
    <div>
      <StepHeader
        current="whatsapp"
        title="Connect WhatsApp Business"
        subtitle="Receive and reply to WhatsApp messages directly in Orthonoba."
      />

      <div className="space-y-5">
        {/* Instructions toggle */}
        <button
          type="button"
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between p-4 rounded-xl bg-[#0E0E0E] border border-white/10 text-left hover:border-white/20 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <MessageSquare size={16} className="text-[#D4AF37]" />
            </div>
            <span className="text-sm font-medium text-white">
              How to get your credentials
            </span>
          </div>
          {showInstructions ? (
            <ChevronUp size={16} className="text-[#71717A]" />
          ) : (
            <ChevronDown size={16} className="text-[#71717A]" />
          )}
        </button>

        {showInstructions && (
          <div className="rounded-xl bg-[#0E0E0E] border border-white/10 p-5 space-y-3 text-sm text-[#A1A1AA]">
            <ol className="space-y-2 list-decimal list-inside">
              <li>
                Go to{" "}
                <a
                  href="https://developers.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline inline-flex items-center gap-1"
                >
                  Meta for Developers <ExternalLink size={11} />
                </a>{" "}
                and create or select an app.
              </li>
              <li>Add the WhatsApp product to your app.</li>
              <li>
                In WhatsApp → API Setup, find your{" "}
                <strong className="text-white">Phone Number ID</strong> and{" "}
                <strong className="text-white">WhatsApp Business Account ID</strong>.
              </li>
              <li>
                Generate a permanent{" "}
                <strong className="text-white">System User Access Token</strong> in
                Business Settings → System Users.
              </li>
              <li>
                Set up your webhook URL in the WhatsApp app settings:
                <div className="mt-1.5 flex items-center gap-2 bg-[#161616] rounded-lg px-3 py-2">
                  <code className="text-xs text-[#D4AF37] flex-1 break-all font-mono">
                    {webhookUrl}
                  </code>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(webhookUrl)}
                    className="text-xs text-[#71717A] hover:text-white transition-colors flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
              </li>
              <li>
                Subscribe to webhook fields:{" "}
                <strong className="text-white">messages</strong>,{" "}
                <strong className="text-white">message_deliveries</strong>,{" "}
                <strong className="text-white">message_reads</strong>.
              </li>
            </ol>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleConnect} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                Phone Number ID <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                placeholder="123456789012345"
                className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                WABA ID <span className="text-[#D4AF37]">*</span>
              </label>
              <input
                type="text"
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                placeholder="987654321098765"
                className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
              Display Name{" "}
              <span className="text-[#71717A] font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="My Business WhatsApp"
              className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
              Access Token <span className="text-[#D4AF37]">*</span>
            </label>
            <input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="EAAxxxxxxxx..."
              autoComplete="off"
              className="w-full h-11 px-3 rounded-xl bg-[#0E0E0E] border border-white/10 text-white placeholder:text-[#71717A] outline-none focus:border-[#D4AF37]/50 focus:ring-2 focus:ring-[#D4AF37]/10 transition-colors font-mono text-sm"
            />
            <p className="text-xs text-[#71717A] mt-1.5">
              Stored securely. You can update this later in Settings.
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={handleSkip}
              className="flex-1 h-11 rounded-xl border border-white/10 text-[#A1A1AA] font-medium hover:bg-white/5 transition-colors text-sm"
            >
              Skip for now
            </button>
            <button
              type="submit"
              disabled={
                loading ||
                !phoneNumberId.trim() ||
                !wabaId.trim() ||
                !accessToken.trim()
              }
              className="flex-1 h-11 rounded-xl bg-[#D4AF37] text-black font-semibold hover:bg-[#F5C542] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>Connect →</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
