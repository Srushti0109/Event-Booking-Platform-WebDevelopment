"use client";

import { STATS } from "@/lib/constants";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { FadeIn } from "@/components/motion/fade-in";
import { formatNumber } from "@/lib/utils";

function StatItem({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix: string;
}) {
  const { count, ref } = useAnimatedCounter({ end: value });

  return (
    <div ref={ref} className="relative text-center p-4">
      <p
        className="text-3xl sm:text-4xl font-bold gradient-text tabular-nums tracking-tight"
        suppressHydrationWarning
      >
        {formatNumber(count)}
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground font-medium">{label}</p>
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="py-20 sm:py-28 relative" aria-labelledby="stats-heading">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-transparent to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            By the numbers
          </p>
          <h2 id="stats-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Trusted by the Tech Community
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Engineers, founders, and creators rely on TechVerse to discover their next conference.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="relative rounded-2xl border bg-card/80 backdrop-blur-sm p-6 sm:p-10 card-shadow overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-500/5 pointer-events-none" />
            <div className="relative grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-0 lg:divide-x divide-border/60">
              {STATS.map((stat) => (
                <StatItem
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
