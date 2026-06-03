"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingSchema, type BookingSchema } from "@/lib/validations";
import { saveBooking } from "@/lib/storage";
import { formatPrice, generateConfirmationCode, getTicketsRemaining } from "@/lib/utils";
import type { Event } from "@/types/event";
import type { Booking } from "@/types/booking";

interface BookingFormProps {
  event: Event;
}

export function BookingForm({ event }: BookingFormProps) {
  const router = useRouter();
  const maxTickets = Math.min(10, getTicketsRemaining(event.totalTickets, event.ticketsSold));

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingSchema>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      ticketQuantity: 1,
    },
  });

  const quantity = watch("ticketQuantity") || 1;
  const totalAmount = event.price * quantity;

  const onSubmit = (data: BookingSchema) => {
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      eventImage: event.image,
      ticketPrice: event.price,
      totalAmount,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      ticketQuantity: data.ticketQuantity,
      createdAt: new Date().toISOString(),
      confirmationCode: generateConfirmationCode(),
    };

    saveBooking(booking);
    router.push("/confirmation");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registration Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="John Doe"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "name-error" : undefined}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p id="name-error" className="text-sm text-destructive" role="alert">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-destructive" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              {...register("phone")}
            />
            {errors.phone && (
              <p id="phone-error" className="text-sm text-destructive" role="alert">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ticketQuantity">Ticket Quantity</Label>
            <Select
              value={String(quantity)}
              onValueChange={(v) => setValue("ticketQuantity", parseInt(v, 10))}
            >
              <SelectTrigger id="ticketQuantity" aria-label="Select ticket quantity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: maxTickets }, (_, i) => i + 1).map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n} {n === 1 ? "ticket" : "tickets"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.ticketQuantity && (
              <p className="text-sm text-destructive" role="alert">
                {errors.ticketQuantity.message}
              </p>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-4 flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(totalAmount)}</span>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || maxTickets === 0}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Processing...
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
