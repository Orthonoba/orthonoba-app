import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "ORTHONOBA — Plataforma Dental Digital | Clínicas · Laboratorios · Pacientes",
  description:
    "Software integral para gestión de casos dentales. Conecta clínicas, laboratorios y pacientes con visor 3D, diseño CAD, alineadores, prescripción digital y flujo de trabajo automatizado.",
  keywords: [
    "software dental",
    "laboratorio dental",
    "clínica dental",
    "alineadores transparentes",
    "diseño CAD dental",
    "visor 3D dental",
    "impresión 3D dental",
    "prescripción digital",
    "gestión de pacientes",
    "ortodoncia digital",
  ],
  openGraph: {
    title: "ORTHONOBA — Plataforma Dental Digital",
    description:
      "Conecta clínicas, laboratorios y pacientes en una sola plataforma.",
    type: "website",
    locale: "es_ES",
    siteName: "ORTHONOBA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
