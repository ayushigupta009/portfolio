"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects, projectCategories } from "@/data/projects";
import type { ProjectCategory } from "@/types";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [filter, setFilter] = useState<ProjectCategory>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  return (
    <Section id="portfolio">
      <SectionTitle
        eyebrow="Portfolio"
        title="Featured projects"
        description="A selection of recent work across web, mobile, product design, and branding."
      />

      {/* Filters */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
              filter === cat
                ? "bg-primary text-white shadow-[0_10px_30px_-10px_color-mix(in_srgb,var(--color-primary)_80%,transparent)]"
                : "border border-border text-muted hover:border-primary/50 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Hover actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} live`}
                      className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white transition-transform hover:scale-110"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source`}
                      className="grid h-11 w-11 place-items-center rounded-full bg-surface text-foreground ring-1 ring-border transition-transform hover:scale-110"
                    >
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  {project.category}
                </span>
                <h3 className="mt-1 text-lg font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
