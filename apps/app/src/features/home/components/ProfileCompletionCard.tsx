import { Link } from "react-router-dom";
import { Check, Loader2 } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth.store";
import type { ProfileCompletion } from "@/features/profile/lib/completion";

interface Props {
  completion: ProfileCompletion | null;
  loading: boolean;
}

/** First letters of the first and last name, e.g. "Ada Lovelace" → "AL". */
const initials = (name?: string): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase() || "?";
};

// Ring geometry.
const SIZE = 140;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const AVATAR = SIZE - STROKE * 4;

const ProfileCompletionCard = ({ completion, loading }: Props) => {
  const user = useAuthStore((s) => s.user);
  const percent = completion?.percent ?? 0;
  const offset = CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border bg-background p-6 sm:flex-row sm:items-center sm:gap-8">
      {/* Avatar + progress ring */}
      {loading || !completion ? (
        <div
          className="flex shrink-0 items-center justify-center text-muted-foreground"
          style={{ height: SIZE, width: SIZE }}
        >
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="flex shrink-0 flex-col items-center gap-2">
          <div
            className="group relative"
            style={{ height: SIZE, width: SIZE }}
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Profile ${percent}% complete`}
          >
            <svg
              className="absolute inset-0 -rotate-90"
              width={SIZE}
              height={SIZE}
              viewBox={`0 0 ${SIZE} ${SIZE}`}
            >
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={STROKE}
                className="stroke-muted"
              />
              <circle
                cx={SIZE / 2}
                cy={SIZE / 2}
                r={RADIUS}
                fill="none"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={offset}
                className="stroke-primary transition-[stroke-dashoffset] duration-500"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="relative cursor-default"
                style={{ height: AVATAR, width: AVATAR }}
              >
                <Avatar style={{ height: AVATAR, width: AVATAR }}>
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                    {initials(user?.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Percentage overlay — appears on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="text-2xl font-bold leading-none">
                    {percent}%
                  </span>
                  <span className="mt-1 text-xs text-white/80">complete</span>
                </div>
              </div>
            </div>
          </div>
          <p className="font-medium">{user?.name || "Your profile"}</p>
        </div>
      )}

      {/* Checklist as rows */}
      {!loading && completion && (
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-medium">Profile completion</p>
            <span className="text-sm text-muted-foreground">
              {percent === 100
                ? "Complete 🎉"
                : `${completion.completed} of ${completion.total} done`}
            </span>
          </div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {completion.items.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2.5 rounded-lg border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <span
                    className={
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border " +
                      (item.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-muted-foreground/30 text-transparent")
                    }
                  >
                    <Check className="h-3 w-3" />
                  </span>
                  <span
                    className={
                      item.done
                        ? "truncate text-muted-foreground line-through"
                        : "truncate text-foreground"
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileCompletionCard;
