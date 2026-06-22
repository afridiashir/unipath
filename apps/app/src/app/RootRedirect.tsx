import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

const RootRedirect = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to="/home" replace />;
};

export default RootRedirect;
