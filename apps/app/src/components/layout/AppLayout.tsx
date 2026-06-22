import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, GraduationCap } from "lucide-react";
import { RequireAuth } from "@/app/guard";
import { Button } from "@/components/ui/button";
import AppSidebar from "./AppSidebar";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <RequireAuth>
      <div className="flex min-h-screen bg-gradient-to-br from-[#F4F5F6] to-[#E9ECEF] text-foreground">
        <AppSidebar
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />

        {/* Main area */}
        <main className="flex min-w-0 flex-1 flex-col p-3 md:py-4 md:pr-4 md:pl-0">
          {/* Mobile header */}
          <div className="mb-3 flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2 font-semibold">
              <GraduationCap className="h-5 w-5 text-primary" />
              UniPath
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* White rounded panel */}
          <div className="flex-1 overflow-auto rounded-2xl border bg-white p-6 shadow-sm md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default AppLayout;
