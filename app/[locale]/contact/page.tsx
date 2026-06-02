import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ContactForm from "@/components/contact-form";
import { Mail, Clock } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <ContactForm locale={locale} />
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Mail size={18} />
              </div>
              <p className="text-sm text-slate-400 mb-1">Email</p>
              <p className="font-semibold text-white">{t("info.email")}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 mb-4">
                <Clock size={18} />
              </div>
              <p className="text-sm text-slate-400 mb-1">Response time</p>
              <p className="font-semibold text-white">{t("info.response")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
