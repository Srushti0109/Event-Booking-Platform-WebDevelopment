"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmationCard } from "@/components/booking/confirmation-card";
import { getLastBooking } from "@/lib/storage";
import type { Booking } from "@/types/booking";
import { EmptyState } from "@/components/shared/empty-state";

export function ConfirmationClient() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setBooking(getLastBooking());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="animate-pulse space-y-6 max-w-lg mx-auto">
        <div className="h-20 w-20 rounded-2xl bg-muted mx-auto skeleton-shimmer" />
        <div className="h-10 bg-muted rounded-xl w-2/3 mx-auto skeleton-shimmer" />
        <div className="h-72 bg-muted rounded-2xl skeleton-shimmer" />
      </div>
    );
  }

  if (!booking) {
    return (
      <EmptyState
        title="No booking found"
        description="Complete a registration to see your confirmation here."
        actionLabel="Browse events"
        actionHref="/events"
      />
    );
  }

  return (
    <div className="max-w-lg mx-auto text-center space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl scale-150" aria-hidden="true" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2
              className="h-10 w-10 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <PartyPopper className="h-4 w-4" aria-hidden="true" />
          You&apos;re all set
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          Booking Confirmed
        </h1>
        <p className="text-muted-foreground text-lg max-w-sm mx-auto">
          Your tickets are reserved. Confirmation saved to your device.
        </p>
      </motion.div>

      <ConfirmationCard booking={booking} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
      >
        <Button asChild variant="outline" className="rounded-xl">
          <Link href="/events">Browse More Events</Link>
        </Button>
        <Button asChild className="rounded-xl shadow-md shadow-primary/20">
          <Link href="/">Back to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
}
