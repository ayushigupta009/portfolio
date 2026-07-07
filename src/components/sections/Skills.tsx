"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow } from "@/components/ui/Glow";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

export function Skills() {
  return (
    <Section id="skills">
      <Glow variant="secondary" className="right-[-8%] top-1/4 h-72 w-72 opacity-25" />
      <SectionTitle
        eyebrow="My Skills"
        title="Technologies I work with"
        description="A toolkit refined over years of building and shipping real products."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.category}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-surface/60 p-7 transition-colors duration-300 hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <Icon className="h-7 w-7 shrink-0 text-primary transition-transform duration-300 group-hover:scale-110" />
                <h3 className="text-xl font-bold text-foreground">
                  {group.category}
                </h3>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-surface-2 px-3.5 py-1.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-primary/20 hover:text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
