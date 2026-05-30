import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";

export function useEvents(params?: {
  search?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/events", {
        params: { query: params },
      });
      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000,
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
