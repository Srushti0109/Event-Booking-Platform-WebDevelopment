import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowLeft,
  Ticket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AvailabilityBadge } from "@/components/events/availability-badge";
import { EventDetailClient } from "@/features/events/event-detail-client";
import { EventGrid } from "@/components/events/event-grid";
import { FadeIn } from "@/components/motion/fade-in";
import { getEventById, getRelatedEvents } from "@/lib/events";
import { createPageMetadata } from "@/lib/metadata";
import { formatDate, formatPrice } from "@/lib/utils";

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = getEventById(id);
  if (!event) return { title: "Event Not Found" };

  return createPageMetadata({
    title: event.title,
    description: event.shortDescription,
    path: `/events/${id}`,
    image: event.image,
  });
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = getEventById(id);

  if (!event) notFound();

  const relatedEvents = getRelatedEvents(event.id, event.category);
  const isSoldOut = event.ticketsSold >= event.totalTickets;

  return (
    <EventDetailClient eventId={event.id}>
      <article>
        <div className="relative h-[40vh] min-h-[280px] max-h-[480px] w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 pb-16">
          <FadeIn>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to events
            </Link>
          </FadeIn>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
            <div className="space-y-8">
              <FadeIn>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>{event.category}</Badge>
                  {event.featured && <Badge className="gradient-bg border-0">Featured</Badge>}
                  <AvailabilityBadge
                    totalTickets={event.totalTickets}
                    ticketsSold={event.ticketsSold}
                  />
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                    {formatDate(event.date)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    {event.time} – {event.endTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" aria-hidden="true" />
                    {event.organizer}
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <section aria-labelledby="about-heading">
                  <h2 id="about-heading" className="text-2xl font-bold mb-4">
                    About This Event
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </section>
              </FadeIn>

              {event.agenda.length > 0 && (
                <FadeIn delay={0.15}>
                  <section aria-labelledby="agenda-heading">
                    <h2 id="agenda-heading" className="text-2xl font-bold mb-4">
                      Agenda
                    </h2>
                    <ol className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <li
                          key={index}
                          className="flex gap-4 rounded-xl border bg-card p-4 card-shadow"
                        >
                          <span className="text-sm font-mono font-semibold text-primary shrink-0 w-14">
                            {item.time}
                          </span>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                </FadeIn>
              )}

              {event.speakers.length > 0 && (
                <FadeIn delay={0.2}>
                  <section aria-labelledby="speakers-heading">
                    <h2 id="speakers-heading" className="text-2xl font-bold mb-4">
                      Speakers
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {event.speakers.map((speaker) => (
                        <div
                          key={speaker.id}
                          className="flex gap-4 rounded-xl border bg-card p-4 card-shadow"
                        >
                          <Image
                            src={speaker.avatar}
                            alt={speaker.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover shrink-0"
                          />
                          <div>
                            <h3 className="font-semibold">{speaker.name}</h3>
                            <p className="text-sm text-primary">{speaker.role}</p>
                            <p className="text-sm text-muted-foreground mt-1">{speaker.bio}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </FadeIn>
              )}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <FadeIn delay={0.1} direction="left">
                <div className="rounded-2xl border bg-card p-6 card-shadow-hover space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Ticket Price</p>
                      <p className="text-3xl font-bold text-primary">{formatPrice(event.price)}</p>
                    </div>
                    <Ticket className="h-8 w-8 text-muted-foreground/50" aria-hidden="true" />
                  </div>
                  <Separator />
                  <AvailabilityBadge
                    totalTickets={event.totalTickets}
                    ticketsSold={event.ticketsSold}
                  />
                  <Button asChild size="lg" className="w-full" disabled={isSoldOut}>
                    <Link href={isSoldOut ? "#" : `/book/${event.id}`}>
                      {isSoldOut ? "Sold Out" : "Register Now"}
                    </Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Free cancellation up to 48 hours before event
                  </p>
                </div>
              </FadeIn>
            </aside>
          </div>

          {relatedEvents.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl font-bold mb-6">
                Related Events
              </h2>
              <EventGrid events={relatedEvents} showFavorite />
            </section>
          )}
        </div>
      </article>
    </EventDetailClient>
  );
}
