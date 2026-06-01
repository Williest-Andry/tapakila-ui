import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "../client";
import { useAuthStore } from "@/store/auth.store";
import { RegisterUser } from "@/types/api.types";

export function useRegister() {
  const { setTokens, setUser } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: RegisterUser) => {
      const { data, error } = await apiClient.POST("/auth/register", { body });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
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
      setTokens(data.tokens.accessToken, data.tokens.refreshToken);
      setUser({
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: "USER",
      });
      const redirectTo =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("redirect")
          : null;
      router.push(redirectTo?.startsWith("/") ? redirectTo : "/events");
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
