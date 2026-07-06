"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

/**
 * Floating theme switch pinned to the left edge of the viewport (like the
 * reference "Light" tab). The label shows the theme you'll switch to.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed left-0 top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-r-lg bg-primary text-white shadow-lg transition-transform duration-200 hover:translate-x-1"
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
