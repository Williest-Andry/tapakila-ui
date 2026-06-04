import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { CreateBooking, EventsFilters } from "@/types/api.types";

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
      const { data, error } = await apiClient.GET("/events", {
        params: {
          query: {
            status: "PUBLISHED",
            limit: 100,
          },
        },
      });
      if (error) throw error;

      const events = Array.isArray(data) ? data : (data?.data ?? []);
      return events.find((event) => event.id === id) ?? null;
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

export function useCreateBooking(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateBooking) => {
      const { data, error } = await apiClient.POST("/bookings", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ["events", eventId, "ticket-types"],
      });
      void queryClient.invalidateQueries({ queryKey: ["events", eventId] });
      void queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
