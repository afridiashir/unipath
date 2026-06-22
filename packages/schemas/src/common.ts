import { z } from "zod";

/**
 * Enum schemas shared across the data layer.
 *
 * These are the runtime source of truth — the Prisma enums in @repo/db mirror
 * these exact string values. Use `<schema>.options` to drive dropdowns on the
 * client so the UI can never drift from the allowed values.
 */

export const intakeSchema = z.enum(["FALL", "SPRING", "SUMMER", "WINTER"]);
export type Intake = z.infer<typeof intakeSchema>;

export const scholarshipRequirementSchema = z.enum([
  "REQUIRED",
  "PREFERRED",
  "NOT_NEEDED",
]);
export type ScholarshipRequirement = z.infer<
  typeof scholarshipRequirementSchema
>;

export const confidenceBandSchema = z.enum([
  "DREAM",
  "COMPETITIVE",
  "STRONG_MATCH",
  "SAFE_CHOICE",
]);
export type ConfidenceBand = z.infer<typeof confidenceBandSchema>;

export const applicationStatusSchema = z.enum([
  "INTERESTED",
  "APPLYING",
  "SUBMITTED",
  "ACCEPTED",
  "REJECTED",
]);
export type ApplicationStatus = z.infer<typeof applicationStatusSchema>;

export const chatRoleSchema = z.enum(["USER", "ASSISTANT"]);
export type ChatRole = z.infer<typeof chatRoleSchema>;

export const scrapeStatusSchema = z.enum(["RUNNING", "SUCCESS", "FAILED"]);
export type ScrapeStatus = z.infer<typeof scrapeStatusSchema>;

export { z };
