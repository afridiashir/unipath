import { Plus, Trash2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldLabel } from "@/components/ui/field";
import { emptyWorkExperience, type WorkExperienceDraft } from "../types";
import type { StepProps } from "./shared";

const ExperienceStep = ({ draft, patch }: StepProps) => {
  const items = draft.workExperiences;

  const update = (
    index: number,
    key: keyof WorkExperienceDraft,
    value: string | boolean,
  ) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    patch({ workExperiences: next });
  };

  const add = () =>
    patch({ workExperiences: [...items, emptyWorkExperience()] });
  const remove = (index: number) =>
    patch({ workExperiences: items.filter((_, i) => i !== index) });

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          <Briefcase className="mx-auto mb-2 h-6 w-6" />
          No work experience yet. Add jobs or internships — optional, but it
          helps your matches.
        </div>
      )}

      {items.map((work, index) => (
        <div key={index} className="space-y-3 rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Experience {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(index)}
              aria-label="Remove experience"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel className="mb-1.5">Company</FieldLabel>
              <Input
                value={work.company}
                onChange={(e) => update(index, "company", e.target.value)}
                placeholder="Google"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Job title</FieldLabel>
              <Input
                value={work.jobTitle}
                onChange={(e) => update(index, "jobTitle", e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>

          <div>
            <FieldLabel className="mb-1.5">Industry</FieldLabel>
            <Input
              value={work.industry}
              onChange={(e) => update(index, "industry", e.target.value)}
              placeholder="Technology"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel className="mb-1.5">Start</FieldLabel>
              <Input
                type="month"
                value={work.startDate}
                onChange={(e) => update(index, "startDate", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">End</FieldLabel>
              <Input
                type="month"
                value={work.endDate}
                disabled={work.isCurrent}
                onChange={(e) => update(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={work.isCurrent}
              onChange={(e) => update(index, "isCurrent", e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            I currently work here
          </label>

          <div>
            <FieldLabel className="mb-1.5">Description</FieldLabel>
            <Textarea
              value={work.description}
              onChange={(e) => update(index, "description", e.target.value)}
              placeholder="What did you work on?"
            />
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="w-full">
        <Plus className="h-4 w-4" /> Add experience
      </Button>
    </div>
  );
};

export default ExperienceStep;
