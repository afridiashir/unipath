import { Plus, Trash2, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldLabel } from "@/components/ui/field";
import { emptyActivity, type ActivityDraft } from "../types";
import { selectClass, type StepProps } from "./shared";

const TYPES = ["Volunteer", "Research", "Leadership", "Extracurricular", "Award"];

const ActivitiesStep = ({ draft, patch }: StepProps) => {
  const items = draft.activities;

  const update = (index: number, key: keyof ActivityDraft, value: string) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    patch({ activities: next });
  };

  const add = () => patch({ activities: [...items, emptyActivity()] });
  const remove = (index: number) =>
    patch({ activities: items.filter((_, i) => i !== index) });

  return (
    <div className="space-y-4">
      {items.length === 0 && (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          <Award className="mx-auto mb-2 h-6 w-6" />
          Add extracurriculars, volunteering, research or leadership roles.
        </div>
      )}

      {items.map((activity, index) => (
        <div key={index} className="space-y-3 rounded-lg border bg-white p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              Activity {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(index)}
              aria-label="Remove activity"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel className="mb-1.5">Title</FieldLabel>
              <Input
                value={activity.title}
                onChange={(e) => update(index, "title", e.target.value)}
                placeholder="Hackathon Lead"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Type</FieldLabel>
              <select
                value={activity.type}
                onChange={(e) => update(index, "type", e.target.value)}
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel className="mb-1.5">Role</FieldLabel>
              <Input
                value={activity.role}
                onChange={(e) => update(index, "role", e.target.value)}
                placeholder="Organizer"
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">Organization</FieldLabel>
              <Input
                value={activity.organization}
                onChange={(e) =>
                  update(index, "organization", e.target.value)
                }
                placeholder="IEEE Student Branch"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel className="mb-1.5">Start</FieldLabel>
              <Input
                type="month"
                value={activity.startDate}
                onChange={(e) => update(index, "startDate", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5">End</FieldLabel>
              <Input
                type="month"
                value={activity.endDate}
                onChange={(e) => update(index, "endDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <FieldLabel className="mb-1.5">Description</FieldLabel>
            <Textarea
              value={activity.description}
              onChange={(e) => update(index, "description", e.target.value)}
              placeholder="What did you do?"
            />
          </div>
        </div>
      ))}

      <Button type="button" variant="outline" onClick={add} className="w-full">
        <Plus className="h-4 w-4" /> Add activity
      </Button>
    </div>
  );
};

export default ActivitiesStep;
