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
          className="group relative grid h-10 w-10 place-items-center rounded-full border border-primary/35 bg-surface/60 text-muted shadow-[0_0_18px_-6px_color-mix(in_srgb,var(--color-primary)_60%,transparent)] ring-1 ring-inset ring-foreground/[0.06] transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:border-transparent hover:text-white hover:shadow-[0_10px_28px_-8px_color-mix(in_srgb,var(--color-primary)_85%,transparent)]"
        >
          {/* Brand gradient fill, revealed on hover */}
          <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,#994ff5,#e0468f,#f0913c)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Icon className={cn("relative h-[18px] w-[18px]", iconClassName)} />
        </a>
      ))}
    </div>
  );
}
