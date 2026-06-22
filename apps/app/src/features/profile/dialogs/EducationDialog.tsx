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
import { emptyEducation, type EducationDraft } from "@/features/onboarding/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: EducationDraft;
  onSave: (item: EducationDraft) => void;
}

const EducationDialog = ({ open, onOpenChange, initial, onSave }: Props) => {
  const [form, setForm] = useState<EducationDraft>(
    initial ?? emptyEducation(),
  );

  useEffect(() => {
    if (open) setForm(initial ?? emptyEducation());
  }, [open, initial]);

  const set = (key: keyof EducationDraft, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    if (!form.institution.trim()) return;
    onSave(form);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initial ? "Edit education" : "Add education"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <FieldLabel className="mb-1.5">Institution</FieldLabel>
            <Input
              value={form.institution}
              onChange={(e) => set("institution", e.target.value)}
              placeholder="University of Toronto"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel className="mb-1.5">Degree</FieldLabel>
              <Input
                value={form.degree}
                onChange={(e) => set("degree", e.target.value)}
                placeholder="BSc"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Field of study</FieldLabel>
              <Input
                value={form.fieldOfStudy}
                onChange={(e) => set("fieldOfStudy", e.target.value)}
                placeholder="Computer Science"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <FieldLabel className="mb-1.5">CGPA</FieldLabel>
              <Input
                type="number"
                step="0.01"
                value={form.cgpa}
                onChange={(e) => set("cgpa", e.target.value)}
                placeholder="3.7"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Start year</FieldLabel>
              <Input
                type="number"
                value={form.startYear}
                onChange={(e) => set("startYear", e.target.value)}
                placeholder="2018"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Grad year</FieldLabel>
              <Input
                type="number"
                value={form.graduationYear}
                onChange={(e) => set("graduationYear", e.target.value)}
                placeholder="2022"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={submit} disabled={!form.institution.trim()}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EducationDialog;
