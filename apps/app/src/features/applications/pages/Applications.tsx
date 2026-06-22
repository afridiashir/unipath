import { FolderOpen } from "lucide-react";
import PagePlaceholder from "@/components/layout/PagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

const Applications = () => {
  usePageTitle("My Applications");
  return (
    <PagePlaceholder
      icon={FolderOpen}
      title="My Applications"
      description="Track your saved programs and their status."
    />
  );
};

export default Applications;
