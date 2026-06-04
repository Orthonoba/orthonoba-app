import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import type { OrgRole } from "@prisma/client";

export type JwtPayload = {
  userId: string;
  organizationId: string;
  role: OrgRole;
  email: string;
};

export type AuthContext = {
  userId: string;
  organizationId: string;
  role: OrgRole;
  email: string;
};

function getSecretBytes(): Uint8Array {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecretBytes());
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretBytes());
    const { userId, organizationId, role, email } = payload as Record<string, unknown>;
    if (
      typeof userId !== "string" ||
      typeof organizationId !== "string" ||
      typeof role !== "string" ||
      typeof email !== "string"
    ) {
      return null;
    }
    return { userId, organizationId, role: role as OrgRole, email };
  } catch {
    return null;
  }
}

export async function getAuthContext(): Promise<AuthContext | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getCurrentUser() {
  const ctx = await getAuthContext();
  if (!ctx) return null;
  return prisma.user.findUnique({
    where: { id: ctx.userId },
    select: { id: true, email: true, name: true, avatarUrl: true, locale: true },
  });
}

export async function getCurrentOrganization() {
  const ctx = await getAuthContext();
  if (!ctx) return null;
  return prisma.organization.findUnique({
    where: { id: ctx.organizationId },
    include: { subscription: true },
  });
}

export async function requireOrganization() {
  const org = await getCurrentOrganization();
  if (!org) throw new Error("UNAUTHORIZED");
  return org;
}

export async function requireRole(minimumRole: OrgRole) {
  const ctx = await getAuthContext();
  if (!ctx) throw new Error("UNAUTHORIZED");
  const roleOrder: OrgRole[] = [
    "VIEWER",
    "MEMBER",
    "OPERATOR",
    "SUPPORT",
    "SALES",
    "MANAGER",
    "ADMIN",
    "OWNER",
  ];
  const userLevel = roleOrder.indexOf(ctx.role);
  const requiredLevel = roleOrder.indexOf(minimumRole);
  if (userLevel < requiredLevel) throw new Error("FORBIDDEN");
  return ctx;
}

export function extractTokenFromHeader(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export async function verifyRequestToken(req: Request): Promise<JwtPayload | null> {
  const token = extractTokenFromHeader(req);
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Resolves auth context for Route Handlers, handling two cases:
 * 1. Requests through middleware (cookie auth): reads x-user-id / x-org-id / x-user-role
 * 2. Direct API calls: verifies Authorization: Bearer token
 */
export async function getRequestAuth(req: Request): Promise<AuthContext | null> {
  const userId = req.headers.get("x-user-id");
  const orgId = req.headers.get("x-org-id");
  const role = req.headers.get("x-user-role") as OrgRole | null;

  if (userId && orgId && role) {
    return { userId, organizationId: orgId, role, email: req.headers.get("x-user-email") ?? "" };
  }

  // Fallback: Bearer token for programmatic API clients
  return verifyRequestToken(req);
}
