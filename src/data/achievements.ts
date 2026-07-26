import { Award, BadgeCheck } from "lucide-react";
import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    kind: "award",
    title: "Rising Star of the Year Award",
    issuer: "Sthanave Technologies",
    year: "2024",
    description:
      "Honored for exceptional performance, innovative contributions, and commitment to excellence.",
    icon: Award,
  },
  {
    kind: "certification",
    title: "Vocational Training in MERN Stack",
    issuer: "Tutedude e-learning platform",
    year: "2023",
    description:
      "Gained hands-on experience with MongoDB, Express.js, React.js, and Node.js through comprehensive training.",
    icon: BadgeCheck,
  },
];
