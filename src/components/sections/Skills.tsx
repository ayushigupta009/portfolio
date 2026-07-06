"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
        className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-7 sm:grid-cols-2"
      >
        {skills.map((skill) => (
          <motion.div key={skill.name} variants={fadeUp}>
            <ProgressBar name={skill.name} level={skill.level} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
