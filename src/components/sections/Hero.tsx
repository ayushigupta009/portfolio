"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound, SquareChartGantt } from "lucide-react";
import { heroContent } from "@/data/hero";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/animations";

/** Floating skill pills around the portrait (like the reference badges). */
const heroBadges = [
  { label: "Flutter", dot: "#3b82f6", pos: "left-[8%] top-[24%]", delay: 0 },
  { label: "React Native", dot: "#994ff5", pos: "right-[0%] top-[38%]", delay: 0.4 },
  { label: "Next.js", dot: "#ffc41f", pos: "right-[6%] bottom-[20%]", delay: 0.8 },
  { label: "Kotlin", dot: "#e0468f", pos: "left-[5%] bottom-[26%]", delay: 1.2 },
] as const;

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 lg:pt-[104px]">
      {/* Full-bleed two-column split: text on the left, gradient panel on the
          right that bleeds to the top, right and bottom edges */}
      <div className="grid grid-cols-1 lg:min-h-[calc(100vh-104px)] lg:grid-cols-12 lg:items-stretch">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:col-span-6 lg:px-24 lg:py-24"
          >
            <motion.span
              variants={fadeUp}
              className="w-fit self-start rounded-lg bg-secondary/[0.14] p-2.5 text-lg font-semibold"
            >
              <span className="bg-[linear-gradient(90deg,#994ff5,#e0468f,#f0913c)] bg-clip-text text-transparent">
                {heroContent.greeting}
              </span>
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-3xl/normal font-bold text-foreground md:mt-8 md:text-[50px]/normal"
            >
              {heroContent.role}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[571px] leading-loose text-muted"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-5"
            >
              <Button href="#contact">
                <UserRound className="h-[25px] w-[25px]" />
                Hire Me
              </Button>
              <Button href={siteConfig.resumeUrl} variant="outline">
                <motion.span
                  animate={{ rotate: [-10, 12, -10] }}
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                  style={{ transformOrigin: "top center" }}
                  className="inline-flex"
                >
                  <SquareChartGantt className="h-[25px] w-[25px]" />
                </motion.span>
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — the portrait sits on the page background with a soft
              rounded gradient blob behind it (not a full square panel) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex min-h-[440px] items-end justify-center px-6 pt-10 lg:col-span-6 lg:min-h-full lg:px-12"
          >
            {/* Soft rounded gradient blob behind the portrait */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
              className="pointer-events-none absolute bottom-10 left-1/2 top-10 w-[86%] max-w-[520px] -translate-x-1/2 rounded-[46%_54%_44%_56%/52%_48%_52%_48%] bg-[radial-gradient(circle_at_50%_54%,#8d47e5_0%,#c659d2_30%,#e29e6e_62%,#f0bf37_100%)]"
            />

            {/* Faded name wordmark behind the portrait */}
            <div className="pointer-events-none absolute inset-x-0 top-24 z-[1] flex select-none flex-col items-center gap-1 px-6 text-center leading-[0.95]">
              {siteConfig.name.split(" ").map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="bg-gradient-to-b from-white/60 to-transparent bg-clip-text font-mono text-8xl font-extrabold uppercase tracking-tight text-transparent md:text-8xl"
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              className="relative z-10 flex items-end"
            >
              <Image
                src="/ayushi.png"
                alt={siteConfig.name}
                width={846}
                height={1686}
                priority
                className="h-auto max-h-[440px] w-auto object-contain object-bottom drop-shadow-2xl md:max-h-[560px] lg:max-h-[calc(100vh-160px)]"
              />
            </motion.div>

            {/* Floating skill badges around the portrait */}
            {heroBadges.map((badge) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 1 + badge.delay },
                  scale: { duration: 0.5, delay: 1 + badge.delay },
                  y: {
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: badge.delay,
                  },
                }}
                className={`absolute z-20 flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--color-primary)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_20%,rgba(255,255,255,0.6))] px-4 py-2 shadow-[0_14px_40px_-10px_color-mix(in_srgb,var(--color-primary)_75%,transparent)] backdrop-blur ${badge.pos}`}
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: badge.dot }}
                />
                <span className="text-sm font-bold text-[#0a0a0a] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
                  {badge.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
    </section>
  );
}
