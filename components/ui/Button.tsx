import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold tracking-widest uppercase",
    "transition-all duration-200",
    "focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold",
    "active:scale-[0.98]",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
    "select-none",
  ].join(" ");

  const sizes = {
    sm: "px-5 py-2.5 text-[10px]",
    md: "px-7 py-3.5 text-xs",
    lg: "px-9 py-4 text-xs",
  };

  const variants = {
    primary: [
      "bg-gold text-obsidian",
      "hover:bg-gold-light",
      "active:bg-gold-dim",
    ].join(" "),
    secondary: [
      "border border-panel-3 text-silver",
      "hover:border-gold hover:text-white",
      "active:border-gold/60",
    ].join(" "),
    ghost: [
      "text-silver",
      "hover:text-white",
      "active:text-silver",
    ].join(" "),
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      )}
      {children}
    </button>
  );
}
