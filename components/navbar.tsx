"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, LogOut, User, ChevronDown } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.searchBox}>
        <Search size={16} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar pacientes, citas..."
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} aria-label="Notificaciones">
          <Bell size={18} />
          <span className={styles.badge}></span>
        </button>

        <div className={styles.userMenu} ref={menuRef}>
          <button
            className={styles.userBtn}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={styles.avatar}>U</div>
            <span className={styles.userName}>Usuario</span>
            <ChevronDown size={14} />
          </button>

          {menuOpen && (
            <div className={styles.dropdown}>
              <button className={styles.dropdownItem}>
                <User size={16} />
                Mi perfil
              </button>
              <button
                className={`${styles.dropdownItem} ${styles.logout}`}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
