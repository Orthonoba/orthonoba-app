import type { MetadataRoute } from "next";
import { locales } from "@/src/i18n/config";

const BASE_URL = "https://orthonoba.app";

const PUBLIC_ROUTES = [
  "",
  "/services",
  "/ai-agents",
  "/automation",
  "/web-development",
  "/marketing",
  "/portfolio",
  "/blog",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of PUBLIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
