import { Suspense } from "react";
import type { Metadata } from "next";
import { EventsPageClient } from "@/features/events/events-page-client";
import { EventGrid } from "@/components/events/event-grid";
import { createPageMetadata } from "@/lib/metadata";
import { FadeIn } from "@/components/motion/fade-in";
import { getAllEvents } from "@/lib/events";

export const metadata: Metadata = createPageMetadata({
  title: "Browse Events",
  description:
    "Search and filter premium technology events by category, date, and location.",
  path: "/events",
});

function EventsLoading() {
  return <EventGrid events={[]} loading />;
}

export default function EventsPage() {
  const eventCount = getAllEvents().length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20 lg:px-8">
      <FadeIn className="mb-12">
        <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
          Discover
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">Browse Events</h1>
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg leading-relaxed">
          Explore {eventCount}+ curated technology experiences. Search by name, category, or
          location — filter and sort to find your perfect event.
        </p>
      </FadeIn>

      <Suspense fallback={<EventsLoading />}>
        <EventsPageClient />
      </Suspense>
    </div>
  );
}
