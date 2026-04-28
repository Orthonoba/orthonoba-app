"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/pacientes", label: "Pacientes", icon: Users },
  { href: "/dashboard/citas", label: "Citas", icon: Calendar },
  { href: "/dashboard/reportes", label: "Reportes", icon: FileText },
  { href: "/dashboard/configuracion", label: "Configuración", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.logo}>O</div>
        <span className={styles.brandName}>Orthonoba</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className={styles.bottom}>
        <Link href="/dashboard/ayuda" className={styles.navItem}>
          <HelpCircle size={18} />
          <span>Ayuda</span>
        </Link>
      </div>
    </aside>
  );
}
