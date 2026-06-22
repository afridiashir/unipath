import type { LucideIcon } from "lucide-react";

interface PagePlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** Temporary scaffold shown for feature routes that aren't built yet. */
const PagePlaceholder = ({
  icon: Icon,
  title,
  description,
}: PagePlaceholderProps) => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-1 text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <p className="font-medium">Coming soon</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          This section is scaffolded and ready to build out.
        </p>
      </div>
    </div>
  );
};

export default PagePlaceholder;
