import type { Metadata } from "next";
import { ConfirmationClient } from "@/features/confirmation/confirmation-client";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Booking Confirmed",
  description: "Your event registration has been confirmed. View your booking details and download your ticket.",
  path: "/confirmation",
});

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <ConfirmationClient />
    </div>
  );
}
