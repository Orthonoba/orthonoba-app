import { getTranslations } from "next-intl/server";
import { BookOpen, Rss } from "lucide-react";

// CMS integration pending — Sanity or Strapi will replace this placeholder.
// Posts will be fetched via: await client.fetch(POSTS_QUERY) once connected.

const PLACEHOLDER_CATEGORIES = ["ai", "automation", "seo", "marketing", "web"] as const;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return (
    <section className="pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <BookOpen size={14} />
            Blog
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {PLACEHOLDER_CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="px-4 py-1.5 rounded-full border border-slate-700 text-slate-400 text-sm hover:border-slate-600 hover:text-slate-300 transition-colors cursor-pointer"
            >
              {t(`categories.${cat}`)}
            </span>
          ))}
        </div>

        {/* CMS coming soon state */}
        <div className="border border-dashed border-slate-700 rounded-2xl p-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-5">
            <Rss size={26} />
          </div>
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            {t("cmsLabel")}
          </p>
          <h2 className="text-2xl font-bold text-white mb-3">{t("cmsTitle")}</h2>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            {t("cmsDesc")}
          </p>
        </div>
      </div>
    </section>
  );
}
