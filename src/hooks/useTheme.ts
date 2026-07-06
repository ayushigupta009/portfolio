"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

/**
 * Reads/writes the site color theme. The theme is stored on the <html>
 * element as `data-theme` and persisted to localStorage. Defaults to dark.
 * An inline script in the root layout applies the stored theme before paint
 * to avoid a flash, so this hook only needs to sync React state on mount.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ??
      "dark";
    setThemeState(current);
  }, []);

  const apply = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore storage errors (private mode, etc.) */
    }
  }, []);

  const toggle = useCallback(() => {
    apply(theme === "dark" ? "light" : "dark");
  }, [theme, apply]);

  return { theme, setTheme: apply, toggle };
}
