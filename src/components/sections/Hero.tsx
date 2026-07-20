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
import { useIntroDone } from "@/hooks/useIntroDone";
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

  // Every entrance below is held until the intro loader clears — otherwise it
  // plays out behind the curtain and the visitor never sees it.
  const go = useIntroDone();

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
          animate={go ? "visible" : "hidden"}
          className="order-2 flex flex-col justify-center px-7 pb-16 pt-4 sm:px-12 lg:order-1 lg:col-span-6 lg:translate-y-8 lg:py-24 lg:pl-24 lg:pr-6"
        >
          <motion.span
            variants={fadeUp}
            className="order-1 w-fit self-start rounded-lg bg-secondary/[0.14] p-2 text-sm font-semibold sm:p-2.5 sm:text-lg lg:order-none"
          >
            <span className="bg-[linear-gradient(90deg,#994ff5,#e0468f,#f0913c)] bg-clip-text text-transparent">
              {heroContent.greeting}
            </span>
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="order-3 mt-6 whitespace-nowrap text-[26px]/normal font-bold text-foreground sm:text-3xl/normal md:mt-8 md:text-[50px]/normal lg:order-none"
          >
            {heroContent.role}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="order-4 mt-6 max-w-[571px] text-sm leading-loose text-muted sm:text-base lg:order-none"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="order-5 mt-10 flex flex-nowrap items-center gap-3 sm:gap-5 lg:order-none"
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

          {/* On mobile this tucks under the greeting; on desktop it stays
                below the CTA buttons. */}
          <motion.div
            variants={fadeUp}
            className="order-2 mt-5 lg:order-none lg:mt-8"
          >
            <SocialLinks links={footerSocialLinks} />
          </motion.div>
        </motion.div>

        {/* Right column — the portrait sits directly on the page background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={go ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative order-1 flex min-h-[420px] items-end justify-center px-4 pr-[42%] pt-24 sm:min-h-[520px] sm:pr-[38%] lg:order-2 lg:col-span-6 lg:min-h-full lg:pl-0 lg:pr-32 lg:pt-0"
        >
          {/* Multi-colour brand aura behind the portrait so it lifts off the page */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.85 }}
            animate={go ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glow-brand pointer-events-none absolute bottom-0 left-1/2 h-[82%] w-[88%] -translate-x-1/2 rounded-full blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(10px)", x: 0 }}
            animate={{
              opacity: go ? 1 : 0,
              scale: go ? 1 : 0.92,
              filter: go ? "blur(0px)" : "blur(10px)",
              // Only on desktop — on mobile the column already reserves
              // room for the capsules, so a shift would push it off-screen.
              x: go && isDesktop ? -110 : 0,
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

          {/* Info capsules pinned to the right edge of the portrait. Each
                starts as just its icon, then unfurls leftwards to reveal the
                text — once, on load. */}
          <div className="absolute right-4 top-[58%] z-20 flex -translate-y-1/2 flex-col items-end gap-3 sm:right-6 sm:top-1/2 sm:gap-4 lg:right-24">
            {/* Hairlines top and bottom, centred on the collapsed icon */}
            <motion.span
              initial={{ opacity: 0, scaleY: 0 }}
              animate={go ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="mr-[22px] h-14 w-px bg-gradient-to-b from-transparent to-primary/60 sm:mr-[30px] sm:h-40"
            />

            {heroBadges.map(({ icon: Icon, label, meta, gradient }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={go ? { opacity: 1, scale: 1 } : {}}
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
                  animate={go ? { width: badgeWidth, opacity: 1 } : {}}
                  transition={{
                    width: {
                      duration: 1,
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
              animate={go ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
              className="mr-[22px] h-14 w-px bg-gradient-to-t from-transparent to-secondary/60 sm:mr-[30px] sm:h-40"
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
