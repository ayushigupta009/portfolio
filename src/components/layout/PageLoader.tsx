"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { markIntroDone } from "@/hooks/useIntroDone";

/** The three blocks of the navbar mark, drawn in one at a time. */
const marks = [
  { x: 2, y: 6, w: 10, h: 22, fill: "var(--color-primary)" },
  { x: 15, y: 2, w: 9, h: 12, fill: "var(--color-secondary)" },
  { x: 15, y: 16, w: 9, h: 12, fill: "var(--color-primary)" },
];

/** Mark size and the gap to the name, in px — the row's fixed part. */
const LOGO = 56;
const GAP = 16;

const SLIDE_AT = 0.95;
const NAME_AT = 1.35;
const ROLE_AT = 1.9;
const HOLD_MS = 2200;

/** Expo-out — long, soft settle. Used for every move so they feel like one. */
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Full-screen intro. The mark draws in dead centre, slides left to make room,
 * the name wipes in beside it, the role settles underneath, then the whole
 * panel dissolves — deliberately not a slide, which reads as the page moving.
 */
export function PageLoader() {
  const [done, setDone] = useState(false);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [nameWidth, setNameWidth] = useState<number | null>(null);

  // Measure before paint. The animated row is not mounted until this lands,
  // because framer reads `initial` once at mount — mounting it with a
  // not-yet-known offset would leave it stuck at 0 and skip the slide.
  useLayoutEffect(() => {
    setNameWidth(measureRef.current?.offsetWidth ?? 0);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      // Let the sections underneath start their entrances now that they can
      // actually be seen.
      markIntroDone();
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  // Hold the page still underneath while the curtain is up.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  const nameClass =
    "whitespace-nowrap text-2xl font-bold tracking-tight text-foreground sm:text-4xl";

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          {/* Off-screen twin, only ever used to measure the name. */}
          <span
            ref={measureRef}
            aria-hidden
            className={`pointer-events-none fixed -left-[9999px] top-0 ${nameClass}`}
          >
            {siteConfig.name}
          </span>

          {nameWidth !== null && (
            <motion.div
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeIn" }}
              className="flex flex-col items-center gap-1 px-8"
            >
              <motion.div
                initial={{ x: (nameWidth + GAP) / 2 }}
                animate={{ x: 0 }}
                transition={{
                  duration: 0.9,
                  delay: SLIDE_AT,
                  ease: EASE,
                }}
                className="flex items-center gap-4"
              >
                <svg
                  width={LOGO}
                  height={LOGO}
                  viewBox="0 0 34 34"
                  fill="none"
                  aria-hidden
                  className="shrink-0"
                >
                  {marks.map((m, i) => (
                    <motion.rect
                      key={i}
                      x={m.x}
                      y={m.y}
                      width={m.w}
                      height={m.h}
                      rx="2.5"
                      fill={m.fill}
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.15 + i * 0.13,
                        ease: EASE,
                      }}
                      style={{
                        transformOrigin: `${m.x + m.w / 2}px ${m.y + m.h}px`,
                      }}
                    />
                  ))}
                </svg>

                <motion.span
                  initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                  animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                  transition={{
                    clipPath: { duration: 0.8, delay: NAME_AT, ease: EASE },
                    opacity: { duration: 0.25, delay: NAME_AT },
                  }}
                  className={nameClass}
                >
                  {siteConfig.name}
                </motion.span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ROLE_AT, ease: EASE }}
                className="text-sm tracking-[0.28em] text-muted uppercase sm:text-base"
              >
                {siteConfig.role}
              </motion.span>
            </motion.div>
          )}

          {/* Mobile only. Sits in a track so the fill has something to round
              against. */}
          <div className="absolute inset-x-8 bottom-16 h-1.5 overflow-hidden rounded-full bg-surface-2 lg:hidden">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD_MS / 1000, ease: "linear" }}
              style={{ transformOrigin: "left" }}
              className="block h-full w-full rounded-full bg-[linear-gradient(90deg,#994ff5,#e0468f,#f0913c)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
