import Link from "next/link";
import { Calendar, Cpu, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SITE_NAME, TRUST_BADGES } from "@/lib/constants";

const footerLinks = {
  platform: [
    { label: "Browse Events", href: "/events" },
    { label: "Categories", href: "/events" },
    { label: "Featured", href: "/#featured" },
  ],
  company: [
    { label: "About", href: "/#why-us" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/20" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg text-primary-foreground">
                <Cpu className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="gradient-text">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The premium platform for technology events — built for engineers, designers, and founders.
            </p>
            <div className="flex flex-wrap gap-2">
              {TRUST_BADGES.slice(0, 4).map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-medium text-muted-foreground border border-border/80 rounded px-2 py-0.5"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm tracking-wide mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm tracking-wide mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm tracking-wide mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                San Francisco, CA
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href="mailto:hello@techverse.app" className="hover:text-primary transition-colors">
                  hello@techverse.app
                </a>
              </li>
              <li>
                <Link
                  href="/#newsletter"
                  className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Subscribe
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 opacity-60" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <p className="text-xs">Web Development Internship Project</p>
        </div>
      </div>
    </footer>
  );
}
