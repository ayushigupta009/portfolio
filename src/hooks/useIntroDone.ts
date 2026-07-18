"use client";

import { useEffect, useState } from "react";

const EVENT = "intro:done";

/**
 * Module-level so a component mounting *after* the intro finished still sees
 * the correct state — an event alone would already have fired and been missed.
 */
let finished = false;

/** Called by the PageLoader once its curtain starts to clear. */
export function markIntroDone() {
  if (finished) return;
  finished = true;
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Whether the intro loader has finished. Sections use this to hold their
 * entrance animations until the page is actually visible — otherwise they play
 * out behind the loader and are never seen.
 */
export function useIntroDone() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (finished) {
      setDone(true);
      return;
    }
    const onDone = () => setDone(true);
    window.addEventListener(EVENT, onDone);
    return () => window.removeEventListener(EVENT, onDone);
  }, []);

  return done;
}
