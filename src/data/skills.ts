import {
  Smartphone,
  LayoutTemplate,
  Server,
  Database,
  Layers,
  TerminalSquare,
} from "lucide-react";
import type { SkillGroup } from "@/types";

/** Skills grouped by domain — from the resume, shown as chips (no percentages). */
export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Development",
    icon: LayoutTemplate,
    skills: ["React.js", "Next.js", "JavaScript", "HTML", "CSS", "Bootstrap", "Medusa.js"],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    skills: ["React Native", "Flutter & Dart", "Kotlin", "Swift", "Redux Toolkit", "Android Studio", "Xcode"],
  },
  {
    category: "Backend Development",
    icon: Server,
    skills: ["Node.js", "RESTful APIs", "Firebase"],
  },
  {
    category: "Database Management",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "SQLite"],
  },
  {
    category: "Cloud & Services",
    icon: Layers,
    skills: ["Firebase Auth", "Cloud Messaging", "Analytics", "Crashlytics"],
  },
  {
    category: "Tools & Deployment",
    icon: TerminalSquare,
    skills: ["Git & GitHub", "Bitbucket", "Postman", "Play Store", "App Store"],
  },
];
