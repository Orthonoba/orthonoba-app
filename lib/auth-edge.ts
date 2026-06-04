import { jwtVerify } from "jose";
import type { OrgRole } from "@prisma/client";

export type JwtEdgePayload = {
  userId: string;
  organizationId: string;
  role: OrgRole;
  email: string;
};

/**
 * Edge Runtime-safe JWT verification using Web Crypto API (jose).
 * Use this only in middleware. For Server Components / API routes,
 * use verifyToken() from @/lib/auth-helpers instead.
 */
export async function verifyTokenEdge(
  token: string
): Promise<JwtEdgePayload | null> {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    const { userId, organizationId, role, email } = payload as Record<
      string,
      unknown
    >;

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
