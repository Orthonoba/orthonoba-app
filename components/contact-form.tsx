"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      locale,
    };

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/60 transition-colors";

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
        <p className="text-green-400 font-semibold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          required
          placeholder={t("name")}
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          required
          placeholder={t("email")}
          className={inputClass}
        />
      </div>
      <input
        name="company"
        type="text"
        placeholder={t("company")}
        className={inputClass}
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={t("message")}
        className={`${inputClass} resize-none`}
      />

      {status === "error" && (
        <p className="text-red-400 text-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-400 text-slate-900 rounded-xl font-bold text-sm hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={15} />
        {status === "loading" ? "..." : t("submit")}
      </button>
    </form>
  );
}
