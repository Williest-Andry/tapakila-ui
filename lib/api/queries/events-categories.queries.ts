import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../client";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/event-categories");
      if (error) throw error;
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
