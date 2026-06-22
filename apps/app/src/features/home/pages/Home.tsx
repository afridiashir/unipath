import { Link } from "react-router-dom";
import { Sparkles, Compass, FolderOpen, UserRound } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { usePageTitle } from "@/hooks/usePageTitle";

const QUICK_LINKS = [
  {
    to: "/matcher",
    icon: Sparkles,
    title: "Program Matcher",
    body: "See Masters programs matched to your profile.",
  },
  {
    to: "/explorer",
    icon: Compass,
    title: "Explore",
    body: "Search universities and programs worldwide.",
  },
  {
    to: "/applications",
    icon: FolderOpen,
    title: "My Applications",
    body: "Track the programs you've saved.",
  },
  {
    to: "/profile",
    icon: UserRound,
    title: "Profile",
    body: "Review and update your details.",
  },
];

const Home = () => {
  usePageTitle("Dashboard");
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(" ")[0];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">
          Welcome back{firstName ? `, ${firstName}` : ""}
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&rsquo;s where you&rsquo;ll shape your study-abroad journey.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {QUICK_LINKS.map(({ to, icon: Icon, title, body }) => (
          <Link
            key={to}
            to={to}
            className="group rounded-xl border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
