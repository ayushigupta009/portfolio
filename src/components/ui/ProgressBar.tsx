"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  name: string;
  level: number;
}

/**
 * Labeled skill progress bar that fills to `level`% when in view.
 */
export function ProgressBar({ name, level }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-sm font-semibold text-primary">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-border">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
