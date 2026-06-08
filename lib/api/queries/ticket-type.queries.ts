import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";
import { CreateTicketType } from "@/types/api.types";

export function useCreateTicketType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      eventId,
      body,
    }: {
      eventId: string;
      body: CreateTicketType;
    }) => {
      const { data, error } = await apiClient.POST(
        "/events/{eventId}/ticket-types",
        { params: { path: { eventId } }, body },
      );
      if (error) throw error;
      return data;
    },
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({
        queryKey: ["events", eventId, "ticket-types"],
      });
    },
  });
}
