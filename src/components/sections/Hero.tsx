"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound, SquareChartGantt } from "lucide-react";
import { heroContent, heroBadges } from "@/data/hero";
import { footerSocialLinks } from "@/data/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { staggerContainer, fadeUp } from "@/lib/animations";

/**
 * Wipe the capsule in from the left, hold it, then wipe it back out to the
 * right — then repeat.
 */
const wipeKeyframes = [
  "inset(0 100% 0 0)",
  "inset(0 0% 0 0)",
  "inset(0 0% 0 0)",
  "inset(0 0 0 100%)",
  "inset(0 100% 0 0)",
];

export function Hero() {
  // Numeric widths keep the capsule unfurl smooth (animating to "auto" makes
  // framer re-measure every frame), so the breakpoints are read in JS instead.
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px)");
  const badgeWidth = isDesktop ? 170 : isTablet ? 150 : 124;

  return (
    <section id="home" className="relative overflow-hidden">
      {/* Full-bleed two-column split. The section itself has no top padding —
          the portrait runs to the very top of the viewport and the (transparent)
          navbar floats over it, while the left column keeps its own clearance. */}
      <div className="grid grid-cols-1 lg:min-h-screen lg:grid-cols-12 lg:items-stretch">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 flex flex-col justify-center px-7 pb-16 pt-4 sm:px-12 lg:order-1 lg:col-span-6 lg:translate-y-8 lg:py-24 lg:pl-24 lg:pr-6"
          >
            <motion.span
              variants={fadeUp}
              className="w-fit self-start rounded-lg bg-secondary/[0.14] p-2 text-sm font-semibold sm:p-2.5 sm:text-lg"
            >
              <span className="bg-[linear-gradient(90deg,#994ff5,#e0468f,#f0913c)] bg-clip-text text-transparent">
                {heroContent.greeting}
              </span>
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 whitespace-nowrap text-[26px]/normal font-bold text-foreground sm:text-3xl/normal md:mt-8 md:text-[50px]/normal"
            >
              {heroContent.role}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[571px] text-sm leading-loose text-muted sm:text-base"
            >
              {heroContent.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-nowrap items-center gap-3 sm:gap-5"
            >
              <Button href="#contact" className="shrink-0 whitespace-nowrap px-4 text-xs sm:px-7 sm:text-sm">
                <UserRound className="h-5 w-5 sm:h-[25px] sm:w-[25px]" />
                Hire Me
              </Button>
              <Button href={siteConfig.resumeUrl} variant="outline" className="shrink-0 whitespace-nowrap px-4 text-xs sm:px-7 sm:text-sm">
                <motion.span
                  animate={{ rotate: [-10, 12, -10] }}
                  transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
                  style={{ transformOrigin: "top center" }}
                  className="inline-flex"
                >
                  <SquareChartGantt className="h-5 w-5 sm:h-[25px] sm:w-[25px]" />
                </motion.span>
                Download CV
              </Button>
            </motion.div>

            {/* On mobile this sits directly under the portrait, above the copy;
                on desktop it stays below the CTA buttons. */}
            <motion.div
              variants={fadeUp}
              className="order-first mb-5 lg:order-none lg:mb-0 lg:mt-8"
            >
              <SocialLinks links={footerSocialLinks} />
            </motion.div>
          </motion.div>

          {/* Right column — the portrait sits directly on the page background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative order-1 flex min-h-[420px] items-end justify-center px-4 pr-[42%] pt-24 sm:min-h-[520px] sm:pr-[38%] lg:order-2 lg:col-span-6 lg:min-h-full lg:pl-0 lg:pr-32 lg:pt-0"
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
                initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)", x: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  // Only on desktop — on mobile the column already reserves
                  // room for the capsules, so a shift would push it off-screen.
                  x: isDesktop ? -110 : 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                  // Slide out of the capsules' way as they unfurl.
                  x: { duration: 0.7, delay: 1.6, ease: [0.22, 1, 0.36, 1] },
                }}
                whileHover={{ scale: 1.03, y: 14 }}
                className="relative z-10 flex items-end"
              >
                <Image
                  src="/ayushi.png"
                  alt={siteConfig.name}
                  width={846}
                  height={1686}
                  priority
                  className="h-auto max-h-[600px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_25px_60px_var(--color-shadow)] md:max-h-[730px] lg:max-h-[calc(100vh-24px)]"
                />
              </motion.div>
            {/*
             </motion.div> */}

            {/* Skill capsules stacked down the left of the portrait */}
            {/* <div className="absolute bottom-16 left-0 z-20 hidden flex-col gap-4 lg:flex">
              {heroBadges.map(({ icon: Icon, label, meta, gradient }, i) => (
                <motion.div
                  key={label}
                  // animate={{ clipPath: wipeKeyframes }}
                  // transition={{
                  //   duration: 6,
                  //   times: [0, 0.16, 0.62, 0.8, 1],
                  //   ease: "easeInOut",
                  //   repeat: Infinity,
                  //   delay: i * 0.7,
                  // }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface/80 py-3 pl-3 pr-6 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white"
                    style={{ backgroundImage: gradient }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block whitespace-nowrap text-sm font-bold text-foreground">
                      {label}
                    </span>
                    <span className="mt-0.5 block whitespace-nowrap text-xs text-muted">
                      {meta}
                    </span>
                  </span>
                </motion.div>
              ))}
            </div> */}

            {/* Info capsules pinned to the right edge of the portrait. Each
                starts as just its icon, then unfurls leftwards to reveal the
                text — once, on load. */}
            <div className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col items-end gap-3 sm:right-6 sm:gap-4 lg:right-24">
              {/* Hairlines top and bottom, centred on the collapsed icon */}
              <motion.span
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "bottom" }}
                className="mr-[22px] h-14 w-px bg-gradient-to-b from-transparent to-primary/60 sm:mr-[30px] sm:h-40"
              />

              {heroBadges.map(({ icon: Icon, label, meta, gradient }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.9 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex items-center rounded-full border border-primary/35 bg-surface/80 p-1.5 shadow-[0_12px_32px_-12px_var(--color-shadow-soft),0_0_22px_-6px_color-mix(in_srgb,var(--color-primary)_60%,transparent)] backdrop-blur"
                >
                  {/* Inner light catch along the top edge */}
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.14),transparent_55%)] ring-1 ring-inset ring-foreground/[0.06]" />

                  <span
                    className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full text-white sm:h-11 sm:w-11"
                    style={{ backgroundImage: gradient }}
                  >
                    <Icon className="h-[15px] w-[15px] sm:h-5 sm:w-5" />
                  </span>

                  {/* Text unfurls from the right edge, so the card grows leftwards */}
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: badgeWidth, opacity: 1 }}
                    transition={{
                      width: {
                        duration: 0.6,
                        delay: 1.6 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: { duration: 0.3, delay: 1.55 + i * 0.12 },
                    }}
                    className="relative overflow-hidden"
                  >
                    <span className="block whitespace-nowrap px-2 text-[10px] font-bold sm:px-3 text-foreground sm:text-sm">
                      {label}
                    </span>
                    <span className="mt-0.5 block whitespace-nowrap px-2 text-[9px] text-muted sm:px-3 sm:text-xs">
                      {meta}
                    </span>
                  </motion.span>
                </motion.div>
              ))}

              <motion.span
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "top" }}
                className="mr-[22px] h-14 w-px bg-gradient-to-t from-transparent to-secondary/60 sm:mr-[30px] sm:h-40"
              />
            </div>

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
