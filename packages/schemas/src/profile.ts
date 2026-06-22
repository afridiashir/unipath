import { z } from "zod";
import { intakeSchema, scholarshipRequirementSchema } from "./common.js";

/**
 * Student Profile (Feature 1).
 *
 * Singular facts live on the profile; education, work experience, and
 * activities are dynamic lists the form can add/remove rows from. Each list
 * item's `id` is optional — present when editing an existing row, absent when
 * the row was just added on the client.
 */

const currentYear = new Date().getFullYear();

export const educationInputSchema = z.object({
  id: z.string().uuid().optional(),
  institution: z.string().min(1).max(255),
  degree: z.string().max(255).nullish(),
  fieldOfStudy: z.string().max(255).nullish(),
  cgpa: z.number().min(0).max(10).nullish(),
  startYear: z
    .number()
    .int()
    .min(1950)
    .max(currentYear + 10)
    .nullish(),
  graduationYear: z
    .number()
    .int()
    .min(1950)
    .max(currentYear + 10)
    .nullish(),
  sortOrder: z.number().int().min(0).default(0),
});

export type EducationInput = z.infer<typeof educationInputSchema>;

export const workExperienceInputSchema = z.object({
  id: z.string().uuid().optional(),
  company: z.string().min(1).max(255),
  jobTitle: z.string().max(255).nullish(),
  industry: z.string().max(255).nullish(),
  startDate: z.coerce.date().nullish(),
  endDate: z.coerce.date().nullish(),
  isCurrent: z.boolean().default(false),
  description: z.string().max(2000).nullish(),
  sortOrder: z.number().int().min(0).default(0),
});

export type WorkExperienceInput = z.infer<typeof workExperienceInputSchema>;

export const activityInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(255),
  role: z.string().max(255).nullish(),
  organization: z.string().max(255).nullish(),
  type: z.string().max(255).nullish(),
  startDate: z.coerce.date().nullish(),
  endDate: z.coerce.date().nullish(),
  description: z.string().max(2000).nullish(),
  sortOrder: z.number().int().min(0).default(0),
});

export type ActivityInput = z.infer<typeof activityInputSchema>;

/** Full payload accepted when saving the profile (upsert of profile + lists). */
export const profileInputSchema = z.object({
  // Personal
  country: z.string().max(255).nullish(),

  // Standardized test scores
  ielts: z.number().min(0).max(9).nullish(),
  toefl: z.number().int().min(0).max(120).nullish(),
  gre: z.number().int().min(260).max(340).nullish(),
  gmat: z.number().int().min(200).max(800).nullish(),

  // Preferences
  countriesOfInterest: z.array(z.string().min(1)).default([]),
  intendedPrograms: z.array(z.string().min(1)).default([]),
  budget: z.number().int().min(0).nullish(),
  scholarshipRequirement: scholarshipRequirementSchema.default("PREFERRED"),
  intake: intakeSchema.nullish(),

  // Dynamic lists
  educations: z.array(educationInputSchema).default([]),
  workExperiences: z.array(workExperienceInputSchema).default([]),
  activities: z.array(activityInputSchema).default([]),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
