import { prisma } from "@/lib/prisma";
import type { AgentType } from "@prisma/client";

const DEFAULT_PROMPTS: Partial<Record<AgentType, string>> = {
  CHAT: "You are a helpful customer service assistant for this business. Be friendly, professional, and concise. Help customers with their questions and guide them toward the right solution.",
  WHATSAPP:
    "You are a WhatsApp business assistant. Respond naturally and conversationally. Help customers with their inquiries and capture their contact information when appropriate.",
  VOICE:
    "You are a voice agent. Keep responses brief and clear for spoken conversation. Speak naturally, be helpful, and confirm important information by repeating it back.",
  LEAD_QUALIFIER:
    "You are a lead qualification specialist. Your goal is to understand the prospect's needs, timeline, budget, and decision-making process through friendly conversation. Capture key information to help the sales team follow up effectively.",
  APPOINTMENT:
    "You are an appointment scheduling assistant. Help customers book, reschedule, or cancel appointments. Collect necessary information and confirm all details clearly.",
  CRM: "You are a CRM assistant. Help team members find, update, and manage customer records. Surface relevant insights and suggest next best actions.",
};

export type CreateAgentInput = {
  organizationId: string;
  name: string;
  type: AgentType;
  systemPrompt?: string;
};

export async function createAgent(input: CreateAgentInput) {
  return prisma.aIAgent.create({
    data: {
      organizationId: input.organizationId,
      name: input.name,
      type: input.type,
      model: "claude-sonnet-4-6",
      systemPrompt:
        input.systemPrompt ??
        DEFAULT_PROMPTS[input.type] ??
        "You are a helpful AI assistant.",
      settings: {},
      isActive: true,
    },
  });
}

export async function listAgents(organizationId: string) {
  return prisma.aIAgent.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getAgent(id: string, organizationId: string) {
  return prisma.aIAgent.findFirst({
    where: { id, organizationId },
  });
}

export async function updateAgent(
  id: string,
  organizationId: string,
  data: Partial<{ name: string; systemPrompt: string; isActive: boolean }>
) {
  return prisma.aIAgent.updateMany({
    where: { id, organizationId },
    data,
  });
}

export async function deleteAgent(id: string, organizationId: string) {
  return prisma.aIAgent.deleteMany({
    where: { id, organizationId },
  });
}
