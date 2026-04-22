import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import type { ReactNode } from "react";

export const metadata: Metadata = {
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
      <body className="bg-white text-black">
        <Navbar />
        {children}
      </body>
    </html>
  );
}