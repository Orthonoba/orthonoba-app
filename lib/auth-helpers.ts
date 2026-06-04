import jwt from "jsonwebtoken";
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

function getSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
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

export function verifyRequestToken(req: Request): JwtPayload | null {
  const token = extractTokenFromHeader(req);
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Resolves auth context for Route Handlers, handling two cases:
 * 1. Requests through middleware (cookie auth): reads x-user-id / x-org-id / x-user-role
 * 2. Direct API calls: verifies Authorization: Bearer token
 */
export function getRequestAuth(req: Request): AuthContext | null {
  const userId = req.headers.get('x-user-id')
  const orgId = req.headers.get('x-org-id')
  const role = req.headers.get('x-user-role') as OrgRole | null

  if (userId && orgId && role) {
    return { userId, organizationId: orgId, role, email: req.headers.get('x-user-email') ?? '' }
  }

  // Fallback: Bearer token for programmatic API clients
  return verifyRequestToken(req)
}
