"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { ArrowUpRight, Calendar, Heart, MapPin } from "lucide-react";
import type { Event } from "@/types/event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/events/availability-badge";
import { useFavorites } from "@/hooks/use-favorites";
import { cn, formatPrice, formatShortDate } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  showFavorite?: boolean;
}

export const EventCard = memo(function EventCard({
  event,
  showFavorite = true,
}: EventCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(event.id);
  const isSoldOut = event.ticketsSold >= event.totalTickets;

  return (
    <article className="h-full group/card">
      <div className="relative h-full flex flex-col overflow-hidden rounded-2xl border bg-card card-shadow transition-all duration-300 hover:card-shadow-hover hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Link href={`/events/${event.id}`} tabIndex={-1} aria-hidden="true">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover/card:scale-105"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge
              variant="secondary"
              className="bg-black/40 text-white border-white/10 backdrop-blur-md hover:bg-black/40"
            >
              {event.category}
            </Badge>
            {event.featured && (
              <Badge className="gradient-bg border-0 text-white shadow-lg shadow-primary/30">
                Featured
              </Badge>
            )}
          </div>

          {showFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(event.id);
              }}
              className={cn(
                "absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/30 backdrop-blur-md transition-all hover:scale-110",
                favorited ? "text-red-400" : "text-white/80 hover:text-red-400"
              )}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={favorited}
            >
              <Heart className={cn("h-4 w-4", favorited && "fill-current")} />
            </button>
          )}

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="rounded-lg bg-black/40 backdrop-blur-md border border-white/10 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-white/60">From</p>
              <p className="text-lg font-bold text-white tracking-tight">
                {formatPrice(event.price)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-5">
          <Link href={`/events/${event.id}`} className="flex-1">
            <h3 className="font-semibold text-lg leading-snug line-clamp-2 tracking-tight group-hover/card:text-primary transition-colors pr-6">
              {event.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {event.shortDescription}
            </p>
          </Link>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/80 px-2 py-1">
              <Calendar className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
              {formatShortDate(event.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-muted/80 px-2 py-1">
              <MapPin className="h-3 w-3 shrink-0 text-primary" aria-hidden="true" />
              {event.city}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 pt-4 border-t border-border/60">
            <AvailabilityBadge
              totalTickets={event.totalTickets}
              ticketsSold={event.ticketsSold}
            />
            <Button
              asChild
              size="sm"
              variant={isSoldOut ? "secondary" : "default"}
              disabled={isSoldOut}
              className="shrink-0 group/btn"
            >
              <Link href={isSoldOut ? "#" : `/events/${event.id}`}>
                {isSoldOut ? "Sold Out" : "Details"}
                {!isSoldOut && (
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                )}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
});
