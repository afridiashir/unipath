import { Compass } from "lucide-react";
import PagePlaceholder from "@/components/layout/PagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

const Explorer = () => {
  usePageTitle("Explore");
  return (
    <PagePlaceholder
      icon={Compass}
      title="University Explorer"
      description="Search and filter universities and programs."
    />
  );
};

export default Explorer;
