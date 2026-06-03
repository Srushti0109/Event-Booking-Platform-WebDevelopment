"use client";

import { useMemo } from "react";
import { getAllEvents } from "@/lib/events";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { EventCard } from "@/components/events/event-card";
import { SectionHeader } from "@/components/home/section-header";

export function RecentlyViewed() {
  const { recentIds } = useRecentlyViewed();

  const events = useMemo(() => {
    const all = getAllEvents();
    return recentIds
      .map((id) => all.find((e) => e.id === id))
      .filter((e): e is NonNullable<typeof e> => e !== undefined)
      .slice(0, 3);
  }, [recentIds]);

  if (events.length === 0) return null;

  return (
    <section className="py-12" aria-labelledby="recent-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          id="recent-heading"
          title="Recently Viewed"
          description="Pick up where you left off"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
