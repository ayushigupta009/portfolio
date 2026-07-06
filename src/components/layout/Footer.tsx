import { siteConfig } from "@/config/site";
import { footerSocialLinks } from "@/data/navigation";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto w-full px-8 py-14 sm:px-12 lg:px-24">
        {/* Top row: name + tagline on the left, socials on the right */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href="#home"
              className="w-fit text-2xl font-bold text-gradient"
            >
              {siteConfig.name}
            </a>
            <p className="mt-2 text-muted">
              Designing with purpose, building with precision — turning ideas
              into experiences people love.
            </p>
          </div>

          <SocialLinks links={footerSocialLinks} />
        </div>

        {/* Divider + centered copyright */}
        <div className="mt-10 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
