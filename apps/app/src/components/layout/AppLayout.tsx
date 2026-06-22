import { Outlet } from "react-router-dom";
import { RequireAuth } from "@/app/guard";

const AppLayout = () => {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient from-blue-500 to-purple-500 text-foreground">
        <Outlet />
      </div>
    </RequireAuth>
  );
};

export default AppLayout;
