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
 * API route prefixes that require JWT authentication.
 * Returns 401 JSON when unauthenticated (not a redirect).
 */
const PROTECTED_API_PREFIXES = [
  "/api/agents",
  "/api/organizations",
  "/api/onboarding",
  "/api/pacientes",
  "/api/stripe/checkout",
  "/api/stripe/portal",
  "/api/whatsapp/accounts",
];

/**
 * HTTP methods that mutate state — used for CSRF defence-in-depth check.
 */
const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

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

function isProtectedApiPath(pathname: string): boolean {
  return PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p));
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

  // 3. CSRF: reject cross-origin mutating requests to protected API routes.
  //    SameSite=Lax already blocks most CSRF; explicit origin check adds defence-in-depth.
  if (isProtectedApiPath(pathname) && MUTATING_METHODS.has(req.method)) {
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // 4. Protected API routes — JWT required, return 401 JSON on failure
  if (isProtectedApiPath(pathname)) {
    const token =
      req.cookies.get("auth_token")?.value ??
      req.cookies.get("auth-token")?.value ??
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const payload = await verifyTokenEdge(token);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const res = NextResponse.next();
    if (orgSlug) res.headers.set("x-org-slug", orgSlug);
    res.headers.set("x-user-id", payload.userId);
    res.headers.set("x-org-id", payload.organizationId);
    res.headers.set("x-user-role", payload.role);   // read by auth-helpers.ts
    res.headers.set("x-org-role", payload.role);    // alias kept for compatibility
    res.headers.set("x-user-email", payload.email); // read by auth-helpers.ts
    return res;
  }

  // 5. Dashboard protection — JWT verification before any intl processing
  if (pathname.startsWith(DASHBOARD_PREFIX)) {
    const token =
      req.cookies.get("auth_token")?.value ??
      req.cookies.get("auth-token")?.value ??
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
      // Clear both cookie name variants on expiry
      redirectRes.cookies.delete("auth_token");
      redirectRes.cookies.delete("auth-token");
      return redirectRes;
    }

    const res = NextResponse.next();
    if (orgSlug) res.headers.set("x-org-slug", orgSlug);
    res.headers.set("x-user-id", payload.userId);
    res.headers.set("x-org-id", payload.organizationId);
    res.headers.set("x-user-role", payload.role);   // read by auth-helpers.ts
    res.headers.set("x-org-role", payload.role);    // alias kept for compatibility
    res.headers.set("x-user-email", payload.email); // read by auth-helpers.ts
    return res;
  }

  // 6. Public locale routes — delegate to next-intl for locale detection / redirect
  if (shouldApplyIntl(pathname)) {
    const intlResponse = intlMiddleware(req);
    if (orgSlug) intlResponse.headers.set("x-org-slug", orgSlug);
    return intlResponse;
  }

  // 7. Remaining routes (non-dashboard API calls, auth pages outside locale)
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
