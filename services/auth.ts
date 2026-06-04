import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth-helpers";
import type { OrgRole } from "@prisma/client";

const SALT_ROUNDS = 10;

export type AuthError = string;

export type RegisterResult = {
  userId: string;
  email: string;
  organizationId: string;
  slug: string;
};

export type LoginResult = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatarUrl: string | null;
  };
  organization: {
    id: string;
    name: string;
    slug: string;
    plan: string;
  };
  role: OrgRole;
};

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base;
  let attempt = 0;
  while (true) {
    const exists = await prisma.organization.findUnique({ where: { slug } });
    if (!exists) return slug;
    attempt++;
    slug = `${base}-${attempt}`;
  }
}

export async function register(
  email: string,
  password: string,
  name: string,
  organizationName: string
): Promise<{ data: RegisterResult | null; error: AuthError | null }> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password || !name.trim() || !organizationName.trim()) {
    return { data: null, error: "Completa todos los campos." };
  }

  if (password.length < 8) {
    return { data: null, error: "La contraseña debe tener al menos 8 caracteres." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return { data: null, error: "Ya existe una cuenta con ese email." };
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const slug = await uniqueSlug(toSlug(organizationName));

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: normalizedEmail,
          name: name.trim(),
          passwordHash: hash,
        },
      });

      const org = await tx.organization.create({
        data: {
          name: organizationName.trim(),
          slug,
          members: {
            create: {
              userId: user.id,
              role: "OWNER",
            },
          },
        },
      });

      return { user, org };
    });

    return {
      data: {
        userId: result.user.id,
        email: result.user.email,
        organizationId: result.org.id,
        slug: result.org.slug,
      },
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al registrar el usuario.";
    return { data: null, error: message };
  }
}

export async function login(
  email: string,
  password: string
): Promise<{ data: LoginResult | null; error: AuthError | null }> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    return { data: null, error: "Introduce email y contraseña." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        memberships: {
          include: { organization: { include: { subscription: true } } },
          orderBy: { joinedAt: "asc" },
          take: 1,
        },
      },
    });

    if (!user) return { data: null, error: "Credenciales incorrectas." };

    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) return { data: null, error: "Credenciales incorrectas." };

    const membership = user.memberships[0];
    if (!membership) {
      return { data: null, error: "El usuario no pertenece a ninguna organización." };
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = await signToken({
      userId: user.id,
      organizationId: membership.organizationId,
      role: membership.role,
      email: user.email,
    });

    return {
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
        organization: {
          id: membership.organization.id,
          name: membership.organization.name,
          slug: membership.organization.slug,
          plan: membership.organization.plan,
        },
        role: membership.role,
      },
      error: null,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error al iniciar sesión.";
    return { data: null, error: message };
  }
}
