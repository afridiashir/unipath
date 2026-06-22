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
import { Textarea } from "@/components/ui/textarea";
import { FieldLabel } from "@/components/ui/field";
import {
  emptyWorkExperience,
  type WorkExperienceDraft,
} from "@/features/onboarding/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: WorkExperienceDraft;
  onSave: (item: WorkExperienceDraft) => void;
}

const ExperienceDialog = ({ open, onOpenChange, initial, onSave }: Props) => {
  const [form, setForm] = useState<WorkExperienceDraft>(
    initial ?? emptyWorkExperience(),
  );

  useEffect(() => {
    if (open) setForm(initial ?? emptyWorkExperience());
  }, [open, initial]);

  const set = (
    key: keyof WorkExperienceDraft,
    value: string | boolean,
  ) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    if (!form.company.trim()) return;
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initial ? "Edit experience" : "Add experience"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel className="mb-1.5">Company</FieldLabel>
              <Input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Google"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Job title</FieldLabel>
              <Input
                value={form.jobTitle}
                onChange={(e) => set("jobTitle", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>
          <div>
            <FieldLabel className="mb-1.5">Industry</FieldLabel>
            <Input
              value={form.industry}
              onChange={(e) => set("industry", e.target.value)}
              placeholder="Technology"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel className="mb-1.5">Start</FieldLabel>
              <Input
                type="month"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">End</FieldLabel>
              <Input
                type="month"
                value={form.endDate}
                disabled={form.isCurrent}
                onChange={(e) => set("endDate", e.target.value)}
              />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={form.isCurrent}
              onChange={(e) => set("isCurrent", e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            I currently work here
          </label>
          <div>
            <FieldLabel className="mb-1.5">Description</FieldLabel>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="What did you work on?"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={submit} disabled={!form.company.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceDialog;
