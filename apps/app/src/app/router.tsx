import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

import authRoutes from "@/features/auth/auth.routes";
import homeRoutes from "@/features/home/home.routes";
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
