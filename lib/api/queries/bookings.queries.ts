import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import type { paths } from "@/lib/api/schema.d";

type CreateBookingBody = NonNullable<
  paths["/bookings"]["post"]["requestBody"]
>["content"]["application/json"];

type BookingsFilters = paths["/bookings"]["get"]["parameters"]["query"];

export function useBookings(params?: BookingsFilters) {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/bookings", {
        params: { query: params },
      });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateBookingBody) => {
      const { data, error } = await apiClient.POST("/bookings", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["bookings"] }),
        queryClient.invalidateQueries({ queryKey: ["events", variables.eventId] }),
        queryClient.invalidateQueries({
          queryKey: ["events", variables.eventId, "ticket-types"],
        }),
      ]);
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await apiClient.PATCH("/bookings/{id}/cancel", {
        params: { path: { id } },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}
