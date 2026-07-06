"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border/60 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-xl" : "bg-background",
      )}
    >
      <nav className="flex h-20 items-center justify-between px-8 sm:px-15 lg:h-[104px] lg:px-14">
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

        {/* Right group: nav links then CTA */}
        <div className="flex items-center gap-3 lg:gap-10">
          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
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

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-none bg-foreground px-7 py-3.5 text-[15px] font-bold text-background transition-all duration-200 hover:opacity-90 lg:inline-flex"
          >
            Let&apos;s Chat
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-lg border border-border text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-px mx-auto flex max-w-6xl flex-col gap-1 py-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-muted hover:bg-surface hover:text-foreground",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
              <li className="mt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-none bg-foreground px-5 py-3 text-sm font-bold text-background"
                >
                  Let&apos;s Chat
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
