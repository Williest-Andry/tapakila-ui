import type { paths } from "@/lib/api/schema.d";

export type Event =
  paths["/events"]["get"]["responses"][200]["content"]["application/json"]["data"][number];

export type EventsFilters = paths["/events"]["get"]["parameters"]["query"];

export type User =
  paths["/auth/me"]["get"]["responses"][200]["content"]["application/json"];

export type RegisterUser = NonNullable<
  paths["/auth/register"]["post"]["requestBody"]
>["content"]["application/json"];

export type AuthUser =
  paths["/auth/login"]["post"]["responses"][200]["content"]["application/json"]["user"];

export type TicketType =
  paths["/events/{eventId}/ticket-types"]["get"]["responses"][200]["content"]["application/json"][number];

export type Booking =
  paths["/bookings"]["get"]["responses"][200]["content"]["application/json"]["data"][number];

export type Category =
  paths["/event-categories"]["get"]["responses"][200]["content"]["application/json"]["data"][number];

export type AuthTokens =
  paths["/auth/login"]["post"]["responses"][200]["content"]["application/json"];

export type PaginatedMeta =
  paths["/events"]["get"]["responses"][200]["content"]["application/json"]["meta"];

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};

export type CreateBooking = NonNullable<
  paths["/bookings"]["post"]["requestBody"]
>["content"]["application/json"];

export type BookingParams = paths["/bookings"]["get"]["parameters"]["query"];

export type UpdateMe = NonNullable<
  paths["/users/me"]["patch"]["requestBody"]
>["content"]["application/json"];
