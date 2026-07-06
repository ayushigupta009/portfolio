"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound, FileText } from "lucide-react";
import { heroContent } from "@/data/hero";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 lg:pt-[104px]">
      {/* Full-bleed two-column split: text on the left, gradient panel on the
          right that bleeds to the top, right and bottom edges */}
      <div className="grid grid-cols-1 lg:min-h-[calc(100vh-104px)] lg:grid-cols-2 lg:items-stretch">
          {/* Left column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-24"
          >
            <motion.span
              variants={fadeUp}
              className="w-fit self-start rounded-lg bg-secondary/[0.14] p-2.5 text-lg font-semibold text-secondary"
            >
              {heroContent.greeting}
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
                <UserRound className="h-[18px] w-[18px]" />
                Hire Me
              </Button>
              <Button href={siteConfig.resumeUrl} variant="outline">
                <FileText className="h-[18px] w-[18px]" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — full-bleed gradient panel that touches the navbar
              divider, the right edge and the bottom, with a faded name
              wordmark behind the portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="relative flex min-h-[440px] items-end justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_54%,#8d47e5_0%,#c659d2_30%,#e29e6e_62%,#f0bf37_100%)] lg:min-h-full"
          >
            {/* Faded name wordmark behind the portrait */}
            <div className="pointer-events-none absolute inset-x-0 top-8 flex select-none flex-col items-center gap-1 px-6 text-center leading-[0.95]">
              {siteConfig.name.split(" ").map((word) => (
                <span
                  key={word}
                  className="bg-gradient-to-b from-white/60 to-transparent bg-clip-text text-6xl font-extrabold uppercase tracking-tight text-transparent md:text-8xl"
                >
                  {word}
                </span>
              ))}
            </div>
            <Image
              src="/ayushi.png"
              alt={siteConfig.name}
              width={846}
              height={1686}
              priority
              className="relative z-10 h-auto max-h-[440px] w-auto object-contain object-bottom drop-shadow-2xl md:max-h-[560px] lg:max-h-[calc(100vh-160px)]"
            />
          </motion.div>
        </div>
    </section>
  );
}
