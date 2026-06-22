import { GraduationCap, Sparkles, Clock } from "lucide-react";

const points = [
  {
    icon: Sparkles,
    title: "Personalized matches",
    body: "We use your profile to recommend Masters programs tuned to your goals.",
  },
  {
    icon: GraduationCap,
    title: "Tell us about you",
    body: "Education, experience, activities, test scores and preferences.",
  },
  {
    icon: Clock,
    title: "Takes about 3 minutes",
    body: "You can skip any step and finish it later from your profile.",
  },
];

const WelcomeStep = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Let&rsquo;s build your student profile. The more we know, the better the AI
        Program Matcher can shortlist the right universities for you.
      </p>
      <div className="space-y-4">
        {points.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeStep;
