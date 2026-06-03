import type { Booking } from "@/types/booking";

const KEYS = {
  bookings: "eventsphere_bookings",
  favorites: "eventsphere_favorites",
  recentlyViewed: "eventsphere_recently_viewed",
  newsletter: "eventsphere_newsletter",
  theme: "eventsphere_theme",
  lastBooking: "eventsphere_last_booking",
} as const;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getBookings(): Booking[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.bookings);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: Booking): void {
  if (!isBrowser()) return;
  const existing = getBookings();
  localStorage.setItem(KEYS.bookings, JSON.stringify([booking, ...existing]));
  localStorage.setItem(KEYS.lastBooking, JSON.stringify(booking));
}

export function getLastBooking(): Booking | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(KEYS.lastBooking);
    return raw ? (JSON.parse(raw) as Booking) : null;
  } catch {
    return null;
  }
}

export function getFavorites(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.favorites);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(eventId: string): string[] {
  if (!isBrowser()) return [];
  const favorites = getFavorites();
  const updated = favorites.includes(eventId)
    ? favorites.filter((id) => id !== eventId)
    : [...favorites, eventId];
  localStorage.setItem(KEYS.favorites, JSON.stringify(updated));
  return updated;
}

export function getRecentlyViewed(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.recentlyViewed);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(eventId: string): string[] {
  if (!isBrowser()) return [];
  const current = getRecentlyViewed().filter((id) => id !== eventId);
  const updated = [eventId, ...current].slice(0, 8);
  localStorage.setItem(KEYS.recentlyViewed, JSON.stringify(updated));
  return updated;
}

export function getNewsletterEmails(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(KEYS.newsletter);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function subscribeNewsletter(email: string): boolean {
  if (!isBrowser()) return false;
  const emails = getNewsletterEmails();
  if (emails.includes(email.toLowerCase())) return false;
  localStorage.setItem(
    KEYS.newsletter,
    JSON.stringify([...emails, email.toLowerCase()])
  );
  return true;
}
