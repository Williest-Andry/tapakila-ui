import { useAuthStore } from "@/store/auth.store";
import { RegisterUser } from "@/types/api.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "../client";

export function useRegister() {
  const { setTokens, setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: RegisterUser) => {
      const { data, error } = await apiClient.POST("/auth/register", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: "USER",
      });
      router.push("/events");
    },
  });
}

export function useLogin() {
  const { setTokens, setUser } = useAuthStore();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: "USER",
      });
      router.push("/events");
    },
  });
}

export function useMe() {
  const { isAuthenticated, setUser } = useAuthStore();
  const authenticated = isAuthenticated();

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data, error } = await apiClient.GET("/auth/me");
      if (error) throw error;
      setUser(data);
      return data;
    },
    enabled: authenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useLogout() {
  const { logout, refreshToken } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      if (!refreshToken) return;
      await apiClient.POST("/auth/logout", { body: { refreshToken } });
    },
    onSettled: () => {
      queryClient.clear();
      logout();
      router.push("/login");
    },
  });
}
