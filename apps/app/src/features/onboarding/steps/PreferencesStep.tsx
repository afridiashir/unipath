import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import { TagInput } from "../components/TagInput";
import type { ScholarshipRequirement, Intake } from "../types";
import { selectClass, type StepProps } from "./shared";

const PreferencesStep = ({ draft, patch }: StepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel className="mb-1.5">Countries of interest</FieldLabel>
        <TagInput
          value={draft.countriesOfInterest}
          onChange={(v) => patch({ countriesOfInterest: v })}
          placeholder="Type a country and press Enter"
        />
      </div>

      <div>
        <FieldLabel className="mb-1.5">Intended programs</FieldLabel>
        <TagInput
          value={draft.intendedPrograms}
          onChange={(v) => patch({ intendedPrograms: v })}
          placeholder="e.g. MS Computer Science, MBA"
        />
      </div>

      <div>
        <FieldLabel className="mb-1.5">Annual budget (USD)</FieldLabel>
        <Input
          type="number"
          value={draft.budget}
          onChange={(e) => patch({ budget: e.target.value })}
          placeholder="40000"
          className="bg-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel className="mb-1.5">Scholarship requirement</FieldLabel>
          <select
            value={draft.scholarshipRequirement}
            onChange={(e) =>
              patch({
                scholarshipRequirement: e.target
                  .value as ScholarshipRequirement,
              })
            }
            className={selectClass}
          >
            <option value="REQUIRED">Required</option>
            <option value="PREFERRED">Preferred</option>
            <option value="NOT_NEEDED">Not needed</option>
          </select>
        </div>
        <div>
          <FieldLabel className="mb-1.5">Preferred intake</FieldLabel>
          <select
            value={draft.intake}
            onChange={(e) => patch({ intake: e.target.value as Intake })}
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
  );
};

export default PreferencesStep;
