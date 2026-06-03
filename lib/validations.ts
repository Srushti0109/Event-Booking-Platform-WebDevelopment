import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\d\s\-+()]+$/, "Invalid phone number format"),
  ticketQuantity: z
    .number()
    .min(1, "At least 1 ticket required")
    .max(10, "Maximum 10 tickets per booking"),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type NewsletterSchema = z.infer<typeof newsletterSchema>;
