import { create } from "zustand";
import type { AuthUser } from "@/services/firebase/authService";

interface AuthState {
  /** True until the first Firebase auth state event arrives */
  initializing: boolean;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  initializing: true,
  user: null,
  setUser: (user) => set({ user, initializing: false }),
}));
