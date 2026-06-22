import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, GraduationCap, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useApi } from "@/hooks/use-api";
import { useAuthStore } from "@/stores/auth.store";
import { useOnboardingStore } from "@/stores/onboarding.store";

import { emptyDraft, type ProfileDraft } from "../types";
import { buildPayload } from "../lib/buildPayload";
import type { StepProps } from "../steps/shared";

import WelcomeStep from "../steps/WelcomeStep";
import EducationStep from "../steps/EducationStep";
import ExperienceStep from "../steps/ExperienceStep";
import ActivitiesStep from "../steps/ActivitiesStep";
import ScoresStep from "../steps/ScoresStep";
import PreferencesStep from "../steps/PreferencesStep";
import FounderStep from "../steps/FounderStep";

interface StepConfig {
  key: string;
  title: string;
  description: string;
  Component: (props: StepProps) => React.ReactNode;
  skippable: boolean;
  cta?: string;
}

const STEPS: StepConfig[] = [
  {
    key: "welcome",
    title: "Welcome to UniPath",
    description: "Let's set up your student profile.",
    Component: WelcomeStep,
    skippable: false,
    cta: "Get started",
  },
  {
    key: "education",
    title: "Education",
    description: "Add the degrees you've earned or are pursuing.",
    Component: EducationStep,
    skippable: true,
  },
  {
    key: "experience",
    title: "Work experience",
    description: "Jobs and internships strengthen your profile.",
    Component: ExperienceStep,
    skippable: true,
  },
  {
    key: "activities",
    title: "Activities",
    description: "Extracurriculars, volunteering, research and leadership.",
    Component: ActivitiesStep,
    skippable: true,
  },
  {
    key: "scores",
    title: "Location & test scores",
    description: "Where you're based and any standardized tests.",
    Component: ScoresStep,
    skippable: true,
  },
  {
    key: "preferences",
    title: "Preferences",
    description: "Tell us what you're looking for.",
    Component: PreferencesStep,
    skippable: true,
  },
  {
    key: "founder",
    title: "A note from our founder",
    description: "",
    Component: FounderStep,
    skippable: false,
    cta: "Finish & see my matches",
  },
];

const Onboarding = () => {
  usePageTitle("Onboarding");
  const navigate = useNavigate();
  const api = useApi();

  const savedDraft = useOnboardingStore((s) => s.draft);
  const saveDraft = useOnboardingStore((s) => s.saveDraft);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<ProfileDraft>(
    () => savedDraft ?? emptyDraft(),
  );
  const [submitting, setSubmitting] = useState(false);

  const step = STEPS[stepIndex]!;
  const isFinal = stepIndex === STEPS.length - 1;
  const progress = useMemo(
    () => Math.round(((stepIndex + 1) / STEPS.length) * 100),
    [stepIndex],
  );

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stepIndex]);

  const patch = (partial: Partial<ProfileDraft>) =>
    setDraft((prev) => ({ ...prev, ...partial }));

  const goNext = () => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
  const goBack = () => setStepIndex((i) => Math.max(0, i - 1));

  const skipAll = () => {
    // Keep the draft locally so it can be resumed; the user remains
    // un-onboarded and will be prompted again next time they sign in.
    saveDraft(draft);
    navigate("/home");
  };

  const finish = async () => {
    setSubmitting(true);
    saveDraft(draft);
    try {
      await api.put("/profile", buildPayload(draft));
      updateUser({ onboarded: true });
      toast.success("Profile saved");
      navigate("/home");
    } catch {
      toast.error("Couldn't save your profile. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const StepComponent = step.Component;

  return (
    <div className="min-h-screen bg-[#F3F3F3] px-4 py-8">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            UniPath
          </div>
          {!isFinal && (
            <Button variant="ghost" size="sm" onClick={skipAll}>
              Skip for now
            </Button>
          )}
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Step {stepIndex + 1} of {STEPS.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step card */}
        <div className="rounded-xl border bg-background p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">{step.title}</h1>
          {step.description && (
            <p className="mt-1 text-muted-foreground">{step.description}</p>
          )}

          <div className="mt-6">
            <StepComponent draft={draft} patch={patch} />
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={goBack}
            disabled={stepIndex === 0 || submitting}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          <div className="flex items-center gap-2">
            {step.skippable && (
              <Button variant="ghost" onClick={goNext} disabled={submitting}>
                Skip
              </Button>
            )}
            {isFinal ? (
              <Button onClick={finish} disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving
                  </>
                ) : (
                  <>{step.cta}</>
                )}
              </Button>
            ) : (
              <Button onClick={goNext} disabled={submitting}>
                {step.cta ?? "Continue"} <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
};

export default Onboarding;
