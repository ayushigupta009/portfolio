"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { aboutParagraphs } from "@/data/about";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function About() {
  return (
    <Section id="about">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        {/* Visual — white-framed image with a gradient shape offset behind */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto w-full max-w-md"
        >
          {/* gradient ring accent, top-right */}
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[linear-gradient(135deg,#f0bf37,#d6489a,#8d47e5)] opacity-80 blur-[1px]" />

          {/* gradient shape offset down-left, peeking out behind the image */}
          <div className="absolute inset-0 -translate-x-5 translate-y-6 rounded-[2.5rem] bg-[linear-gradient(150deg,#f0bf37_0%,#e29e6e_35%,#d6489a_68%,#8d47e5_100%)]" />

          {/* white-framed image on top */}
          <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white bg-white shadow-2xl">
            <Image
              src="/ayushi.png"
              alt={siteConfig.name}
              width={846}
              height={1686}
              className="aspect-[4/5] h-full w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Copy */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col items-start gap-6"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-extrabold text-foreground sm:text-5xl"
          >
            About{" "}
            <span className="bg-[linear-gradient(90deg,#d6489a,#ef8f3c)] bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>

          {aboutParagraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="max-w-xl leading-loose text-muted"
            >
              {p}
            </motion.p>
          ))}

          <motion.a
            variants={fadeUp}
            href={siteConfig.resumeUrl}
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-[linear-gradient(90deg,#d6489a,#ef8f3c)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_color-mix(in_srgb,#d6489a_80%,transparent)] transition-all duration-300 hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </Section>
  );
}
