import {
  Home,
  UserRound,
  Code2,
  GraduationCap,
  LayoutGrid,
  Mail,
} from "lucide-react";
import type { NavItem, SocialLink } from "@/types";
import { siteConfig, mailComposeUrl } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "about", label: "About", href: "#about", icon: UserRound },
  { id: "contributions", label: "Contributions", href: "#contributions", icon: GithubIcon },
  { id: "skills", label: "Skills", href: "#skills", icon: Code2 },
  { id: "resume", label: "Experience", href: "#resume", icon: GraduationCap },
  { id: "portfolio", label: "Portfolio", href: "#portfolio", icon: LayoutGrid },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
];

/** Social links plus a direct email — used by the footer and the hero rail. */
export const footerSocialLinks: SocialLink[] = [
  ...socialLinks,
  { label: "Email", href: mailComposeUrl, icon: Mail },
];
