import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  FolderOpen,
  UserRound,
  MessageCircle,
  GraduationCap,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth.store";

const NAV_ITEMS = [
  { to: "/home", label: "Dashboard", icon: LayoutDashboard },
  { to: "/matcher", label: "Program Matcher", icon: Sparkles },
  { to: "/explorer", label: "Explore", icon: Compass },
  { to: "/applications", label: "My Applications", icon: FolderOpen },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/counselor", label: "AI Counselor", icon: MessageCircle },
];

interface AppSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const SidebarBody = ({ onNavigate }: { onNavigate?: () => void }) => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Brand */}
      <div className="flex items-center gap-2 px-2 pt-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <GraduationCap className="h-5 w-5" />
        </div>
        <span className="text-lg font-semibold">UniPath</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-white/60 hover:text-foreground",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="flex items-center gap-3 rounded-lg bg-white/60 p-2">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            {(user?.name ?? user?.email ?? "U").charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {user?.name ?? "Student"}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleLogout}
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const AppSidebar = ({ mobileOpen, onClose }: AppSidebarProps) => {
  return (
    <>
      {/* Desktop — transparent, sits on the page background */}
      <aside className="hidden w-64 shrink-0 p-4 md:block">
        <div className="sticky top-4 h-[calc(100vh-2rem)]">
          <SidebarBody />
        </div>
      </aside>

      {/* Mobile — slide-over drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#F4F5F6] p-4 shadow-xl">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-2 top-2"
            >
              <X className="h-4 w-4" />
            </Button>
            <SidebarBody onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
};

export default AppSidebar;
