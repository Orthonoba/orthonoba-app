import { prisma } from "@/lib/prisma";

export interface AuditLogParams {
  organizationId: string;
  userId?: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}

export async function createAuditLog(params: AuditLogParams): Promise<void> {
  try {
    await prisma.auditLog.create({ data: params });
  } catch {
    // Audit log failure must never break the main request flow
  }
}
