import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "../client";
import { useAuthStore } from "@/store/auth.store";

export function useLogin() {
  const { setTokens } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data, error } = await apiClient.POST("/auth/login", {
        body: credentials,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      router.push("/dashboard");
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    }) => {
      const { data, error } = await apiClient.POST("/auth/register", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: () => router.push("/login"),
  });
}

export function useMe() {
  const { isAuthenticated, setUser } = useAuthStore();

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/auth/me");
      if (error) throw error;
      setUser(data);
      return data;
    },
    enabled: isAuthenticated(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogout() {
  const { logout, refreshToken } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      if (!refreshToken) return;
      await apiClient.POST("/auth/logout", { body: { refreshToken } });
    },
    onSettled: () => {
      logout();
      router.push("/login");
    },
  });
}
