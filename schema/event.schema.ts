import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title required").max(50, "Max 50 characters"),
  description: z.string().optional(),
  location: z.string().min(1, "Location required"),
  eventDate: z.string().min(1, "Date required"),
  categoryId: z.string().uuid("Select a category"),
});

export const createTicketTypeSchema = z.object({
  name: z.string().min(1, "Name required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  totalSeats: z.coerce.number().int().min(1, "At least 1 seat"),
  maxPerUser: z.coerce.number().int().min(1, "At least 1 per user").default(5),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type CreateTicketTypeInput = z.infer<typeof createTicketTypeSchema>;
