"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="w-56 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-gray-600">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <div ref={menuRef} className="relative">
          <button
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            U
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
