import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RedirectIfAuth = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (user) {
    // Send through the root redirect so the onboarding gate can decide
    // whether to show onboarding or the home page.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuth;
