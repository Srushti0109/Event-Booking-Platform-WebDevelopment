"use client";

import Image from "next/image";
import { Calendar, Download, MapPin, Ticket, User, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Booking } from "@/types/booking";
import { formatDate, formatPrice } from "@/lib/utils";

interface ConfirmationCardProps {
  booking: Booking;
}

export function ConfirmationCard({ booking }: ConfirmationCardProps) {
  const handleDownload = () => {
    alert(
      `Ticket download would generate a PDF for:\n\n${booking.confirmationCode}\n${booking.eventTitle}\n\n(This is a UI demo — no file is generated.)`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-left"
    >
      <div className="overflow-hidden rounded-2xl border bg-card card-shadow-hover">
        <div className="relative h-44 sm:h-52">
          <Image
            src={booking.eventImage}
            alt={booking.eventTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge className="gradient-bg border-0 text-white">Confirmed</Badge>
          </div>
        </div>

        <div className="p-6 space-y-5 -mt-8 relative">
          <div className="rounded-xl border bg-card/95 backdrop-blur-sm p-4 card-shadow">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Confirmation Code
            </p>
            <p className="text-xl font-mono font-bold text-primary mt-1 tracking-wide">
              {booking.confirmationCode}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight">{booking.eventTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              TechVerse Booking
            </p>
          </div>

          <Separator />

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-lg bg-muted/50 p-3">
              <Calendar className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground font-medium">Date & Time</dt>
                <dd className="font-medium text-sm mt-0.5">
                  {formatDate(booking.eventDate)} at {booking.eventTime}
                </dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg bg-muted/50 p-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground font-medium">Location</dt>
                <dd className="font-medium text-sm mt-0.5 line-clamp-2">
                  {booking.eventLocation}
                </dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg bg-muted/50 p-3">
              <User className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground font-medium">Attendee</dt>
                <dd className="font-medium text-sm mt-0.5">{booking.fullName}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg bg-muted/50 p-3">
              <Ticket className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <dt className="text-xs text-muted-foreground font-medium">Tickets</dt>
                <dd className="font-medium text-sm mt-0.5">
                  {booking.ticketQuantity} × {formatPrice(booking.ticketPrice)}
                </dd>
                <dd className="text-primary font-bold text-sm mt-1">
                  Total {formatPrice(booking.totalAmount)}
                </dd>
              </div>
            </div>
          </dl>

          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full rounded-xl h-11"
            size="lg"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Ticket
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
