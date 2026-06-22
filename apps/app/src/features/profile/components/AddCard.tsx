import { Plus } from "lucide-react";

interface Props {
  label: string;
  onClick: () => void;
}

const AddCard = ({ label, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[150px] w-[260px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/40 hover:text-foreground"
    >
      <Plus className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default AddCard;
