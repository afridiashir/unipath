import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { TagInput } from "@/features/onboarding/components/TagInput";
import { selectClass } from "@/features/onboarding/steps/shared";
import type {
  ProfileDraft,
  ScholarshipRequirement,
  Intake,
} from "@/features/onboarding/types";

export type ProfileDetails = Pick<
  ProfileDraft,
  | "country"
  | "ielts"
  | "toefl"
  | "gre"
  | "gmat"
  | "countriesOfInterest"
  | "intendedPrograms"
  | "budget"
  | "scholarshipRequirement"
  | "intake"
>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial: ProfileDetails;
  onSave: (details: ProfileDetails) => void;
}

const DetailsDialog = ({ open, onOpenChange, initial, onSave }: Props) => {
  const [form, setForm] = useState<ProfileDetails>(initial);

  useEffect(() => {
    if (open) setForm(initial);
  }, [open, initial]);

  const set = <K extends keyof ProfileDetails>(
    key: K,
    value: ProfileDetails[K],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <FieldLabel className="mb-1.5">Country of residence</FieldLabel>
            <Input
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              placeholder="Pakistan"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div>
              <FieldLabel className="mb-1.5">IELTS</FieldLabel>
              <Input
                type="number"
                step="0.5"
                value={form.ielts}
                onChange={(e) => set("ielts", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">TOEFL</FieldLabel>
              <Input
                type="number"
                value={form.toefl}
                onChange={(e) => set("toefl", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">GRE</FieldLabel>
              <Input
                type="number"
                value={form.gre}
                onChange={(e) => set("gre", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">GMAT</FieldLabel>
              <Input
                type="number"
                value={form.gmat}
                onChange={(e) => set("gmat", e.target.value)}
              />
            </div>
          </div>

          <div>
            <FieldLabel className="mb-1.5">Countries of interest</FieldLabel>
            <TagInput
              value={form.countriesOfInterest}
              onChange={(v) => set("countriesOfInterest", v)}
              placeholder="Type a country and press Enter"
            />
          </div>

          <div>
            <FieldLabel className="mb-1.5">Intended programs</FieldLabel>
            <TagInput
              value={form.intendedPrograms}
              onChange={(v) => set("intendedPrograms", v)}
              placeholder="e.g. MS Computer Science"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <FieldLabel className="mb-1.5">Budget (USD/yr)</FieldLabel>
              <Input
                type="number"
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                placeholder="40000"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Scholarship</FieldLabel>
              <select
                value={form.scholarshipRequirement}
                onChange={(e) =>
                  set(
                    "scholarshipRequirement",
                    e.target.value as ScholarshipRequirement,
                  )
                }
                className={selectClass}
              >
                <option value="REQUIRED">Required</option>
                <option value="PREFERRED">Preferred</option>
                <option value="NOT_NEEDED">Not needed</option>
              </select>
            </div>
            <div>
              <FieldLabel className="mb-1.5">Intake</FieldLabel>
              <select
                value={form.intake}
                onChange={(e) => set("intake", e.target.value as Intake)}
                className={selectClass}
              >
                <option value="">No preference</option>
                <option value="FALL">Fall</option>
                <option value="SPRING">Spring</option>
                <option value="SUMMER">Summer</option>
                <option value="WINTER">Winter</option>
              </select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={submit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
