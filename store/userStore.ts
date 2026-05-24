import { create } from "zustand";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type User = any;

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
  }));