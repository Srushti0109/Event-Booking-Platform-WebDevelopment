"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { FadeIn } from "@/components/motion/fade-in";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 sm:py-28 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="absolute inset-0 -z-10 bg-muted/30" />
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
            Testimonials
          </p>
          <h2 id="testimonials-heading" className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by Builders
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Professionals at top tech companies use TechVerse to find their next event.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.slice(0, 6).map((item) => (
            <StaggerItem key={item.id}>
              <figure className="relative h-full rounded-2xl border bg-card p-6 card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-0.5">
                <Quote
                  className="absolute top-5 right-5 h-8 w-8 text-primary/15"
                  aria-hidden="true"
                />
                <div className="flex gap-0.5 mb-4" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{item.content}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-border/60">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover ring-2 ring-border"
                  />
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.role} · {item.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
