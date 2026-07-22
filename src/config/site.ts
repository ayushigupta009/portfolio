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
  phone: "+91 9131679576",
  location: "Bhilai, Chhattisgarh, India",
  availability: "Open to opportunities",
  resumeUrl: "/resume/Ayushi_Gupta_Resume_100726.pdf",
  links: {
    github: "https://github.com/ayushigupta009",
    linkedin: "https://www.linkedin.com/in/ayushi-gupta09",
  },
} as const;

/**
 * Gmail compose URL for the contact address. Preferred over a bare `mailto:`
 * link, which silently does nothing when the visitor's browser has no mail
 * handler registered.
 */
export const mailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  siteConfig.email,
)}`;
