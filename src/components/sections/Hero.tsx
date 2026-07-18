"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound, SquareChartGantt } from "lucide-react";
import { heroContent } from "@/data/hero";
import { footerSocialLinks } from "@/data/navigation";
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
            className="flex flex-col justify-center px-10 py-16 sm:px-16 lg:col-span-6 lg:py-24 lg:pl-32 lg:pr-6"
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

          {/* Right column — the portrait sits directly on the page background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex min-h-[500px] items-end justify-center px-6 pr-28 pt-10 lg:col-span-6 lg:min-h-full lg:pl-0 lg:pr-72 lg:pt-0"
          >
            {/* Multi-colour brand aura behind the portrait so it lifts off the page */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glow-brand pointer-events-none absolute bottom-0 left-1/2 h-[82%] w-[88%] -translate-x-1/2 rounded-full blur-3xl"
            />
            {/* Faded name wordmark behind the portrait */}
            {/* <div className="pointer-events-none absolute inset-x-0 top-24 z-[1] flex select-none flex-col items-center gap-1 px-6 text-center leading-[0.95]">
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
            </div> */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03 }}
              className="relative z-10 flex items-end"
            > */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.03, y: 14 }}
                className="relative z-10 flex items-end"
              >
                <Image
                  src="/ayushi.png"
                  alt={siteConfig.name}
                  width={846}
                  height={1686}
                  priority
                  className="h-auto max-h-[600px] w-auto object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)] md:max-h-[730px] lg:max-h-[calc(100vh-125px)]"
                />
              </motion.div>
            {/*
             </motion.div> */}

            {/* Vertical social rail pinned to the right edge of the portrait */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="absolute right-10 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4 lg:right-32"
            >
              <motion.span
                variants={fadeUp}
                className="h-40 w-px bg-gradient-to-b from-transparent to-primary/60"
              />

              {footerSocialLinks.map(({ label, href, icon: Icon }, i) => (
                <motion.span key={label} variants={fadeUp} className="inline-flex">
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    y: {
                      duration: 3.2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: i * 0.35,
                    },
                  }}
                  className="group relative grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/60 text-muted backdrop-blur transition-colors duration-300 hover:border-transparent hover:text-white"
                >
                  {/* Gradient fill + glow revealed on hover */}
                  <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#994ff5,#e0468f,#f0913c)] opacity-0 shadow-[0_10px_30px_-8px_color-mix(in_srgb,var(--color-primary)_85%,transparent)] transition-opacity duration-300 group-hover:opacity-100" />
                  {/* Pulsing halo so the rail reads as interactive at rest */}
                  <span className="absolute inset-0 animate-[glow_4s_ease-in-out_infinite] rounded-full ring-1 ring-primary/30" />
                  <Icon className="relative h-[18px] w-[18px]" />
                </motion.a>
                </motion.span>
              ))}

              <motion.span
                variants={fadeUp}
                className="h-40 w-px bg-gradient-to-t from-transparent to-secondary/60"
              />
            </motion.div>

            {/* Floating skill badges around the portrait */}
            {/* {heroBadges.map((badge) => (
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
            ))} */}
          </motion.div>
        </div>
    </section>
  );
}
