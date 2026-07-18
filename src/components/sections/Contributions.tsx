"use client";

import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { fadeUp, viewportOnce } from "@/lib/animations";

/** GitHub username to pull the contribution graph for. */
const GITHUB_USERNAME = "ayushigupta009";

/** Purple contribution scale (light → dark), matching the site accent. */
const THEME = {
  light: ["#ebedf0", "#d8c2f7", "#b98bef", "#9a54e8", "#6d28c9"],
  dark: ["#161b22", "#3b2168", "#5b2f9e", "#7c3aed", "#a970ff"],
};

export function Contributions() {
  // The calendar fetches data on the client, so it must not render during SSR
  // (its markup would differ and cause a hydration mismatch).
  const [mounted, setMounted] = useState(false);
  // Match the calendar's color scheme to the active site theme.
  const [scheme, setScheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    setMounted(true);
    const read = () =>
      setScheme(
        document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark",
      );
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="contributions">
      <SectionTitle
        eyebrow="Open Source"
        title="My GitHub Contributions"
        description="A snapshot of my coding activity — commits, pull requests and the work I ship day to day."
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto mt-12 w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-surface/60 p-4 sm:p-8 lg:p-12"
      >
        {/* Scoped to the calendar's own svg — the legend swatches are svgs too,
            and stretching those blows out the "Less … More" row. Leaving the
            width alone keeps the library's built-in horizontal scroll. */}
        <div className="w-full overflow-x-auto text-foreground">
          {mounted ? (
            <GitHubCalendar
              username={GITHUB_USERNAME}
              colorScheme={scheme}
              theme={THEME}
              fontSize={16}
              blockSize={15}
              blockMargin={5}
            />
          ) : (
            <div className="h-[160px] w-full animate-pulse rounded-lg bg-surface-2/60" />
          )}
        </div>
      </motion.div>
    </Section>
  );
}
