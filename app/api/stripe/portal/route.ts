import { NextResponse } from "next/server";
import { createPortalSession } from "@/services/billing";
import { verifyRequestToken } from "@/lib/auth-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ctx = await verifyRequestToken(req);
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "";

  try {
    const url = await createPortalSession(
      ctx.organizationId,
      `${origin}/dashboard/billing`
    );
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Portal session failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
