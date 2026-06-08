import { useAuthStore } from "@/store/auth.store";
import type {
  CreateEvent,
  EventsFilters,
  UpdateEventStatus,
} from "@/types/api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: CreateEvent) => {
      const { data, error } = await apiClient.POST("/events", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
    },
  });
}

export function useMyEvents() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["my-events", user?.id],
    queryFn: async () => {
      const params = user?.role === "ORGANIZER" ? { organizerId: user.id } : {};

      const { data, error } = await apiClient.GET("/events", {
        params: { query: params },
      });
      if (error) throw error;
      return data;
    },
    enabled: !!user && (user.role === "ORGANIZER" || user.role === "ADMIN"),
  });
}

export function useUpdateEventStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      eventId,
      status,
    }: {
      eventId: string;
      status: UpdateEventStatus;
    }) => {
      const { data, error } = await apiClient.PATCH("/events/{id}/status", {
        params: { path: { id: eventId } },
        body: { status },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
