import type { ProfileDraft } from "../types";

const num = (value: string): number | undefined => {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : undefined;
};

/** "YYYY-MM" (from <input type="month">) → ISO string, or undefined. */
const monthToIso = (value: string): string | undefined => {
  if (!value) return undefined;
  const date = new Date(`${value}-01T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
};

const text = (value: string): string | undefined => {
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

/**
 * Convert the form draft into the payload accepted by `profileInputSchema`
 * on the API. Empty list rows (missing their required field) are dropped and
 * each list is given a `sortOrder` from its position.
 */
export const buildPayload = (draft: ProfileDraft) => ({
  country: text(draft.country),

  ielts: num(draft.ielts),
  toefl: num(draft.toefl),
  gre: num(draft.gre),
  gmat: num(draft.gmat),

  countriesOfInterest: draft.countriesOfInterest,
  intendedPrograms: draft.intendedPrograms,
  budget: num(draft.budget),
  scholarshipRequirement: draft.scholarshipRequirement,
  intake: draft.intake || undefined,

  educations: draft.educations
    .filter((e) => e.institution.trim())
    .map((e, i) => ({
      ...(e.id ? { id: e.id } : {}),
      institution: e.institution.trim(),
      degree: text(e.degree),
      fieldOfStudy: text(e.fieldOfStudy),
      cgpa: num(e.cgpa),
      startYear: num(e.startYear),
      graduationYear: num(e.graduationYear),
      sortOrder: i,
    })),

  workExperiences: draft.workExperiences
    .filter((w) => w.company.trim())
    .map((w, i) => ({
      ...(w.id ? { id: w.id } : {}),
      company: w.company.trim(),
      jobTitle: text(w.jobTitle),
      industry: text(w.industry),
      startDate: monthToIso(w.startDate),
      endDate: w.isCurrent ? undefined : monthToIso(w.endDate),
      isCurrent: w.isCurrent,
      description: text(w.description),
      sortOrder: i,
    })),

  activities: draft.activities
    .filter((a) => a.title.trim())
    .map((a, i) => ({
      ...(a.id ? { id: a.id } : {}),
      title: a.title.trim(),
      role: text(a.role),
      organization: text(a.organization),
      type: text(a.type),
      startDate: monthToIso(a.startDate),
      endDate: monthToIso(a.endDate),
      description: text(a.description),
      sortOrder: i,
    })),
});
