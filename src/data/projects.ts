import type { Project, ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  "All",
  "Web",
  "Mobile",
];

export const projects: Project[] = [
  {
    title: "Jewel",
    category: "Mobile",
    description:
      "A modern jewellery shopping app with secure authentication, product browsing, cart management, seamless checkout, and sales insights.",
    tags: ["Flutter", "GetX", "Firebase", "Razorpay"],
    image: "/images/projects/project-1.jpeg",
    liveUrl: "#",
    repoUrl: "https://github.com/ayushigupta009/Jewel",
  },
  {
    title: "dms-frontend",
    category: "Web",
    description:
      "A secure document management system featuring OTP authentication, document uploads, tagging, and smart search.",
    tags: ["Next.js", "TypeScript"],
    image: "/images/projects/project-2.png",
    liveUrl: "#",
    repoUrl: "https://github.com/ayushigupta009/dms-frontend",
  },
];
