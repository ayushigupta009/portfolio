"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    <motion.button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      initial={{ x: -48, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4, scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="fixed left-0 top-1/2 z-50 grid h-11 w-11 -translate-y-1/2 place-items-center overflow-hidden rounded-r-lg bg-primary text-white shadow-lg"
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
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.span>
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
