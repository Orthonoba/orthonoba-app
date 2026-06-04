import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Platform from "@/components/sections/Platform";
import Industries from "@/components/sections/Industries";
import Founder from "@/components/sections/Founder";
import CTA from "@/components/sections/CTA";

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
      <Services />
      <Platform />
      <Industries />
      <Founder />
      <CTA />
    </>
  );
}
