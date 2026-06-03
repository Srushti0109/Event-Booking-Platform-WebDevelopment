import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";

interface SectionHeaderProps {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  id?: string;
  eyebrow?: string;
}

export function SectionHeader({
  title,
  description,
  href,
  linkLabel = "View all",
  id,
  eyebrow,
}: SectionHeaderProps) {
  return (
    <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-muted-foreground text-lg leading-relaxed">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all shrink-0"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </FadeIn>
  );
}
