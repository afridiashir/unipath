import type { ProfileDraft } from "@/features/onboarding/types";

export interface CompletionItem {
  label: string;
  done: boolean;
  /** Route to jump to so the user can fill this in. */
  to: string;
}

export interface ProfileCompletion {
  /** 0–100, rounded. */
  percent: number;
  completed: number;
  total: number;
  items: CompletionItem[];
}

/**
 * Derive a profile-completion checklist + percentage from the form draft.
 *
 * Each item is weighted equally. A list section (education / work / activities)
 * counts as done once it has at least one entry.
 */
export const computeCompletion = (draft: ProfileDraft): ProfileCompletion => {
  const items: CompletionItem[] = [
    {
      label: "Add your location",
      done: Boolean(draft.country),
      to: "/profile",
    },
    {
      label: "Add a test score",
      done: Boolean(draft.ielts || draft.toefl || draft.gre || draft.gmat),
      to: "/profile",
    },
    {
      label: "Pick countries of interest",
      done: draft.countriesOfInterest.length > 0,
      to: "/profile",
    },
    {
      label: "Pick intended programs",
      done: draft.intendedPrograms.length > 0,
      to: "/profile",
    },
    {
      label: "Set a budget",
      done: Boolean(draft.budget),
      to: "/profile",
    },
    {
      label: "Choose an intake",
      done: Boolean(draft.intake),
      to: "/profile",
    },
    {
      label: "Add education",
      done: draft.educations.length > 0,
      to: "/profile",
    },
    {
      label: "Add work experience",
      done: draft.workExperiences.length > 0,
      to: "/profile",
    },
    {
      label: "Add an activity",
      done: draft.activities.length > 0,
      to: "/profile",
    },
  ];

  const completed = items.filter((i) => i.done).length;
  const total = items.length;
  const percent = Math.round((completed / total) * 100);

  return { percent, completed, total, items };
};
