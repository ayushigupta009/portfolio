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
    category: "Mobile Development",
    icon: Smartphone,
    skills: ["Flutter & Dart", "React Native", "Kotlin", "Android Studio", "GetX / BLoC"],
  },
  {
    category: "Frontend",
    icon: LayoutTemplate,
    skills: ["React.js", "Next.js", "JavaScript", "jQuery", "HTML & CSS", "Bootstrap", "Redux Toolkit"],
  },
  {
    category: "Backend",
    icon: Server,
    skills: ["Node.js", "ColdFusion", "RESTful APIs", "Medusa.js"],
  },
  {
    category: "Database",
    icon: Database,
    skills: ["Firebase", "MySQL", "PostgreSQL", "SQLite"],
  },
  {
    category: "Services",
    icon: Layers,
    skills: ["Firebase Auth", "Cloud Messaging", "Analytics", "Crashlytics"],
  },
  {
    category: "Tools & Deployment",
    icon: TerminalSquare,
    skills: ["Git & GitHub", "Bitbucket", "Postman", "Play Store", "App Store"],
  },
];
