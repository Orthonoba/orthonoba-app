"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // Evita el "flash" del contenido antes de validar el token
  if (!authChecked) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: 240 }}>
        <Navbar />
        <main style={{ padding: "32px" }}>{children}</main>
      </div>
    </div>
  );
}
