import { apiClient } from "@/lib/api/client";
import { BookingParams, CreateBooking } from "@/types/api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCreateBooking(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateBooking) => {
      const { data, error } = await apiClient.POST("/bookings", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events", eventId, "ticket-types"],
      });
      queryClient.invalidateQueries({ queryKey: ["events", eventId] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useBookings(params?: BookingParams) {
  return useQuery({
    queryKey: ["bookings", params],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/bookings", {
        params: { query: params },
      });
      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingId: string) => {
      const { data, error } = await apiClient.PATCH("/bookings/{id}/cancel", {
        params: { path: { id: bookingId } },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
}

export function useMyBookings() {
  return useQuery({
    queryKey: ["bookings", "me"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/bookings/me");
      if (error) throw error;
      return data;
    },
    staleTime: 2 * 60 * 1000,
  });
}
