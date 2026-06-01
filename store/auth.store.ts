import { create } from "zustand";
import Cookies from "js-cookie";
import { AuthUser } from "@/types/api.types";

const COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: "strict" as const,
};

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: Cookies.get("accessToken") ?? null,
  refreshToken: Cookies.get("refreshToken") ?? null,

  setTokens: (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, COOKIE_OPTIONS);
    Cookies.set("refreshToken", refreshToken, COOKIE_OPTIONS);
    set({ accessToken, refreshToken });
  },

  setUser: (user) => set({ user }),

  logout: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({ user: null, accessToken: null, refreshToken: null });
  },

  isAuthenticated: () => !!get().accessToken,
}));
