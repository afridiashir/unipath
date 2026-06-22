import { useAuthStore } from "@/stores/auth.store";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const RedirectIfAuth = ({ children }: Props) => {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default RedirectIfAuth;
