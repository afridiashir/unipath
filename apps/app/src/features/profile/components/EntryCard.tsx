import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  subtitle?: string;
  lines?: string[];
  onEdit: () => void;
  onDelete: () => void;
}

const EntryCard = ({ title, subtitle, lines = [], onEdit, onDelete }: Props) => {
  return (
    <div className="group relative h-[150px] w-[260px] overflow-hidden rounded-xl border bg-background p-4">
      <div className="absolute right-2 top-2 flex gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onEdit}
          aria-label="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onDelete}
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5 text-destructive" />
        </Button>
      </div>

      <p className="line-clamp-2 pr-12 font-medium leading-tight">{title}</p>
      {subtitle && (
        <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
      <div className="mt-2 space-y-0.5">
        {lines.map((line, i) => (
          <p key={i} className="line-clamp-1 text-xs text-muted-foreground">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
};

export default EntryCard;
