"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si no hay token → redirige a login
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Dashboard</h1>
      <p>Bienvenido a Orthonoba 🚀</p>
    </div>
  );
}
