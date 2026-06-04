import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth-helpers";

const PUBLIC_PATHS = [
  "/api/stripe/webhook",
  "/api/whatsapp/webhook",
  "/api/v1/auth",
  "/api/auth",
];

const DASHBOARD_PREFIX = "/dashboard";

function isPublicApiPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function resolveOrgSlug(req: NextRequest): string | null {
  // Subdomain resolution: acme.orthonoba.app → "acme"
  const host = req.headers.get("host") ?? "";
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "orthonoba.app";

  if (host.endsWith(`.${appDomain}`)) {
    const slug = host.replace(`.${appDomain}`, "");
    // Exclude www and app itself
    if (slug && slug !== "www" && slug !== "app") {
      return slug;
    }
  }

  return null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip webhook routes — they use their own auth
  if (isPublicApiPath(pathname)) {
    return NextResponse.next();
  }

  // Resolve tenant from subdomain and inject as header
  const orgSlug = resolveOrgSlug(req);
  const res = NextResponse.next();

  if (orgSlug) {
    res.headers.set("x-org-slug", orgSlug);
  }

  // Protect /dashboard routes
  if (pathname.startsWith(DASHBOARD_PREFIX)) {
    const token =
      req.cookies.get("auth_token")?.value ??
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = verifyToken(token);
    if (!payload) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      const redirectRes = NextResponse.redirect(loginUrl);
      redirectRes.cookies.delete("auth_token");
      return redirectRes;
    }

    // Inject tenant context headers for Server Components and Route Handlers
    res.headers.set("x-user-id", payload.userId);
    res.headers.set("x-org-id", payload.organizationId);
    res.headers.set("x-org-role", payload.role);
  }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/stripe/checkout",
    "/api/stripe/portal",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
