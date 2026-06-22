import { MessageCircle } from "lucide-react";
import PagePlaceholder from "@/components/layout/PagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

const Counselor = () => {
  usePageTitle("AI Counselor");
  return (
    <PagePlaceholder
      icon={MessageCircle}
      title="AI Counselor"
      description="Ask about admissions, scholarships, budgets and more."
    />
  );
};

export default Counselor;
