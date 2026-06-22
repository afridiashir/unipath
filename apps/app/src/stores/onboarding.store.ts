import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ProfileDraft } from "@/features/onboarding/types";

interface OnboardingState {
  /** The last saved draft, so an interrupted onboarding can be resumed. */
  draft: ProfileDraft | null;

  saveDraft: (draft: ProfileDraft) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      draft: null,

      saveDraft: (draft) => set({ draft }),
      reset: () => set({ draft: null }),
    }),
    {
      name: "onboarding-storage",
    },
  ),
);
