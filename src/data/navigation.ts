import {
  Home,
  User,
  Cpu,
  GraduationCap,
  FolderKanban,
  Mail,
} from "lucide-react";
import type { NavItem, SocialLink } from "@/types";
import { siteConfig } from "@/config/site";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  DribbbleIcon,
  InstagramIcon,
} from "@/components/icons";

export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "about", label: "About", href: "#about", icon: User },
  { id: "skills", label: "Skills", href: "#skills", icon: Cpu },
  { id: "resume", label: "Resume", href: "#resume", icon: GraduationCap },
  { id: "portfolio", label: "Portfolio", href: "#portfolio", icon: FolderKanban },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: GithubIcon },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "Twitter", href: siteConfig.links.twitter, icon: TwitterIcon },
  { label: "Dribbble", href: siteConfig.links.dribbble, icon: DribbbleIcon },
  { label: "Instagram", href: siteConfig.links.instagram, icon: InstagramIcon },
];
