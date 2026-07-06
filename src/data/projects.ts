import type { Project, ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  "All",
  "Web",
  "Mobile",
  "UI/UX",
  "Branding",
];

export const projects: Project[] = [
  {
    title: "Nova Analytics Dashboard",
    category: "Web",
    description:
      "A real-time analytics dashboard with rich charts, filtering, and a themeable design system.",
    tags: ["Next.js", "TypeScript", "Recharts"],
    image: "/images/projects/project-1.svg",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Aria Banking App",
    category: "Mobile",
    description:
      "A mobile-first banking experience focused on clarity, speed, and delightful micro-interactions.",
    tags: ["React Native", "UX", "Motion"],
    image: "/images/projects/project-2.svg",
    liveUrl: "#",
  },
  {
    title: "Lumen Design System",
    category: "UI/UX",
    description:
      "A scalable component library and Figma kit powering a suite of enterprise products.",
    tags: ["Figma", "Design System", "Tokens"],
    image: "/images/projects/project-3.svg",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Verde Brand Identity",
    category: "Branding",
    description:
      "Full brand identity — logo, palette, and guidelines — for a sustainable lifestyle startup.",
    tags: ["Branding", "Logo", "Guidelines"],
    image: "/images/projects/project-4.svg",
    liveUrl: "#",
  },
  {
    title: "Orbit SaaS Landing",
    category: "Web",
    description:
      "A high-converting marketing site with buttery scroll animations and a modular CMS.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/images/projects/project-5.svg",
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Pulse Fitness Tracker",
    category: "Mobile",
    description:
      "A wellness app with goal tracking, progress rings, and an encouraging, friendly tone.",
    tags: ["Mobile", "UI/UX", "Prototype"],
    image: "/images/projects/project-6.svg",
    liveUrl: "#",
  },
];
