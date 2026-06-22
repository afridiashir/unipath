import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useOnboardingStore } from "./onboarding.store";

export interface AuthUser {
  id?: string;
  name: string;
  email: string;
  token: string;
  avatar?: string;
  /** Whether the user has saved a profile (completed onboarding). */
  onboarded?: boolean;
}

interface AuthState {
  user: AuthUser | null;

  login: (user: AuthUser) => void;
  logout: () => void;

  updateUser: (data: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      login: (user) => set({ user }),

      logout: () => {
        set({ user: null });
        // Wipe every other store so nothing leaks into the next session.
        useOnboardingStore.getState().reset();
        useOnboardingStore.persist.clearStorage();
      },

      updateUser: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    },
  ),
);
