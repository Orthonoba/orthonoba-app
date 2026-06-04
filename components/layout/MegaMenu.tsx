"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/src/i18n/navigation";
import type { NavDropdown } from "@/types";

interface MegaMenuProps extends NavDropdown {}

export default function MegaMenu({ label, sections, cols = 1 }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const gridClass =
    cols === 3
      ? "grid-cols-3"
      : cols === 2
        ? "grid-cols-2"
        : "grid-cols-1";

  const panelWidth =
    cols === 3 ? "w-[640px]" : cols === 2 ? "w-[440px]" : "w-[260px]";

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-1.5 text-silver text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {label}
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="currentColor"
          className={`transition-transform duration-200 opacity-60 ${open ? "rotate-180" : ""}`}
        >
          <path d="M4.5 6.5L0.5 2.5h8L4.5 6.5z" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 mt-4 ${panelWidth} bg-panel border border-panel-3 shadow-2xl shadow-black/60 z-50`}
        >
          <div className={`grid ${gridClass} divide-x divide-panel-3`}>
            {sections.map((section, si) => (
              <div key={si} className="py-3">
                {section.title && (
                  <div className="px-5 pt-2 pb-3 text-muted text-[10px] font-semibold tracking-[0.25em] uppercase border-b border-panel-3 mb-1">
                    {section.title}
                  </div>
                )}
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-3 hover:bg-panel-2 transition-colors duration-150 group"
                    onClick={() => setOpen(false)}
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
      )}
    </div>
  );
}
