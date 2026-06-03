import type { Event } from "./event";

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  ticketQuantity: number;
}

export interface Booking extends BookingFormData {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventImage: string;
  ticketPrice: number;
  totalAmount: number;
  createdAt: string;
  confirmationCode: string;
}

export interface StoredBooking extends Booking {
  event?: Pick<
    Event,
    "id" | "title" | "date" | "time" | "location" | "image" | "category"
  >;
}
