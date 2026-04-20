import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "ORTHONOBA | Ortodoncia Digital",
  description: "Innovación en ortodoncia digital, CAD y automatización",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
npm