import { ReactNode } from "react";

type BadgeVariant = "gold" | "success" | "warning" | "error" | "muted" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gold:    "text-gold border border-gold/20 bg-gold/5",
  success: "text-emerald-400 border border-emerald-400/20 bg-emerald-400/5",
  warning: "text-amber-400 border border-amber-400/20 bg-amber-400/5",
  error:   "text-red-400 border border-red-400/20 bg-red-400/5",
  muted:   "text-muted border border-panel-3",
  outline: "text-silver border border-panel-3",
};

export default function Badge({
  children,
  variant = "gold",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-0.5
        text-[10px] font-semibold tracking-[0.22em] uppercase
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
