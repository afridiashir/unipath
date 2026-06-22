import { Plus, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { emptyEducation, type EducationDraft } from "../types";
import type { StepProps } from "./shared";

const EducationStep = ({ draft, patch }: StepProps) => {
  const items = draft.educations;

  const update = (index: number, key: keyof EducationDraft, value: string) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    patch({ educations: next });
  };

  const add = () => patch({ educations: [...items, emptyEducation()] });
  const remove = (index: number) =>
    patch({ educations: items.filter((_, i) => i !== index) });

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          <GraduationCap className="mx-auto mb-2 h-6 w-6" />
          No education added yet. Add your degrees, starting with the most
          recent.
        </div>
      )}

      {items.map((edu, index) => (
        <div key={index} className="space-y-3 rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Education {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(index)}
              aria-label="Remove education"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div>
            <FieldLabel className="mb-1.5">Institution</FieldLabel>
            <Input
              value={edu.institution}
              onChange={(e) => update(index, "institution", e.target.value)}
              placeholder="University of Toronto"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel className="mb-1.5">Degree</FieldLabel>
              <Input
                value={edu.degree}
                onChange={(e) => update(index, "degree", e.target.value)}
                placeholder="BSc"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Field of study</FieldLabel>
              <Input
                value={edu.fieldOfStudy}
                onChange={(e) => update(index, "fieldOfStudy", e.target.value)}
                placeholder="Computer Science"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <FieldLabel className="mb-1.5">CGPA</FieldLabel>
              <Input
                type="number"
                step="0.01"
                value={edu.cgpa}
                onChange={(e) => update(index, "cgpa", e.target.value)}
                placeholder="3.7"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Start year</FieldLabel>
              <Input
                type="number"
                value={edu.startYear}
                onChange={(e) => update(index, "startYear", e.target.value)}
                placeholder="2018"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Graduation year</FieldLabel>
              <Input
                type="number"
                value={edu.graduationYear}
                onChange={(e) =>
                  update(index, "graduationYear", e.target.value)
                }
                placeholder="2022"
              />
            </div>
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="w-full">
        <Plus className="h-4 w-4" /> Add education
      </Button>
    </div>
  );
};

export default EducationStep;
