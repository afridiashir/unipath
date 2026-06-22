import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

import authRoutes from "@/features/auth/auth.routes";
import homeRoutes from "@/features/home/home.routes";
import matcherRoutes from "@/features/matcher/matcher.routes";
import explorerRoutes from "@/features/explorer/explorer.routes";
import applicationsRoutes from "@/features/applications/applications.routes";
import profileRoutes from "@/features/profile/profile.routes";
import counselorRoutes from "@/features/counselor/counselor.routes";
import onboardingRoutes from "@/features/onboarding/onboarding.routes";
import RootRedirect from "@/app/RootRedirect";
import NotFound from "./NotFound";

export const router = createBrowserRouter([
  ...authRoutes,
  ...onboardingRoutes,
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <RootRedirect />,
      },
      ...homeRoutes,
      ...matcherRoutes,
      ...explorerRoutes,
      ...applicationsRoutes,
      ...profileRoutes,
      ...counselorRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
