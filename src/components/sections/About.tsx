"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useInView } from "framer-motion";
import { aboutParagraphs } from "@/data/about";
import { experience } from "@/data/resume";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/ui/Section";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/** Counts up from 0 to `value` once the tile scrolls into view. */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <Section id="about">
      <div className="relative mt-8 lg:mt-24">
        {/* Decorative outline triangle, top-right */}
        <motion.svg
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          stroke="#8a86c9"
          strokeWidth="2"
          animate={{ rotate: [0, 360], y: [0, -10, 0] }}
          transition={{
            rotate: { duration: 18, ease: "linear", repeat: Infinity },
            y: { duration: 5, ease: "easeInOut", repeat: Infinity },
          }}
          className="pointer-events-none absolute -top-6 right-2 hidden opacity-70 lg:block"
        >
          <polygon points="35,8 60,58 10,52" strokeLinejoin="round" />
        </motion.svg>

        {/* Decorative dotted triangle, bottom-right */}
        <motion.svg
          width="130"
          height="118"
          viewBox="0 0 130 118"
          animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          className="pointer-events-none absolute -bottom-12 right-0 hidden lg:block"
        >
          <defs>
            <linearGradient id="tri-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f0bf37" />
              <stop offset="1" stopColor="#e0468f" />
            </linearGradient>
            <pattern
              id="tri-dots"
              width="11"
              height="11"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="2"
                cy="2"
                r="1.4"
                fill="var(--color-background)"
                opacity="0.55"
              />
            </pattern>
          </defs>
          <polygon points="130,0 130,118 22,118" fill="url(#tri-grad)" />
          <polygon points="130,0 130,118 22,118" fill="url(#tri-dots)" />
        </motion.svg>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative mx-auto w-full max-w-[250px] sm:max-w-sm"
          >
            {/* gradient ring, top-right, behind the image */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
              transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              className="absolute -right-6 -top-6 h-32 w-32 rounded-full sm:-right-12 sm:-top-12 sm:h-48 sm:w-48 bg-[linear-gradient(150deg,#f2a13e_0%,#e0468f_45%,#c356c9cc_72%,#c356c926_100%)]"
            >
              <div className="absolute inset-[18px] rounded-full bg-background sm:inset-[26px]" />
            </motion.div>

            {/* gradient rounded square, smaller, anchored bottom-left, peeking out */}
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
              className="absolute bottom-0 left-0 h-[82%] w-[82%] -translate-x-6 translate-y-6 rounded-[2.25rem] bg-[linear-gradient(145deg,#f5c33a_0%,#ef8f43_30%,#e14b86_65%,#c356c9_100%)]"
            />

            {/* White-framed image on top. `object-top` pins the crop to the very
                top of the source and the portrait starts right at the hair, so
                on the smaller mobile frame it reads as cut off — the padding
                gives it headroom against the white frame. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[2.25rem] rounded-tr-[9.5rem] border-[7px] border-white bg-white pt-[7%] shadow-2xl sm:pt-0"
            >
              <Image
                src="/ayushi.png"
                alt={siteConfig.name}
                width={846}
                height={1686}
                className="aspect-[4/5] h-full w-full rounded-[1.4rem] rounded-tr-[3.8rem] object-cover object-top"
              />
            </motion.div>
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
              className="text-2xl font-extrabold text-foreground sm:text-4xl md:text-5xl"
            >
              About{" "}
              <span className="bg-[linear-gradient(90deg,#e0468f,#f0913c)] bg-clip-text text-transparent">
                Me
              </span>
            </motion.h2>

            {aboutParagraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="max-w-xl text-sm leading-loose text-muted sm:text-base"
              >
                {p}
              </motion.p>
            ))}

            {/* Highlight stats */}
            <motion.div
              variants={fadeUp}
              className="-mt-2 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
            >
              {[
                { value: experience.length, suffix: "", label: "Companies" },
                {
                  value: skillGroups.reduce((n, g) => n + g.skills.length, 0),
                  suffix: "+",
                  label: "Technologies",
                },
                { value: 3, suffix: "", label: "Platforms Shipped On" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-surface/60 p-4 text-center sm:p-5"
                >
                  <div className="bg-[linear-gradient(90deg,#e0468f,#f0913c)] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
