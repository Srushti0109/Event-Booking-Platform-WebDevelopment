"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { EventCategory, EventFilters } from "@/types/event";
import { filterAndSortEvents } from "@/lib/events";
import { SearchBar } from "@/components/events/search-bar";
import { FilterPanel } from "@/components/events/filter-panel";
import { EventGrid } from "@/components/events/event-grid";
import { FadeIn } from "@/components/motion/fade-in";

const defaultFilters: EventFilters = {
  search: "",
  category: "all",
  dateFrom: "",
  dateTo: "",
  sort: "date-asc",
};

export function EventsPageClient() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prev) => ({
        ...prev,
        category: category as EventCategory,
      }));
    }
  }, [searchParams]);

  const filteredEvents = useMemo(
    () => filterAndSortEvents(filters),
    [filters]
  );

  return (
    <div className="space-y-8">
      <FadeIn>
        <SearchBar
          value={filters.search}
          onChange={(search) => setFilters((prev) => ({ ...prev, search }))}
        />
      </FadeIn>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <FadeIn direction="right">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </FadeIn>

        <div>
          <p
            className="text-sm text-muted-foreground mb-6 flex items-center gap-2"
            role="status"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
            Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""}
          </p>
          <EventGrid events={filteredEvents} emptyVariant="search" />
        </div>
      </div>
    </div>
  );
}
