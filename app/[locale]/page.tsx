import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Platform from "@/components/sections/Platform";
import VoiceAgents from "@/components/sections/VoiceAgents";
import AutomationSection from "@/components/sections/AutomationSection";
import Industries from "@/components/sections/Industries";
import MetricsSection from "@/components/sections/MetricsSection";
import PricingPreview from "@/components/sections/PricingPreview";
import SecuritySection from "@/components/sections/SecuritySection";
import CTA from "@/components/sections/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "ORTHONOBA — AI Business Operating System",
    it: "ORTHONOBA — Sistema Operativo AI per le Aziende",
    de: "ORTHONOBA — KI-Betriebssystem für Unternehmen",
    fr: "ORTHONOBA — Système d'Exploitation IA pour Entreprises",
  };

  const descriptions: Record<string, string> = {
    en: "AI agents, voice automation, CRM and enterprise workflows for any industry. Transform your business operations with the ORTHONOBA platform.",
    it: "Agenti AI, automazione vocale, CRM e workflow aziendali per qualsiasi settore.",
    de: "KI-Agenten, Sprachautomatisierung, CRM und Unternehmens-Workflows für jede Branche.",
    fr: "Agents IA, automatisation vocale, CRM et workflows d'entreprise pour tous les secteurs.",
  };

  const title = titles[locale] ?? titles.en;
  const description = descriptions[locale] ?? descriptions.en;

  return {
    title,
    description,
    alternates: {
      canonical: `https://orthonoba.app/${locale}`,
      languages: {
        it: "https://orthonoba.app/it",
        de: "https://orthonoba.app/de",
        fr: "https://orthonoba.app/fr",
        en: "https://orthonoba.app/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://orthonoba.app/${locale}`,
      siteName: "ORTHONOBA",
      type: "website",
    },
  };
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — AI Business Operating System */}
      <Hero />

      {/* 2. Platform Capabilities — 6 core modules */}
      <Services />

      {/* 3. AI Agents Ecosystem */}
      <Platform />

      {/* 4. Voice Agents */}
      <VoiceAgents />

      {/* 5. Business Automation */}
      <AutomationSection />

      {/* 6. Industry Solutions — 8 verticals */}
      <Industries />

      {/* 7. Success Metrics */}
      <MetricsSection />

      {/* 8. Pricing Preview */}
      <PricingPreview />

      {/* 9. Enterprise Security */}
      <SecuritySection />

      {/* 10. Final CTA — Book Demo */}
      <CTA />
    </>
  );
}
