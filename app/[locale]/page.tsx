import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import ServicesOverview from "@/components/sections/services-overview";
import AISolutions from "@/components/sections/ai-solutions";
import AutomationSection from "@/components/sections/automation-section";
import WebDevSection from "@/components/sections/webdev-section";
import Industries from "@/components/sections/industries";
import TrustSection from "@/components/sections/testimonials";
import ContactCTA from "@/components/sections/contact-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    title: t("title"),
    description: t("description"),
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
      title: t("title"),
      description: t("description"),
      url: `https://orthonoba.app/${locale}`,
      siteName: "ORTHONOBA",
      type: "website",
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <AISolutions />
      <AutomationSection />
      <WebDevSection />
      <Industries />
      <TrustSection />
      <ContactCTA />
    </>
  );
}
