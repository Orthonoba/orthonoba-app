import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { processWebhookPayload, type WaWebhookPayload } from "@/services/whatsapp";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function verifyMetaSignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (!appSecret) {
    // If app secret is not configured, skip verification (dev/staging without WA)
    logger.warn("WHATSAPP_APP_SECRET not set — skipping HMAC verification", "whatsapp/webhook");
    return true;
  }

  if (!signatureHeader?.startsWith("sha256=")) return false;

  const expected = "sha256=" + createHmac("sha256", appSecret).update(rawBody).digest("hex");

  try {
    return timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected));
  } catch {
    return false;
  }
}

// Meta webhook verification (GET)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Meta webhook events (POST)
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-hub-signature-256");

  if (!verifyMetaSignature(rawBody, signature)) {
    logger.warn("WhatsApp webhook HMAC verification failed", "whatsapp/webhook");
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let payload: WaWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WaWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Respond immediately to Meta — processing is async
  processWebhookPayload(payload).catch((err) => {
    logger.error("WhatsApp webhook processing failed", "whatsapp/webhook", err);
  });

  return NextResponse.json({ received: true });
}
