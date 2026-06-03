import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustBar from "@/components/sections/trust-bar";
import CoreSolutions from "@/components/sections/core-solutions";
import Industries from "@/components/sections/industries";
import Platform from "@/components/sections/platform";
import FounderStory from "@/components/sections/founder-story";
import WhyOrthonoba from "@/components/sections/why-orthonoba";
import HomeCTA from "@/components/sections/home-cta";

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
      <TrustBar />
      <CoreSolutions />
      <Industries />
      <Platform />
      <FounderStory />
      <WhyOrthonoba />
      <HomeCTA />
    </>
  );
}
