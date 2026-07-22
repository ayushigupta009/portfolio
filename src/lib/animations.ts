import type { Variants } from "framer-motion";

/** Fade + rise, used for most on-scroll reveals. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Stagger container for lists/grids of animated children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

/** Shared viewport config for whileInView reveals. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
