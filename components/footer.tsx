import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-black text-slate-900 text-sm">
                O
              </div>
              <span className="font-bold text-white text-base tracking-tight">ORTHONOBA</span>
            </div>
            <p className="text-sm text-slate-500 mb-3">{t("tagline")}</p>
            <p className="text-xs text-slate-600">{t("swissMarket")}</p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {t("services")}
            </p>
            <ul className="space-y-2.5">
              {(["aiAgents", "automation", "webDev", "marketing"] as const).map((key) => (
                <li key={key}>
                  <span className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                    {t(`links.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {t("company")}
            </p>
            <ul className="space-y-2.5">
              {(["about", "portfolio", "blog", "contact"] as const).map((key) => (
                <li key={key}>
                  <span className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                    {t(`links.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
              {t("legal")}
            </p>
            <ul className="space-y-2.5">
              {(["privacy", "terms", "gdpr"] as const).map((key) => (
                <li key={key}>
                  <span className="text-sm text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
                    {t(`links.${key}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {year} ORTHONOBA.APP — {t("rights")}
          </p>
          <p className="text-xs text-slate-700">orthonoba.app</p>
        </div>
      </div>
    </footer>
  );
}
