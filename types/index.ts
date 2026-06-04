// ═══════════════════════════════════════════════════
// ORTHONOBA PLATFORM — TypeScript Types
// ═══════════════════════════════════════════════════

// ── Primitives ────────────────────────────────────
export type ID = string;
export type Timestamp = string;
export type Locale = "en" | "it" | "de" | "fr";

// ── API ───────────────────────────────────────────
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ── Auth ──────────────────────────────────────────
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  organizationName?: string;
}

export interface AuthSession {
  userId: ID;
  email: string;
  name: string;
  organizationId: ID;
  role: OrgRole;
  plan: PlanTier;
}

// ── Organization ──────────────────────────────────
export interface Organization {
  id: ID;
  name: string;
  slug: string;
  plan: PlanTier;
  locale: Locale;
  timezone: string;
  logoUrl: string | null;
  billingCustomerId: string | null;
  createdAt: Timestamp;
}

// ── User ──────────────────────────────────────────
export interface PlatformUser {
  id: ID;
  email: string;
  name: string;
  avatarUrl: string | null;
  locale: Locale;
  timezone: string;
  isActive: boolean;
  lastLoginAt: Timestamp | null;
  createdAt: Timestamp;
}

export interface OrganizationMember {
  userId: ID;
  user: PlatformUser;
  role: OrgRole;
  joinedAt: Timestamp;
}

// ── RBAC ──────────────────────────────────────────
export type OrgRole =
  | "OWNER"
  | "ADMIN"
  | "MANAGER"
  | "SALES"
  | "SUPPORT"
  | "OPERATOR"
  | "VIEWER";

export type PlanTier =
  | "FREE"
  | "STARTER"
  | "PROFESSIONAL"
  | "BUSINESS"
  | "ENTERPRISE";

// ── Billing ───────────────────────────────────────
export interface Subscription {
  id: ID;
  organizationId: ID;
  plan: PlanTier;
  status: SubscriptionStatus;
  currentPeriodEnd: Timestamp;
  cancelAtPeriodEnd: boolean;
  trialEndsAt: Timestamp | null;
}

export type SubscriptionStatus =
  | "TRIALING"
  | "ACTIVE"
  | "PAST_DUE"
  | "CANCELED"
  | "INCOMPLETE"
  | "PAUSED";

export interface PricingPlan {
  id: PlanTier;
  name: string;
  price: number | "custom";
  currency: string;
  interval: "month" | "year";
  description: string;
  features: string[];
  limits: {
    users: number | "unlimited";
    aiAgents: number | "unlimited";
    voiceMinutes: number | "unlimited";
    automations: number | "unlimited";
    storageGb: number | "unlimited";
  };
  highlighted?: boolean;
  ctaLabel: string;
}

// ── AI Agents ─────────────────────────────────────
export type AgentType =
  | "CHAT"
  | "VOICE"
  | "WHATSAPP"
  | "EMAIL"
  | "CRM"
  | "LEAD_QUALIFIER"
  | "APPOINTMENT"
  | "CUSTOM";

export type Channel =
  | "CHAT"
  | "VOICE"
  | "WHATSAPP"
  | "EMAIL"
  | "SMS"
  | "API";

export interface AIAgent {
  id: ID;
  organizationId: ID;
  name: string;
  type: AgentType;
  model: string;
  systemPrompt: string;
  isActive: boolean;
  createdAt: Timestamp;
}

export interface Conversation {
  id: ID;
  organizationId: ID;
  agentId: ID | null;
  channel: Channel;
  status: "OPEN" | "PENDING" | "RESOLVED" | "CLOSED";
  contactId: ID | null;
  createdAt: Timestamp;
}

// ── CRM ───────────────────────────────────────────
export interface Contact {
  id: ID;
  organizationId: ID;
  firstName: string;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  tags: string[];
  createdAt: Timestamp;
}

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "NEGOTIATION"
  | "WON"
  | "LOST";

export interface Lead {
  id: ID;
  organizationId: ID;
  contactId: ID | null;
  title: string;
  value: number | null;
  currency: string;
  status: LeadStatus;
  score: number;
  createdAt: Timestamp;
}

// ── Automation ────────────────────────────────────
export interface Automation {
  id: ID;
  organizationId: ID;
  name: string;
  description: string | null;
  trigger: AutomationTrigger;
  isActive: boolean;
  runCount: number;
  lastRunAt: Timestamp | null;
  createdAt: Timestamp;
}

export type AutomationTrigger =
  | "WEBHOOK"
  | "SCHEDULE"
  | "NEW_LEAD"
  | "NEW_CONTACT"
  | "CONVERSATION_ENDED"
  | "FORM_SUBMITTED"
  | "MANUAL";

// ── UI Components ─────────────────────────────────
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// ── Navigation ────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface NavDropdown {
  label: string;
  sections: NavSection[];
  cols?: 1 | 2 | 3;
}

// ── Vertical: Dental ──────────────────────────────
export type CasoEstado =
  | "RECIBIDO"
  | "EN_PROCESO"
  | "EN_REVISION"
  | "COMPLETADO"
  | "ENTREGADO"
  | "CANCELADO";

export interface Paciente {
  id: ID;
  nombre: string;
  email: string | null;
  telefono: string | null;
  organizationId: ID | null;
  createdAt: Timestamp;
}

export interface Caso {
  id: ID;
  titulo: string;
  descripcion: string | null;
  estado: CasoEstado;
  pacienteId: ID;
  createdAt: Timestamp;
}
