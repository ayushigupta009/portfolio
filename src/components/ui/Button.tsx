import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_10px_30px_-8px_color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:bg-primary-600 hover:shadow-[0_14px_38px_-8px_color-mix(in_srgb,var(--color-primary)_85%,transparent)]",
  outline:
    "border border-border text-foreground hover:border-primary hover:text-primary",
  ghost: "text-muted hover:text-foreground",
};

/**
 * Link-styled button used for CTAs (anchor-based for smooth in-page nav
 * and external links).
 */
export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-none px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
