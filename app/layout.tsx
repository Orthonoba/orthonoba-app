import "./globals.css";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

export const metadata = {
  title: "Orthonoba",
  description: "Plataforma de ortodoncia digital",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}