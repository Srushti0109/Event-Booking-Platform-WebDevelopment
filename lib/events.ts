import { events } from "@/data/events";
import type { Event, EventCategory, EventFilters, SortOption } from "@/types/event";

export function getAllEvents(): Event[] {
  return events;
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}

export function getFeaturedEvent(): Event | undefined {
  return events.find((e) => e.featured) ?? events[0];
}

export function getFeaturedEvents(limit = 4): Event[] {
  return events.filter((e) => e.featured).slice(0, limit);
}

export function getUpcomingEvents(limit?: number): Event[] {
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return limit ? upcoming.slice(0, limit) : upcoming;
}

export function getPopularEvents(limit = 6): Event[] {
  return events.filter((e) => e.popular).slice(0, limit);
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return events.filter((e) => e.category === category);
}

export function filterAndSortEvents(filters: EventFilters): Event[] {
  let result = [...events];
  const search = filters.search.trim().toLowerCase();

  if (search) {
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(search) ||
        e.category.toLowerCase().includes(search) ||
        e.location.toLowerCase().includes(search) ||
        e.city.toLowerCase().includes(search) ||
        e.tags.some((t) => t.toLowerCase().includes(search))
    );
  }

  if (filters.category !== "all") {
    result = result.filter((e) => e.category === filters.category);
  }

  if (filters.dateFrom) {
    result = result.filter((e) => e.date >= filters.dateFrom);
  }

  if (filters.dateTo) {
    result = result.filter((e) => e.date <= filters.dateTo);
  }

  result = sortEvents(result, filters.sort);
  return result;
}

function sortEvents(eventsList: Event[], sort: SortOption): Event[] {
  const sorted = [...eventsList];
  switch (sort) {
    case "date-asc":
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    case "date-desc":
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "popular":
      return sorted.sort((a, b) => b.ticketsSold - a.ticketsSold);
    default:
      return sorted;
  }
}

export function getRelatedEvents(eventId: string, category: EventCategory, limit = 3): Event[] {
  return events
    .filter((e) => e.id !== eventId && e.category === category)
    .slice(0, limit);
}
