"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "@/src/i18n/navigation";
import type { NavDropdown } from "@/types";

interface MegaMenuProps extends NavDropdown {}

export default function MegaMenu({ label, sections, cols = 1 }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        close();
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  const gridClass =
    cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1";

  const panelWidth =
    cols === 3 ? "w-[620px]" : cols === 2 ? "w-[440px]" : "w-[260px]";

  return (
    <div ref={ref} className="relative">
      <button
        ref={triggerRef}
        className={[
          "flex items-center gap-1.5 text-xs tracking-[0.15em] uppercase",
          "transition-colors duration-150",
          "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
          open ? "text-white" : "text-silver hover:text-white",
        ].join(" ")}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          width="9"
          height="6"
          viewBox="0 0 9 6"
          fill="currentColor"
          className={`transition-transform duration-200 opacity-50 mt-px ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M4.5 5.5L0.5 0.5h8L4.5 5.5z" />
        </svg>
      </button>

      {/* Dropdown panel — always rendered, animated via CSS */}
      <div
        className={[
          `absolute top-full left-0 mt-3 ${panelWidth}`,
          "bg-panel border border-panel-3",
          "shadow-2xl shadow-black/70",
          "z-50 origin-top",
          "transition-all duration-200",
          open
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none",
        ].join(" ")}
        role="menu"
        aria-label={label}
      >
        {/* Top accent line */}
        <div className="h-px bg-gold/30 w-full" />

        <div className={`grid ${gridClass} divide-x divide-panel-3`}>
          {sections.map((section, si) => (
            <div key={si} className="py-3">
              {section.title && (
                <div className="px-5 pt-2 pb-3 text-muted text-[9px] font-bold tracking-[0.3em] uppercase border-b border-panel-3 mb-1">
                  {section.title}
                </div>
              )}
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "block px-5 py-2.5 group",
                    "transition-colors duration-150",
                    "hover:bg-panel-2",
                    "focus:outline-none focus-visible:bg-panel-2 focus-visible:outline-none",
                  ].join(" ")}
                  onClick={close}
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                >
                  <div className="text-white text-xs font-semibold tracking-wide group-hover:text-gold transition-colors duration-150">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-muted text-[11px] mt-0.5 leading-snug">
                      {item.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
