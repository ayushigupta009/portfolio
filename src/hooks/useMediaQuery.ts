"use client";

import { useEffect, useState } from "react";

/**
 * Track a CSS media query from JS, for the cases where a layout decision can't
 * be expressed in a Tailwind breakpoint (animated values, conditional render).
 *
 * Starts `false` on the server and on first paint, then settles after mount.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);

    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
