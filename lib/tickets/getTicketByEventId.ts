import { getApiUrl } from "@/lib/api/server";
import type { TicketType } from "@/types/api.types";

export default async function getTicketByEventId(
  eventId: string,
): Promise<TicketType[]> {
  const res = await fetch(getApiUrl(`/events/${eventId}/ticket-types`), {
    next: { revalidate: 30 },
  });

  if (!res.ok) throw new Error("Erreur lors du chargement des billets");

  return res.json();
}
