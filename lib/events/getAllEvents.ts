import { getApiUrl } from "@/lib/api/server";
import type { PaginatedResponse, Event } from "@/types/api.types";

export default async function getAllEvents(): Promise<Event[]> {
  const res = await fetch(
    getApiUrl("/events?status=PUBLISHED&sortBy=eventDate&sortOrder=asc&limit=20"),
    { next: { revalidate: 60 } },
  );

  if (!res.ok) throw new Error("Erreur lors du chargement des événements");

  const payload = (await res.json()) as PaginatedResponse<Event> | Event[];
  return Array.isArray(payload) ? payload : payload.data;
}
