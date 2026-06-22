import { Sparkles } from "lucide-react";
import PagePlaceholder from "@/components/layout/PagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

const Matcher = () => {
  usePageTitle("Program Matcher");
  return (
    <PagePlaceholder
      icon={Sparkles}
      title="AI Program Matcher"
      description="Personalized Masters programs based on your profile."
    />
  );
};

export default Matcher;
