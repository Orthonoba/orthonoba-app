import { getTranslations } from "next-intl/server";
import WebDevSection from "@/components/sections/webdev-section";
import ContactCTA from "@/components/sections/contact-cta";
import { Globe } from "lucide-react";

export default async function WebDevelopmentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "webDevelopmentSection" });

  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <Globe size={14} />
            Web Development
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400">{t("subtitle")}</p>
        </div>
      </section>
      <WebDevSection />
      <ContactCTA />
    </>
  );
}
