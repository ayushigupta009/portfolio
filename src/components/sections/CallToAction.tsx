"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mailComposeUrl } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Glow } from "@/components/ui/Glow";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

/**
 * Closing call-to-action band that sits right before the footer — a last,
 * low-friction nudge towards the inbox and the project showcase.
 */
export function CallToAction() {
  return (
    <section className="relative overflow-hidden border-t border-border py-24 sm:py-28 lg:py-32">
      <Glow className="left-1/2 top-0 h-80 w-80 -translate-x-1/2 -translate-y-1/3 opacity-30" />
      <Glow
        variant="secondary"
        className="bottom-0 right-[12%] h-64 w-64 translate-y-1/3 opacity-20"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="container-px mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl/tight font-bold text-foreground sm:text-4xl/tight md:text-[52px]/tight"
        >
          Have a project in mind?{" "}
          <span className="text-gradient">Let&rsquo;s get to work.</span>{" "}
          <motion.span
            animate={{ rotate: [-12, 14, -12] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            style={{ transformOrigin: "70% 80%" }}
            className="inline-block"
          >
            👋
          </motion.span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-xl leading-loose text-muted"
        >
          Whether it&rsquo;s a full product build, a mobile app, or a quick
          conversation about an idea — I&rsquo;d love to hear about it.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap justify-center gap-5"
        >
          <Button
            href={mailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[linear-gradient(90deg,#994ff5,#e0468f,#f0913c)] hover:opacity-90"
          >
            Say Hello
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button href="#portfolio" variant="outline">
            My Portfolio
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
