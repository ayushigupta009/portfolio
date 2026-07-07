/**
 * Global site configuration — name, SEO metadata, and contact/social handles.
 */
export const siteConfig = {
  name: "Ayushi Gupta",
  title: "Ayushi Gupta — Software Developer",
  description:
    "Personal portfolio of Ayushi Gupta, a software developer building cross-platform mobile and web applications with Flutter, React Native, and modern web technologies.",
  url: "https://ayushi-portfolio.vercel.app",
  author: "Ayushi Gupta",
  role: "Software Developer",
  email: "infoayushigupta09@gmail.com",
  phone: "+91 99999 99999",
  location: "Bhilai, India",
  availability: "Open to opportunities",
  resumeUrl: "/resume/ayushi-gupta-resume.pdf",
  links: {
    github: "https://github.com/ayushigupta009",
    linkedin: "https://www.linkedin.com/in/ayushi-gupta09",
  },
} as const;

export type SiteConfig = typeof siteConfig;
