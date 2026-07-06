import { socialLinks } from "@/data/navigation";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  links?: SocialLink[];
}

/**
 * Row of social media icon links.
 */
export function SocialLinks({
  className,
  iconClassName,
  links = socialLinks,
}: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="group grid h-10 w-10 place-items-center rounded-full border border-border text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary"
        >
          <Icon className={cn("h-[18px] w-[18px]", iconClassName)} />
        </a>
      ))}
    </div>
  );
}
