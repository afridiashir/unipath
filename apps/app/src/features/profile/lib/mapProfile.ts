import {
  emptyDraft,
  type ProfileDraft,
  type ScholarshipRequirement,
  type Intake,
} from "@/features/onboarding/types";

/** Shape of a profile as returned by `GET /profile`. */
export interface ApiEducation {
  id: string;
  institution: string;
  degree: string | null;
  fieldOfStudy: string | null;
  cgpa: number | null;
  startYear: number | null;
  graduationYear: number | null;
}

export interface ApiWorkExperience {
  id: string;
  company: string;
  jobTitle: string | null;
  industry: string | null;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string | null;
}

export interface ApiActivity {
  id: string;
  title: string;
  role: string | null;
  organization: string | null;
  type: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
}

export interface ApiProfile {
  id: string;
  country: string | null;
  ielts: number | null;
  toefl: number | null;
  gre: number | null;
  gmat: number | null;
  countriesOfInterest: string[];
  intendedPrograms: string[];
  budget: number | null;
  scholarshipRequirement: ScholarshipRequirement;
  intake: Intake | null;
  educations: ApiEducation[];
  workExperiences: ApiWorkExperience[];
  activities: ApiActivity[];
}

const str = (value: number | null): string => (value == null ? "" : String(value));
const txt = (value: string | null): string => value ?? "";
/** ISO timestamp → "YYYY-MM" for <input type="month">. */
const month = (iso: string | null): string => (iso ? iso.slice(0, 7) : "");

/** Convert an API profile into the editable form draft. */
export const toDraft = (profile: ApiProfile | null): ProfileDraft => {
  if (!profile) return emptyDraft();

  return {
    country: txt(profile.country),
    ielts: str(profile.ielts),
    toefl: str(profile.toefl),
    gre: str(profile.gre),
    gmat: str(profile.gmat),
    countriesOfInterest: profile.countriesOfInterest ?? [],
    intendedPrograms: profile.intendedPrograms ?? [],
    budget: str(profile.budget),
    scholarshipRequirement: profile.scholarshipRequirement ?? "PREFERRED",
    intake: profile.intake ?? "",
    educations: profile.educations.map((e) => ({
      id: e.id,
      institution: e.institution,
      degree: txt(e.degree),
      fieldOfStudy: txt(e.fieldOfStudy),
      cgpa: str(e.cgpa),
      startYear: str(e.startYear),
      graduationYear: str(e.graduationYear),
    })),
    workExperiences: profile.workExperiences.map((w) => ({
      id: w.id,
      company: w.company,
      jobTitle: txt(w.jobTitle),
      industry: txt(w.industry),
      startDate: month(w.startDate),
      endDate: month(w.endDate),
      isCurrent: w.isCurrent,
      description: txt(w.description),
    })),
    activities: profile.activities.map((a) => ({
      id: a.id,
      title: a.title,
      role: txt(a.role),
      organization: txt(a.organization),
      type: txt(a.type),
      startDate: month(a.startDate),
      endDate: month(a.endDate),
      description: txt(a.description),
    })),
  };
};
