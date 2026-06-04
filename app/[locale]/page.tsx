import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import AIWorkforceSection from "@/components/sections/AIWorkforceSection";
import VoiceIntelligenceSection from "@/components/sections/VoiceIntelligenceSection";
import BusinessAutomationSection from "@/components/sections/BusinessAutomationSection";
import CustomerOperationsSection from "@/components/sections/CustomerOperationsSection";
import MarketingGrowthSection from "@/components/sections/MarketingGrowthSection";
import DigitalTransformationSection from "@/components/sections/DigitalTransformationSection";
import WhyOrthonobaSection from "@/components/sections/WhyOrthonobaSection";
import EnterpriseIntegrationsSection from "@/components/sections/EnterpriseIntegrationsSection";
import Industries from "@/components/sections/Industries";
import BusinessOutcomesSection from "@/components/sections/BusinessOutcomesSection";
import SecuritySection from "@/components/sections/SecuritySection";
import CTA from "@/components/sections/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "ORTHONOBA — Enterprise AI Growth Platform",
    it: "ORTHONOBA — Piattaforma AI per la Crescita Aziendale",
    de: "ORTHONOBA — Enterprise KI-Wachstumsplattform",
    fr: "ORTHONOBA — Plateforme IA de Croissance Entreprise",
  };

  const descriptions: Record<string, string> = {
    en: "Transform your business with AI agents, intelligent automation and digital transformation. More revenue, more clients, less operating cost. Scale with Orthonoba.",
    it: "Trasforma la tua azienda con agenti AI, automazione intelligente e trasformazione digitale. Più ricavi, più clienti, meno costi operativi.",
    de: "Transformieren Sie Ihr Unternehmen mit KI-Agenten, intelligenter Automatisierung und digitaler Transformation. Mehr Umsatz, mehr Kunden, weniger Betriebskosten.",
    fr: "Transformez votre entreprise avec des agents IA, l'automatisation intelligente et la transformation digitale. Plus de revenus, plus de clients, moins de coûts.",
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
      {/* 1. Hero — Enterprise AI Growth Platform */}
      <Hero />

      {/* 2. AI Workforce — 6 specialized agents */}
      <AIWorkforceSection />

      {/* 3. Voice Intelligence */}
      <VoiceIntelligenceSection />

      {/* 4. Business Automation */}
      <BusinessAutomationSection />

      {/* 5. Customer Operations */}
      <CustomerOperationsSection />

      {/* 6. Marketing Growth */}
      <MarketingGrowthSection />

      {/* 7. Digital Transformation */}
      <DigitalTransformationSection />

      {/* 8. Why Orthonoba */}
      <WhyOrthonobaSection />

      {/* 9. Enterprise Integrations */}
      <EnterpriseIntegrationsSection />

      {/* 10. Industries */}
      <Industries />

      {/* 11. Business Outcomes — Real results */}
      <BusinessOutcomesSection />

      {/* 12. Enterprise Security */}
      <SecuritySection />

      {/* 13. Final CTA */}
      <CTA />
    </>
  );
}
