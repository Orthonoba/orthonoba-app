import type { ReactNode } from "react";

/*
 * Root Layout — Intentionally minimal.
 *
 * This project uses next-intl's i18n routing pattern:
 * - app/layout.tsx        → passes children through (no html/body)
 * - app/[locale]/layout.tsx → provides <html lang={locale}> + <body>
 *
 * The CSS entry point is imported in app/[locale]/layout.tsx so the
 * correct <html> element is present when styles are applied.
 *
 * Auth routes (app/(auth)/*) inherit the html/body from Next.js's
 * built-in minimal document wrapper since they are outside [locale]/.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
