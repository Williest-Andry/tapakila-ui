import { UpdateMe } from "@/types/api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../client";

export function useUpdateMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: UpdateMe) => {
      const { data, error } = await apiClient.PATCH("/users/me", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });
}
