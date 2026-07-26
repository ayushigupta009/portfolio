"use client";

import { motion } from "framer-motion";
import { achievements } from "@/data/achievements";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Glow } from "@/components/ui/Glow";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/animations";

function AchievementCard({
  achievement,
}: {
  achievement: (typeof achievements)[number];
}) {
  const Icon = achievement.icon;

  return (
    <motion.article
      variants={fadeUp}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/60 p-6 transition-colors duration-300 hover:border-primary/40"
    >
      {/* accent line draw-in */}
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-primary to-primary/20 transition-[width] duration-500 ease-out group-hover:w-full" />

      {/* oversized ghost icon watermark */}
      <Icon
        className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 -rotate-12 text-primary/[0.06] transition-all duration-500 ease-out group-hover:rotate-0 group-hover:scale-110 group-hover:text-primary/[0.09]"
        strokeWidth={1}
      />

      {/* year badge — top right */}
      <span className="absolute right-5 top-5 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-semibold text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-primary group-hover:bg-primary/10 group-hover:text-primary">
        {achievement.year}
      </span>

      <div className="relative flex items-start gap-4 pr-16">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {achievement.kind === "award" ? "Award" : "Certification"}
          </span>
          <h3 className="mt-1 text-base font-bold text-foreground sm:text-lg">
            {achievement.title}
          </h3>
          <p className="text-sm font-medium text-muted">{achievement.issuer}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {achievement.description}
      </p>
    </motion.article>
  );
}

export function Achievements() {
  return (
    <Section id="achievements">
      <Glow variant="primary" className="left-[-8%] top-1/4 h-72 w-72 opacity-25" />
      <SectionTitle
        eyebrow="Achievements"
        title="Awards & certifications"
        description="Recognition and credentials earned along the way."
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mt-14 grid gap-5"
      >
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.title} achievement={achievement} />
        ))}
      </motion.div>
    </Section>
  );
}
