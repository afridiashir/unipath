import { Input } from "@/components/ui/input";
import { FieldLabel } from "@/components/ui/field";
import type { StepProps } from "./shared";

const ScoresStep = ({ draft, patch }: StepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <FieldLabel className="mb-1.5">Country of residence</FieldLabel>
        <Input
          value={draft.country}
          onChange={(e) => patch({ country: e.target.value })}
          placeholder="Pakistan"
          className="bg-white"
        />
      </div>

      <p className="pt-2 text-sm font-medium">Test scores</p>
      <p className="-mt-2 text-sm text-muted-foreground">
        Leave blank any test you haven&rsquo;t taken yet.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel className="mb-1.5">IELTS</FieldLabel>
          <Input
            type="number"
            step="0.5"
            value={draft.ielts}
            onChange={(e) => patch({ ielts: e.target.value })}
            placeholder="7.5"
            className="bg-white"
          />
        </div>
        <div>
          <FieldLabel className="mb-1.5">TOEFL</FieldLabel>
          <Input
            type="number"
            value={draft.toefl}
            onChange={(e) => patch({ toefl: e.target.value })}
            placeholder="105"
            className="bg-white"
          />
        </div>
        <div>
          <FieldLabel className="mb-1.5">GRE</FieldLabel>
          <Input
            type="number"
            value={draft.gre}
            onChange={(e) => patch({ gre: e.target.value })}
            placeholder="320"
            className="bg-white"
          />
        </div>
        <div>
          <FieldLabel className="mb-1.5">GMAT</FieldLabel>
          <Input
            type="number"
            value={draft.gmat}
            onChange={(e) => patch({ gmat: e.target.value })}
            placeholder="700"
            className="bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ScoresStep;
