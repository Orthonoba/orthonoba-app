"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "@/src/i18n/navigation";

interface MenuItem {
  label: string;
  href: string;
  description?: string;
}

interface MegaMenuProps {
  label: string;
  items: MenuItem[];
}

export default function MegaMenu({ label, items }: MegaMenuProps) {
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

  return (
    <div ref={ref} className="relative">
      <button
        className="flex items-center gap-1 text-silver text-xs tracking-[0.15em] uppercase hover:text-white transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        {label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M5 7L0 2h10L5 7z" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-3 w-64 bg-panel border border-panel-3 shadow-2xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-5 py-4 border-b border-panel-3 last:border-0 hover:bg-panel-2 transition-colors duration-150"
              onClick={() => setOpen(false)}
            >
              <div className="text-white text-xs font-semibold tracking-wide">
                {item.label}
              </div>
              {item.description && (
                <div className="text-muted text-xs mt-1 leading-snug">
                  {item.description}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
