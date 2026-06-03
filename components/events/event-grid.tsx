"use client";

import type { Event } from "@/types/event";
import { EventCard } from "@/components/events/event-card";
import { EventCardSkeleton } from "@/components/events/event-card-skeleton";
import { EmptyState } from "@/components/shared/empty-state";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";

interface EventGridProps {
  events: Event[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  showFavorite?: boolean;
  emptyVariant?: "search" | "default";
}

export function EventGrid({
  events,
  loading = false,
  emptyTitle = "No events found",
  emptyDescription = "Try adjusting your search or filters to find more events.",
  showFavorite = true,
  emptyVariant = "search",
}: EventGridProps) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        variant={emptyVariant}
      />
    );
  }

  return (
    <div role="list" aria-label="Events list">
      <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <StaggerItem key={event.id}>
            <div role="listitem">
              <EventCard event={event} showFavorite={showFavorite} />
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
