import { CreateBooking } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";

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
