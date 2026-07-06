import type { ComponentType, SVGProps } from "react";

/** Any icon component that renders an SVG (lucide icons + our brand glyphs). */
export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: IconType;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
}

export type ResumeKind = "education" | "experience";

export interface ResumeItem {
  kind: ResumeKind;
  period: string;
  title: string;
  organization: string;
  description: string;
}

export type ProjectCategory = "All" | "Web" | "Mobile" | "UI/UX" | "Branding";

export interface Project {
  title: string;
  category: Exclude<ProjectCategory, "All">;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
}

