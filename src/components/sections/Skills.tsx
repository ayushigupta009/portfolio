"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { SkillLogo } from "@/components/icons/SkillLogo";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow } from "@/components/ui/Glow";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

function SkillCard({ group }: { group: (typeof skillGroups)[number] }) {
  const Icon = group.icon;
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.14), transparent 70%)`;

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      className="group relative flex min-h-50 w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 transition-colors duration-300 hover:border-primary/40"
    >
      {/* cursor-tracked spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      {/* accent line draw-in */}
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-primary to-primary/20 transition-[width] duration-500 ease-out group-hover:w-full" />

      {/* oversized ghost icon watermark */}
      <Icon
        className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 -rotate-12 text-primary/[0.06] transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-110 group-hover:text-primary/[0.09]"
        strokeWidth={1}
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-foreground sm:text-lg">{group.category}</h3>
          <Icon className="h-5 w-5 shrink-0 text-primary/70 transition-colors duration-300 group-hover:text-primary" />
        </div>

        <div className="mt-3.5 h-px w-full bg-gradient-to-r from-border via-border to-transparent" />

        <div className="mt-3.5 flex flex-1 flex-wrap content-start justify-start gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-transparent bg-surface-2 py-1 pl-2 pr-3 text-[13px] font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <SkillLogo name={skill} className="h-3.5 w-3.5 shrink-0" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <Glow variant="secondary" className="right-[-8%] top-1/4 h-72 w-72 opacity-25" />
      <SectionTitle
        eyebrow="Technical Skills"
        title="Technologies I work with"
        description="A toolkit refined over years of building and shipping real products."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-14 grid max-w-6xl auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <SkillCard key={group.category} group={group} />
        ))}
      </motion.div>
    </Section>
  );
}