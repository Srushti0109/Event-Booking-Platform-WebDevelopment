import { HeroSection } from "@/components/home/hero-section";
import { SectionHeader } from "@/components/home/section-header";
import { EventGrid } from "@/components/events/event-grid";
import { CategoryCard } from "@/components/home/category-card";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { StatsSection } from "@/components/home/stats-section";
import { Newsletter } from "@/components/home/newsletter";
import { RecentlyViewed } from "@/components/events/recently-viewed";
import {
  getFeaturedEvent,
  getFeaturedEvents,
  getUpcomingEvents,
} from "@/lib/events";
import { CATEGORIES } from "@/lib/constants";

export default function HomePage() {
  const featuredEvent = getFeaturedEvent();
  const featuredEvents = getFeaturedEvents(3);
  const upcomingEvents = getUpcomingEvents(6);

  if (!featuredEvent) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-muted-foreground">
        <p>No events available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection featuredEvent={featuredEvent} />

      <section id="featured" className="py-20 sm:py-28" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="featured-heading"
            eyebrow="Featured"
            title="Hand-Picked Events"
            description="Curated experiences our team recommends — from AI summits to founder nights."
            href="/events"
          />
          <EventGrid events={featuredEvents} />
        </div>
      </section>

      <div className="section-divider mx-auto max-w-7xl" />

      <section className="py-20 sm:py-28 bg-muted/25" aria-labelledby="upcoming-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="upcoming-heading"
            eyebrow="Upcoming"
            title="Don't Miss These"
            description="Secure your spot before tickets sell out."
            href="/events"
          />
          <EventGrid events={upcomingEvents} />
        </div>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="categories-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            id="categories-heading"
            eyebrow="Explore"
            title="Browse by Category"
            description="Find events aligned with your interests and career goals."
            href="/events"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, index) => (
              <CategoryCard key={cat.name} name={cat.name} index={index} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <StatsSection />
      <Testimonials />
      <RecentlyViewed />
      <Newsletter />
    </>
  );
}
