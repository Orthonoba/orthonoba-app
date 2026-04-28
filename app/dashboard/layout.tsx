import type { ReactNode } from "react";
import Sidebar from "@/components/siderbar";
import Navbar from "@/components/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col">
        <Navbar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
