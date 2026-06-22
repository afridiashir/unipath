import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  usePageTitle("Home");
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">Welcome to UniPath</h1>
      <p className="text-muted-foreground">
        Signed in as {user?.name ?? user?.email}
      </p>
      <Button variant="outline" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default Home;
