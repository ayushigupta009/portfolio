"use client";

import { useEffect, useState } from "react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    // Land at the top on reload. Otherwise the browser restores the previous
    // scroll offset, the navbar mounts in its opaque state, and it clips the
    // top of the hero portrait that is meant to sit over it.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // ...unless the URL points at a specific section.
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="flex h-20 items-center justify-between px-7 sm:px-12 lg:h-[104px] lg:px-24">
        {/* Logo */}
        <a href="#home" className="group flex items-center gap-3">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect x="2" y="6" width="10" height="22" rx="2.5" fill="var(--color-primary)" />
            <rect x="15" y="2" width="9" height="12" rx="2.5" fill="var(--color-primary)" />
            <rect x="15" y="16" width="9" height="12" rx="2.5" fill="var(--color-secondary)" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {siteConfig.name.split(" ")[0]}
          </span>
        </a>

        {/* Desktop nav — sits directly beside the logo, left aligned */}
        <ul className="ml-6 hidden flex-1 items-center gap-5 lg:flex xl:ml-12 xl:gap-8">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={cn(
                    "text-[15px] font-semibold transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right group: desktop CTA */}
        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-none bg-foreground px-5 py-3 text-sm font-bold text-background transition-all duration-200 hover:opacity-90 lg:inline-flex xl:px-7 xl:py-3.5 xl:text-[15px]"
          >
            Let&apos;s Chat
          </a>

        </div>
      </nav>

    </header>
  );
}
