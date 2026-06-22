/**
 * Form-side draft types for the onboarding wizard.
 *
 * Numeric / date fields are kept as strings here because they are bound to
 * controlled inputs; they are parsed into their real types in `buildPayload`
 * when the profile is submitted.
 */

export interface EducationDraft {
  id?: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  cgpa: string;
  startYear: string;
  graduationYear: string;
}

export interface WorkExperienceDraft {
  id?: string;
  company: string;
  jobTitle: string;
  industry: string;
  startDate: string; // "YYYY-MM"
  endDate: string; // "YYYY-MM"
  isCurrent: boolean;
  description: string;
}

export interface ActivityDraft {
  id?: string;
  title: string;
  role: string;
  organization: string;
  type: string;
  startDate: string; // "YYYY-MM"
  endDate: string; // "YYYY-MM"
  description: string;
}

export type ScholarshipRequirement = "REQUIRED" | "PREFERRED" | "NOT_NEEDED";
export type Intake = "" | "FALL" | "SPRING" | "SUMMER" | "WINTER";

export interface ProfileDraft {
  country: string;

  ielts: string;
  toefl: string;
  gre: string;
  gmat: string;

  countriesOfInterest: string[];
  intendedPrograms: string[];
  budget: string;
  scholarshipRequirement: ScholarshipRequirement;
  intake: Intake;

  educations: EducationDraft[];
  workExperiences: WorkExperienceDraft[];
  activities: ActivityDraft[];
}

export const emptyEducation = (): EducationDraft => ({
  institution: "",
  degree: "",
  fieldOfStudy: "",
  cgpa: "",
  startYear: "",
  graduationYear: "",
});

export const emptyWorkExperience = (): WorkExperienceDraft => ({
  company: "",
  jobTitle: "",
  industry: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
});

export const emptyActivity = (): ActivityDraft => ({
  title: "",
  role: "",
  organization: "",
  type: "",
  startDate: "",
  endDate: "",
  description: "",
});

export const emptyDraft = (): ProfileDraft => ({
  country: "",
  ielts: "",
  toefl: "",
  gre: "",
  gmat: "",
  countriesOfInterest: [],
  intendedPrograms: [],
  budget: "",
  scholarshipRequirement: "PREFERRED",
  intake: "",
  educations: [],
  workExperiences: [],
  activities: [],
});
