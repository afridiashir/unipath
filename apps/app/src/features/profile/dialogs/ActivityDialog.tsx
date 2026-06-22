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
import { emptyActivity, type ActivityDraft } from "@/features/onboarding/types";
import { selectClass } from "@/features/onboarding/steps/shared";

const TYPES = ["Volunteer", "Research", "Leadership", "Extracurricular", "Award"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ActivityDraft;
  onSave: (item: ActivityDraft) => void;
}

const ActivityDialog = ({ open, onOpenChange, initial, onSave }: Props) => {
  const [form, setForm] = useState<ActivityDraft>(initial ?? emptyActivity());

  useEffect(() => {
    if (open) setForm(initial ?? emptyActivity());
  }, [open, initial]);

  const set = (key: keyof ActivityDraft, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    if (!form.title.trim()) return;
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit activity" : "Add activity"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel className="mb-1.5">Title</FieldLabel>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Hackathon Lead"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Type</FieldLabel>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className={selectClass}
              >
                <option value="">Select type</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel className="mb-1.5">Role</FieldLabel>
              <Input
                value={form.role}
                onChange={(e) => set("role", e.target.value)}
                placeholder="Organizer"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Organization</FieldLabel>
              <Input
                value={form.organization}
                onChange={(e) => set("organization", e.target.value)}
                placeholder="IEEE Student Branch"
              />
            </div>
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
                onChange={(e) => set("endDate", e.target.value)}
              />
            </div>
          </div>
          <div>
            <FieldLabel className="mb-1.5">Description</FieldLabel>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="What did you do?"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={submit} disabled={!form.title.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityDialog;
