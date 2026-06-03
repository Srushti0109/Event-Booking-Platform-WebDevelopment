import type { EventCategory } from "@/types/event";
import {
  Briefcase,
  Cpu,
  Lightbulb,
  Music2,
  Palette,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const SITE_NAME = "TechVerse";
export const SITE_URL = "https://techverse.app";
export const SITE_DESCRIPTION =
  "The premium platform for technology events — conferences, workshops, and founder experiences built for builders.";

export const TRUST_BADGES = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
] as const;

export const CATEGORIES: {
  name: EventCategory;
  slug: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  eventCount: number;
}[] = [
  {
    name: "Technology",
    slug: "technology",
    description: "AI, cloud, and cutting-edge tech conferences",
    icon: Cpu,
    gradient: "from-blue-500 to-cyan-500",
    eventCount: 24,
  },
  {
    name: "Business",
    slug: "business",
    description: "Leadership, strategy, and growth summits",
    icon: Briefcase,
    gradient: "from-violet-500 to-purple-500",
    eventCount: 18,
  },
  {
    name: "Music",
    slug: "music",
    description: "Concerts, festivals, and live performances",
    icon: Music2,
    gradient: "from-pink-500 to-rose-500",
    eventCount: 15,
  },
  {
    name: "Design",
    slug: "design",
    description: "UX, branding, and creative showcases",
    icon: Palette,
    gradient: "from-orange-500 to-amber-500",
    eventCount: 12,
  },
  {
    name: "Workshop",
    slug: "workshop",
    description: "Hands-on learning and skill-building sessions",
    icon: Lightbulb,
    gradient: "from-emerald-500 to-teal-500",
    eventCount: 20,
  },
  {
    name: "Startup",
    slug: "startup",
    description: "Pitch nights, networking, and founder events",
    icon: Rocket,
    gradient: "from-indigo-500 to-blue-600",
    eventCount: 16,
  },
];

export const STATS = [
  { label: "Total Events", value: 500, suffix: "+" },
  { label: "Active Users", value: 120000, suffix: "+" },
  { label: "Tickets Sold", value: 2500000, suffix: "+" },
  { label: "Cities Covered", value: 85, suffix: "+" },
] as const;
