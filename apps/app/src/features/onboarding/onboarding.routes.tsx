import { RequireAuth } from "@/app/guard";
import Onboarding from "./pages/Onboarding";

export default [
  {
    path: "/onboarding",
    element: (
      <RequireAuth>
        <Onboarding />
      </RequireAuth>
    ),
  },
];
