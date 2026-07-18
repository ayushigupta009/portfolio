"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

/**
 * A dock is not a sitemap — only the sections worth a thumb-tap live here.
 * Contributions is still reached by scrolling, and the desktop nav keeps the
 * full list.
 */
const dockOrder = ["home", "about", "skills", "resume", "portfolio"] as const;

const dockItems = dockOrder.map(
  (id) => navItems.find((item) => item.id === id)!,
);

const sectionIds = dockItems.map((item) => item.id);

/**
 * App-style floating dock for small screens — replaces the hamburger menu.
 * Icon-only so all sections stay reachable in one thumb-width row, with the
 * active section tracked by the same scroll-spy the desktop nav uses.
 */
export function MobileDock() {
  const activeId = useScrollSpy(sectionIds);

  // Smooth scrolling takes ~half a second, and scroll-spy only reports the new
  // section once it lands — so a tap felt unresponsive. Claim the tapped item
  // straight away and hand control back to scroll-spy when it catches up.
  const [tapped, setTapped] = useState<string | null>(null);
  const active = tapped ?? activeId;

  useEffect(() => {
    if (!tapped) return;
    if (activeId === tapped) {
      setTapped(null);
      return;
    }
    // Fallback: short sections may never become the spy's active one.
    const t = setTimeout(() => setTapped(null), 1200);
    return () => clearTimeout(t);
  }, [tapped, activeId]);

  return (
    <motion.nav
      aria-label="Section navigation"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-4 bottom-4 z-50 lg:hidden"
    >
      <ul className="flex items-center justify-around rounded-full border border-primary/30 bg-surface/80 px-2 py-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7),0_0_24px_-8px_color-mix(in_srgb,var(--color-primary)_65%,transparent)] ring-1 ring-inset ring-white/10 backdrop-blur-xl">
        {dockItems.map(({ id, label, href, icon: Icon }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={href}
                onClick={() => setTapped(id)}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative grid h-11 w-11 place-items-center rounded-full transition-colors duration-300",
                  isActive ? "text-white" : "text-muted",
                )}
              >
                {/* Gradient pill slides between items as the page scrolls */}
                {isActive && (
                  <motion.span
                    layoutId="dock-active"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#994ff5,#e0468f,#f0913c)]"
                  />
                )}
                <Icon className="relative h-[18px] w-[18px]" />
              </a>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}
