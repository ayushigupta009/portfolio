"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Floating theme switch. On desktop it's a tab pinned to the left edge of the
 * viewport; on mobile it moves to the top-right of the navbar row so it stays
 * clear of the bottom dock.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  // The slide-in has to come from whichever edge the button is docked against.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const enterFrom = isDesktop ? -48 : 48;

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      initial={{ x: enterFrom, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: isDesktop ? 4 : -4, scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="fixed right-5 top-[18px] z-[60] grid h-11 w-11 place-items-center overflow-hidden rounded-lg lg:left-0 lg:right-auto lg:top-1/2 lg:-translate-y-1/2 lg:rounded-l-none lg:rounded-r-lg bg-primary text-white shadow-lg"
    >
      {/* The looping spin/swing sits OUTSIDE AnimatePresence on purpose:
          `initial={false}` suppresses the first-mount animation of everything
          nested inside it, so on reload the loop never started — it only kicked
          in once a toggle remounted the icon. */}
      <motion.span
        animate={isDark ? { rotate: [0, 360] } : { rotate: [0, -18, 0] }}
        transition={{
          duration: isDark ? 6 : 2,
          ease: isDark ? "linear" : "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={isDark ? undefined : { transformOrigin: "top center" }}
        className="grid place-items-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "sun" : "moon"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </motion.button>
  );
}
