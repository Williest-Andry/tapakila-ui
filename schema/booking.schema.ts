import { z } from "zod";

export const bookingItemSchema = z.object({
  ticketTypeId: z.string().uuid(),
  quantity: z.number().int().positive(),
});

export const createBookingSchema = z.object({
  eventId: z.string().uuid(),
  items: z.array(bookingItemSchema).min(1),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
