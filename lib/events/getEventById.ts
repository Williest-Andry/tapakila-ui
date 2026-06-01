import { getApiUrl } from "@/lib/api/server";
import type { Event } from "@/types/api.types";

export default async function getEventById(id: string): Promise<Event> {
  const res = await fetch(getApiUrl(`/events/${id}`), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Erreur lors du chargement de l'événement");

  return res.json();
}
