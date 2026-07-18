"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { education, experience } from "@/data/resume";
import type { ResumeItem } from "@/types";

import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  staggerContainer,
  fadeUp,
  viewportOnce,
} from "@/lib/animations";

function Timeline({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: LucideIcon;
  items: ResumeItem[];
}) {
  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
          <Icon className="h-5 w-5" />
        </span>

        <h3 className="text-xl font-bold text-foreground">
          {title}
        </h3>
      </div>

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative ml-4 space-y-8 border-l border-border pl-8"
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={fadeUp}
            className="relative"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-[41px] top-2 grid h-4 w-4 place-items-center rounded-full border-2 border-primary bg-background">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>

            {/* Period */}
            <span className="mb-3 inline-block rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">
              {item.period}
            </span>

            {/* Logo + Content */}
            <div className="flex items-start gap-4">
              {item.logo && (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-border bg-card p-2 shadow-sm">
                  <Image
                    src={item.logo}
                    alt={item.organization}
                    width={40}
                    height={40}
                    className="object-contain rounded-lg"
                  />
                </div>
              )}

              <div>
                <h4 className="text-base font-bold text-foreground">
                  {item.title}
                </h4>

                <p className="text-sm font-medium text-primary">
                  {item.organization}
                </p>

                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </div>
  );
}

export function Resume() {
  return (
    <Section id="resume">
      <SectionTitle
        eyebrow="My Journey"
        title="Education & Experience"
        description="My academic background and the roles that shaped how I build today."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Timeline
          title="Education"
          icon={GraduationCap}
          items={education}
        />

        <Timeline
          title="Experience"
          icon={Briefcase}
          items={experience}
        />
      </div>
    </Section>
  );
}