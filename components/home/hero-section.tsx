"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin, Shield, Sparkles, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/home/countdown-timer";
import { HeroBackground } from "@/components/home/hero-background";
import { FadeIn } from "@/components/motion/fade-in";
import type { Event } from "@/types/event";
import { TRUST_BADGES, STATS } from "@/lib/constants";
import { formatNumber, formatShortDate } from "@/lib/utils";

interface HeroSectionProps {
  featuredEvent: Event;
}

export function HeroSection({ featuredEvent }: HeroSectionProps) {
  const eventDateTime = `${featuredEvent.date}T${featuredEvent.time}:00`;

  return (
    <section className="relative overflow-hidden border-b border-border/50" aria-labelledby="hero-heading">
      <HeroBackground />

      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="space-y-8">
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                <Zap className="h-3.5 w-3.5" aria-hidden="true" />
                {formatNumber(STATS[0].value)}+ technology events worldwide
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1
                id="hero-heading"
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1]"
              >
                Where Builders Meet{" "}
                <span className="gradient-text">The Future</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
                TechVerse is the premium platform for discovering AI summits, dev conferences,
                and founder experiences — curated for engineers, designers, and innovators.
              </p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="shadow-lg shadow-primary/20 h-12 px-8">
                  <Link href="/events">
                    Explore Events
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 glass">
                  <Link href={`/events/${featuredEvent.id}`}>View Spotlight</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.32}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" aria-hidden="true" />
                  Secure checkout
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
                  Curated events
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
                  Instant booking
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-2 pt-2">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md border border-border/80 bg-card/60 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.48}>
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-border/60">
                {STATS.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums">
                      {formatNumber(stat.value)}
                      <span className="text-primary">{stat.suffix}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} direction="left">
            <motion.div
              className="relative rounded-2xl overflow-hidden card-shadow-hover gradient-border"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
              </div>

              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full glass border border-white/10 px-3 py-1 text-xs font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  Live Spotlight
                </span>
                <span className="rounded-full bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/10">
                  {featuredEvent.category}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <p className="text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">
                  Featured Event
                </p>
                <h2 className="text-xl sm:text-2xl font-bold mb-3 line-clamp-2 tracking-tight">
                  {featuredEvent.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-white/75 mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    {formatShortDate(featuredEvent.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {featuredEvent.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {formatNumber(featuredEvent.ticketsSold)} attending
                  </span>
                </div>
                <CountdownTimer targetDate={eventDateTime} />
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
