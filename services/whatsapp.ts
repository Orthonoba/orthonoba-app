import { prisma } from "@/lib/prisma";
import type { WaMessageDirection, WaMessageType } from "@prisma/client";

// ── WhatsApp Cloud API types ─────────────────────────────────────────────────

type WaTextMessage = {
  type: "text";
  text: { body: string };
};

type WaIncomingMessage = {
  id: string;
  from: string;
  type: string;
  text?: { body: string };
  timestamp: string;
};

type WaContact = {
  profile?: { name?: string };
  wa_id: string;
};

type WaChange = {
  value: {
    messaging_product: string;
    metadata: { phone_number_id: string };
    contacts?: WaContact[];
    messages?: WaIncomingMessage[];
    statuses?: { id: string; status: string; timestamp: string }[];
  };
};

export type WaWebhookPayload = {
  entry: { changes: WaChange[] }[];
};

// ── Send message ─────────────────────────────────────────────────────────────

export async function sendWhatsAppMessage(
  phoneNumberId: string,
  accessToken: string,
  to: string,
  message: WaTextMessage
): Promise<void> {
  const res = await fetch(
    `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        ...message,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`WhatsApp API error: ${err}`);
  }
}

// ── Process inbound webhook ──────────────────────────────────────────────────

export async function processWebhookPayload(payload: WaWebhookPayload): Promise<void> {
  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (change.value.messaging_product !== "whatsapp") continue;

      const phoneNumberId = change.value.metadata.phone_number_id;
      const account = await prisma.whatsAppAccount.findUnique({
        where: { phoneNumberId },
      });
      if (!account || !account.isActive) continue;

      const waContacts = change.value.contacts ?? [];
      const messages = change.value.messages ?? [];

      for (const msg of messages) {
        await processInboundMessage(account.id, account.organizationId, msg, waContacts);
      }

      const statuses = change.value.statuses ?? [];
      for (const status of statuses) {
        await updateMessageStatus(status.id, status.status);
      }
    }
  }
}

async function processInboundMessage(
  accountId: string,
  organizationId: string,
  msg: WaIncomingMessage,
  waContacts: WaContact[]
) {
  const contactName = waContacts.find((c) => c.wa_id === msg.from)?.profile?.name;

  // Upsert WhatsAppContact
  await prisma.whatsAppContact.upsert({
    where: { organizationId_waId: { organizationId, waId: msg.from } },
    create: { organizationId, waId: msg.from, name: contactName },
    update: { name: contactName ?? undefined },
  });

  // Upsert conversation
  let conversation = await prisma.whatsAppConversation.findFirst({
    where: { accountId, waContactId: msg.from, status: { in: ["OPEN", "PENDING"] } },
  });

  if (!conversation) {
    conversation = await prisma.whatsAppConversation.create({
      data: { accountId, organizationId, waContactId: msg.from },
    });

    // Auto-create Lead for new conversations
    await createLeadFromWhatsApp(organizationId, msg.from, contactName, conversation.id);
  }

  const content = msg.type === "text" ? (msg.text?.body ?? "") : `[${msg.type}]`;

  // Dedup: skip if message already stored
  const exists = await prisma.whatsAppMessage.findUnique({ where: { waMessageId: msg.id } });
  if (exists) return;

  await prisma.whatsAppMessage.create({
    data: {
      conversationId: conversation.id,
      waMessageId: msg.id,
      direction: "INBOUND" as WaMessageDirection,
      type: (msg.type.toUpperCase() as WaMessageType) ?? "TEXT",
      content,
      status: "DELIVERED",
      sentAt: new Date(parseInt(msg.timestamp, 10) * 1000),
    },
  });
}

async function updateMessageStatus(waMessageId: string, status: string) {
  const statusMap: Record<string, string> = {
    sent: "SENT",
    delivered: "DELIVERED",
    read: "READ",
    failed: "FAILED",
  };
  const mapped = statusMap[status];
  if (!mapped) return;

  await prisma.whatsAppMessage
    .update({
      where: { waMessageId },
      data: {
        status: mapped as "SENT" | "DELIVERED" | "READ" | "FAILED",
        deliveredAt: mapped === "DELIVERED" ? new Date() : undefined,
        readAt: mapped === "READ" ? new Date() : undefined,
      },
    })
    .catch(() => null); // message may not exist yet
}

async function createLeadFromWhatsApp(
  organizationId: string,
  waId: string,
  name: string | undefined,
  conversationId: string
) {
  const contact = await prisma.contact.create({
    data: {
      organizationId,
      firstName: name ?? waId,
      phone: waId,
      source: "whatsapp",
    },
  });

  await prisma.lead.create({
    data: {
      organizationId,
      contactId: contact.id,
      title: `WhatsApp — ${name ?? waId}`,
      status: "NEW",
      metadata: { conversationId, waId },
    },
  });

  // Link contact to conversation
  await prisma.whatsAppConversation.update({
    where: { id: conversationId },
    data: { contactId: contact.id },
  });
}
