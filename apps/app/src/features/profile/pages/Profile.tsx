import { useEffect, useState } from "react";
import { Loader2, Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useApi } from "@/hooks/use-api";

import {
  emptyDraft,
  type ProfileDraft,
  type EducationDraft,
  type WorkExperienceDraft,
  type ActivityDraft,
} from "@/features/onboarding/types";
import { buildPayload } from "@/features/onboarding/lib/buildPayload";

import { toDraft } from "../lib/mapProfile";
import SectionRow from "../components/SectionRow";
import AddCard from "../components/AddCard";
import EntryCard from "../components/EntryCard";
import EducationDialog from "../dialogs/EducationDialog";
import ExperienceDialog from "../dialogs/ExperienceDialog";
import ActivityDialog from "../dialogs/ActivityDialog";
import DetailsDialog, { type ProfileDetails } from "../dialogs/DetailsDialog";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** "YYYY-MM" → "Sep 2022". */
const fmtMonth = (value: string): string => {
  if (!value) return "";
  const [year, month] = value.split("-");
  const idx = Number(month) - 1;
  return MONTHS[idx] ? `${MONTHS[idx]} ${year}` : (year ?? "");
};

const dateRange = (start: string, end: string, current?: boolean): string => {
  const from = fmtMonth(start);
  const to = current ? "Present" : fmtMonth(end);
  if (from && to) return `${from} – ${to}`;
  return from || to || "";
};

const join = (parts: (string | undefined)[]): string =>
  parts.filter(Boolean).join(" · ");

interface DialogState {
  open: boolean;
  index: number | null;
}

const closed: DialogState = { open: false, index: null };

const Profile = () => {
  usePageTitle("Profile");
  const api = useApi();

  const [draft, setDraft] = useState<ProfileDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [eduDialog, setEduDialog] = useState<DialogState>(closed);
  const [workDialog, setWorkDialog] = useState<DialogState>(closed);
  const [actDialog, setActDialog] = useState<DialogState>(closed);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await api.get("/profile");
        if (active) setDraft(toDraft(res.data?.profile ?? null));
      } catch {
        if (active) {
          setDraft(emptyDraft());
          toast.error("Couldn't load your profile");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [api]);

  const persist = async (next: ProfileDraft) => {
    setDraft(next);
    setSaving(true);
    try {
      const res = await api.put("/profile", buildPayload(next));
      if (res.data?.profile) setDraft(toDraft(res.data.profile));
      toast.success("Saved");
    } catch {
      toast.error("Couldn't save changes");
    } finally {
      setSaving(false);
    }
  };

  const upsert = <T,>(list: T[], index: number | null, item: T): T[] => {
    if (index == null) return [...list, item];
    return list.map((existing, i) => (i === index ? item : existing));
  };

  if (loading || !draft) {
    return (
      <div className="flex h-full items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const d = draft;

  const saveEducation = (item: EducationDraft) =>
    persist({ ...d, educations: upsert(d.educations, eduDialog.index, item) });
  const saveWork = (item: WorkExperienceDraft) =>
    persist({
      ...d,
      workExperiences: upsert(d.workExperiences, workDialog.index, item),
    });
  const saveActivity = (item: ActivityDraft) =>
    persist({ ...d, activities: upsert(d.activities, actDialog.index, item) });
  const saveDetails = (details: ProfileDetails) =>
    persist({ ...d, ...details });

  const testScores = join([
    d.ielts && `IELTS ${d.ielts}`,
    d.toefl && `TOEFL ${d.toefl}`,
    d.gre && `GRE ${d.gre}`,
    d.gmat && `GMAT ${d.gmat}`,
  ]);

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Profile</h1>
          <p className="mt-1 text-muted-foreground">
            Keep this up to date for better program matches.
          </p>
        </div>
        {saving && (
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving
          </span>
        )}
      </div>

      {/* Overview */}
      <SectionRow
        title="Overview"
        action={
          <Button variant="outline" size="sm" onClick={() => setDetailsOpen(true)}>
            <Pencil className="h-3.5 w-3.5" /> Edit
          </Button>
        }
      >
        <div className="w-[260px] rounded-xl border bg-background p-4">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Location
          </p>
          <p className="mt-1 font-medium">{d.country || "—"}</p>
        </div>
        <div className="w-[260px] rounded-xl border bg-background p-4">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Test scores
          </p>
          <p className="mt-1 font-medium">{testScores || "—"}</p>
        </div>
        <div className="w-[260px] rounded-xl border bg-background p-4">
          <p className="text-xs font-medium uppercase text-muted-foreground">
            Preferences
          </p>
          <p className="mt-1 text-sm">
            {d.countriesOfInterest.length
              ? d.countriesOfInterest.join(", ")
              : "Any country"}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {d.budget ? `Budget $${d.budget}/yr` : "No budget set"}
            {d.intake ? ` · ${d.intake}` : ""}
          </p>
        </div>
      </SectionRow>

      {/* Education */}
      <SectionRow title="Education">
        {d.educations.map((edu, i) => (
          <EntryCard
            key={i}
            title={edu.institution}
            subtitle={join([edu.degree, edu.fieldOfStudy])}
            lines={[
              [edu.startYear, edu.graduationYear].filter(Boolean).join(" – "),
              edu.cgpa ? `CGPA ${edu.cgpa}` : "",
            ].filter(Boolean)}
            onEdit={() => setEduDialog({ open: true, index: i })}
            onDelete={() =>
              persist({
                ...d,
                educations: d.educations.filter((_, j) => j !== i),
              })
            }
          />
        ))}
        <AddCard
          label="Add education"
          onClick={() => setEduDialog({ open: true, index: null })}
        />
      </SectionRow>

      {/* Work experience */}
      <SectionRow title="Work experience">
        {d.workExperiences.map((work, i) => (
          <EntryCard
            key={i}
            title={work.company}
            subtitle={join([work.jobTitle, work.industry])}
            lines={[
              dateRange(work.startDate, work.endDate, work.isCurrent),
              work.description,
            ].filter(Boolean) as string[]}
            onEdit={() => setWorkDialog({ open: true, index: i })}
            onDelete={() =>
              persist({
                ...d,
                workExperiences: d.workExperiences.filter((_, j) => j !== i),
              })
            }
          />
        ))}
        <AddCard
          label="Add experience"
          onClick={() => setWorkDialog({ open: true, index: null })}
        />
      </SectionRow>

      {/* Activities */}
      <SectionRow title="Activities">
        {d.activities.map((act, i) => (
          <EntryCard
            key={i}
            title={act.title}
            subtitle={join([act.type, act.role, act.organization])}
            lines={[
              dateRange(act.startDate, act.endDate),
              act.description,
            ].filter(Boolean) as string[]}
            onEdit={() => setActDialog({ open: true, index: i })}
            onDelete={() =>
              persist({
                ...d,
                activities: d.activities.filter((_, j) => j !== i),
              })
            }
          />
        ))}
        <AddCard
          label="Add activity"
          onClick={() => setActDialog({ open: true, index: null })}
        />
      </SectionRow>

      {/* Dialogs */}
      <EducationDialog
        open={eduDialog.open}
        onOpenChange={(open) => setEduDialog((s) => ({ ...s, open }))}
        initial={
          eduDialog.index != null ? d.educations[eduDialog.index] : undefined
        }
        onSave={saveEducation}
      />
      <ExperienceDialog
        open={workDialog.open}
        onOpenChange={(open) => setWorkDialog((s) => ({ ...s, open }))}
        initial={
          workDialog.index != null
            ? d.workExperiences[workDialog.index]
            : undefined
        }
        onSave={saveWork}
      />
      <ActivityDialog
        open={actDialog.open}
        onOpenChange={(open) => setActDialog((s) => ({ ...s, open }))}
        initial={
          actDialog.index != null ? d.activities[actDialog.index] : undefined
        }
        onSave={saveActivity}
      />
      <DetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        initial={{
          country: d.country,
          ielts: d.ielts,
          toefl: d.toefl,
          gre: d.gre,
          gmat: d.gmat,
          countriesOfInterest: d.countriesOfInterest,
          intendedPrograms: d.intendedPrograms,
          budget: d.budget,
          scholarshipRequirement: d.scholarshipRequirement,
          intake: d.intake,
        }}
        onSave={saveDetails}
      />

      <Toaster position="top-right" />
    </div>
  );
};

export default Profile;
