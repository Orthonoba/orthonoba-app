import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/src/i18n/routing";
import { verifyTokenEdge } from "@/lib/auth-edge";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DASHBOARD_PREFIX = "/dashboard";
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "orthonoba.app";

/**
 * API paths that skip all middleware logic (webhooks use their own auth).
 */
const PUBLIC_API_PATHS = [
  "/api/stripe/webhook",
  "/api/whatsapp/webhook",
  "/api/v1/auth",
  "/api/auth",
];

/**
 * Path prefixes that must NOT receive next-intl locale treatment.
 * Dashboard, auth pages, and all API routes stay locale-neutral.
 */
const NON_INTL_PREFIXES = [
  "/api",
  "/dashboard",
  "/login",
  "/register",
  "/forgot-password",
];

// ---------------------------------------------------------------------------
// next-intl middleware (public locale routes only)
// ---------------------------------------------------------------------------

const intlMiddleware = createMiddleware(routing);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isPublicApiPath(pathname: string): boolean {
  return PUBLIC_API_PATHS.some((p) => pathname.startsWith(p));
}

function resolveOrgSlug(req: NextRequest): string | null {
  const host = req.headers.get("host") ?? "";
  if (host.endsWith(`.${APP_DOMAIN}`)) {
    const slug = host.replace(`.${APP_DOMAIN}`, "");
    if (slug && slug !== "www" && slug !== "app") return slug;
  }
  return null;
}

function shouldApplyIntl(pathname: string): boolean {
  return !NON_INTL_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

// ---------------------------------------------------------------------------
// Unified middleware
// ---------------------------------------------------------------------------

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Webhooks and fully public API paths — bypass everything
  if (isPublicApiPath(pathname)) {
    return NextResponse.next();
  }

  // 2. Resolve multi-tenant org from subdomain (applies to all routes)
  const orgSlug = resolveOrgSlug(req);

  // 3. Dashboard protection — JWT verification before any intl processing
  if (pathname.startsWith(DASHBOARD_PREFIX)) {
    const token =
      req.cookies.get("auth_token")?.value ??
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyTokenEdge(token);
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      const redirectRes = NextResponse.redirect(loginUrl);
      redirectRes.cookies.delete("auth_token");
      return redirectRes;
    }

    // Inject tenant + auth context headers for Server Components and Route Handlers
    const res = NextResponse.next();
    if (orgSlug) res.headers.set("x-org-slug", orgSlug);
    res.headers.set("x-user-id", payload.userId);
    res.headers.set("x-org-id", payload.organizationId);
    res.headers.set("x-org-role", payload.role);
    return res;
  }

  // 4. Public locale routes — delegate to next-intl for locale detection / redirect
  if (shouldApplyIntl(pathname)) {
    const intlResponse = intlMiddleware(req);
    if (orgSlug) intlResponse.headers.set("x-org-slug", orgSlug);
    return intlResponse;
  }

  // 5. Remaining routes (non-dashboard API calls, auth pages outside locale)
  const res = NextResponse.next();
  if (orgSlug) res.headers.set("x-org-slug", orgSlug);
  return res;
}

// ---------------------------------------------------------------------------
// Matcher — single pattern, excludes Next.js internals and static assets
// ---------------------------------------------------------------------------

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
