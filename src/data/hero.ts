import { Code2, Smartphone, Rocket } from "lucide-react";

/**
 * Hero section content — matches the reference layout: a small greeting
 * badge with the name, and a large heading with the role.
 */
export const heroContent = {
  greeting: "Hi! I'm Ayushi Gupta",
  role: "Software Developer",
  description:
    "I build cross-platform mobile and web applications with Flutter, React Native, Kotlin and modern web technologies — focused on scalable, high-performance solutions and great user experience.",
} as const;

/** Info cards stacked to the left of the hero portrait. */
export const heroBadges = [
  {
    icon: Code2,
    label: "Software Developer",
    meta: "2.9+ Years",
    gradient: "linear-gradient(135deg,#994ff5,#7c3aed)",
  },
  {
    icon: Smartphone,
    label: "Mobile & Web",
    meta: "Cross-platform",
    gradient: "linear-gradient(135deg,#e0468f,#994ff5)",
  },
  {
    icon: Rocket,
    label: "Projects Shipped",
    meta: "15+",
    gradient: "linear-gradient(135deg,#f0913c,#e0468f)",
  },
] as const;
