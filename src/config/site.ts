/**
 * Global site configuration — name, SEO metadata, and contact/social handles.
 */
export const siteConfig = {
  name: "Ayushi Gupta",
  title: "Ayushi Gupta — Creative Developer & Designer",
  description:
    "Personal portfolio of Ayushi Gupta, a creative front-end developer and UI/UX designer crafting premium digital experiences.",
  url: "https://ayushi-portfolio.vercel.app",
  author: "Ayushi Gupta",
  role: "Creative Developer",
  email: "aithree@chatsocial.in",
  phone: "+91 98765 43210",
  location: "India",
  availability: "Available for freelance",
  resumeUrl: "/resume/ayushi-gupta-resume.pdf",
  links: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/",
    dribbble: "https://dribbble.com/",
    instagram: "https://instagram.com/",
  },
} as const;

export type SiteConfig = typeof siteConfig;
