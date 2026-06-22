import type { ProfileDraft } from "../types";

export interface StepProps {
  draft: ProfileDraft;
  patch: (partial: Partial<ProfileDraft>) => void;
}

/** Styling for native <select> elements to match the Input primitive. */
export const selectClass =
  "h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
