export type EventCategory =
  | "Technology"
  | "Business"
  | "Music"
  | "Design"
  | "Workshop"
  | "Startup";

export interface Speaker {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  image: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  city: string;
  category: EventCategory;
  price: number;
  organizer: string;
  organizerLogo?: string;
  agenda: AgendaItem[];
  speakers: Speaker[];
  featured?: boolean;
  popular?: boolean;
  totalTickets: number;
  ticketsSold: number;
  tags: string[];
}

export type SortOption = "date-asc" | "date-desc" | "price-asc" | "price-desc" | "popular";

export interface EventFilters {
  search: string;
  category: EventCategory | "all";
  dateFrom: string;
  dateTo: string;
  sort: SortOption;
}
