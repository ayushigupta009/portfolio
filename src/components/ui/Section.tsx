import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

/**
 * Full-width section wrapper with a centered, max-width container and
 * consistent vertical rhythm across the page.
 */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
    >
      <div className="container-px mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
