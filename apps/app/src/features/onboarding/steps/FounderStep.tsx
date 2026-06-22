import { useAuthStore } from "@/stores/auth.store";

const FounderStep = () => {
  const user = useAuthStore((s) => s.user);
  const firstName = user?.name?.split(" ")[0];

  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-white p-6">
        <p className="leading-relaxed text-foreground">
          {firstName ? `${firstName}, ` : ""}thank you for trusting UniPath with
          your study-abroad journey.
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          I started UniPath because I believe a student&rsquo;s ambition should
          never be limited by not knowing where to apply or how. We built this
          to give every applicant the kind of guidance that used to be reserved
          for a lucky few — an AI counselor in your corner, a matcher that
          understands your story, and a clear path from &ldquo;I want to study
          abroad&rdquo; to &ldquo;I got in.&rdquo;
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Your profile is the starting point. The more honest and complete it
          is, the better we can fight for the right programs for you. This is
          just the beginning — let&rsquo;s get you there.
        </p>
        <div className="mt-6">
          <p className="font-semibold">The UniPath Founder</p>
          <p className="text-sm text-muted-foreground">Founder &amp; CEO</p>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Ready when you are — your personalized matches are next.
      </p>
    </div>
  );
};

export default FounderStep;
