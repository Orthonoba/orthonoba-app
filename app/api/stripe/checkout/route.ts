import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/services/billing";
import { verifyRequestToken } from "@/lib/auth-helpers";
import { PLANS } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ctx = await verifyRequestToken(req);
  if (!ctx) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { planId?: string; successPath?: string; cancelPath?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const planId = body.planId?.toUpperCase();
  if (!planId || !(planId in PLANS)) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "";

  // Allow callers to override redirect paths (e.g., onboarding wizard)
  const successPath = typeof body.successPath === "string" ? body.successPath : "/dashboard/billing?success=true";
  const cancelPath = typeof body.cancelPath === "string" ? body.cancelPath : "/dashboard/billing?canceled=true";

  try {
    const url = await createCheckoutSession(
      ctx.organizationId,
      planId as keyof typeof PLANS,
      `${origin}${successPath}`,
      `${origin}${cancelPath}`
    );
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
