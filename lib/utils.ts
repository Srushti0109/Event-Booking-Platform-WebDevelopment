import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Fixed en-US formatting — avoids server/client locale hydration mismatches */
const NUMBER_LOCALE = "en-US" as const;

export function formatNumber(value: number): string {
  return value.toLocaleString(NUMBER_LOCALE);
}

export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions % 1 === 0 ? millions : millions.toFixed(1)}M`;
  }
  if (value >= 1_000) {
    const thousands = value / 1_000;
    return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}K`;
  }
  return formatNumber(value);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(dateString));
}

export function formatShortDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function generateConfirmationCode(): string {
  const segment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TV-${segment()}-${segment()}`;
}

export function getTicketsRemaining(total: number, sold: number): number {
  return Math.max(0, total - sold);
}

export function getAvailabilityStatus(
  total: number,
  sold: number
): "available" | "low" | "sold-out" {
  const remaining = getTicketsRemaining(total, sold);
  if (remaining === 0) return "sold-out";
  if (remaining <= Math.ceil(total * 0.1)) return "low";
  return "available";
}
