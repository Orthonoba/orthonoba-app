import { NextResponse } from "next/server";
import { processWebhookPayload, type WaWebhookPayload } from "@/services/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Meta webhook verification
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

export async function POST(req: Request) {
  let payload: WaWebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Respond immediately to Meta — processing is async
  processWebhookPayload(payload).catch((err) => {
    console.error("[WhatsApp Webhook]", err);
  });

  return NextResponse.json({ received: true });
}
