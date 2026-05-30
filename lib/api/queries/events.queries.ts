import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";
import { EventsFilters } from "@/types/api.types";

export function useEvents(params?: EventsFilters) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/events", {
        params: { query: params },
      });
      if (error) throw error;
      return data;
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/events/{id}" as any, {
        params: { path: { id } },
      });
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useTicketTypes(eventId: string) {
  return useQuery({
    queryKey: ["events", eventId, "ticket-types"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET(
        "/events/{eventId}/ticket-types",
        { params: { path: { eventId } } },
      );
      if (error) throw error;
      return data;
    },
    enabled: !!eventId,
  });
}
