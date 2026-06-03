import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { AvailabilityBadge } from "@/components/events/availability-badge";
import { FadeIn } from "@/components/motion/fade-in";
import { getEventById } from "@/lib/events";
import { createPageMetadata } from "@/lib/metadata";
import { formatPrice, formatShortDate } from "@/lib/utils";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Book Event" };

  return createPageMetadata({
    title: `Book — ${event.title}`,
    description: `Register for ${event.title}. Secure your tickets now.`,
    path: `/book/${id}`,
  });
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) notFound();

  const isSoldOut = event.ticketsSold >= event.totalTickets;
  if (isSoldOut) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn>
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to event
        </Link>
      </FadeIn>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <FadeIn>
          <div className="relative aspect-video rounded-2xl overflow-hidden card-shadow">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-6 mb-4">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
              {formatShortDate(event.date)} · {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {event.city}
            </span>
          </div>
          <AvailabilityBadge
            totalTickets={event.totalTickets}
            ticketsSold={event.ticketsSold}
          />
          <p className="mt-4 text-3xl font-bold text-primary">{formatPrice(event.price)}</p>
          <p className="text-sm text-muted-foreground">per ticket</p>
        </FadeIn>

        <FadeIn delay={0.1} direction="left">
          <BookingForm event={event} />
        </FadeIn>
      </div>
    </div>
  );
}
