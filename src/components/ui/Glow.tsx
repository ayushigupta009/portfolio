import { cn } from "@/lib/utils";

interface GlowProps {
  className?: string;
  variant?: "primary" | "secondary";
}

/**
 * Decorative, blurred radial glow blob for section backgrounds.
 * Purely presentational and hidden from assistive tech.
 */
export function Glow({ className, variant = "primary" }: GlowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-3xl",
        variant === "primary" ? "glow-primary" : "glow-secondary",
        className,
      )}
    />
  );
}
