import { z } from "zod";
import { applicationStatusSchema, confidenceBandSchema } from "./common.js";

/**
 * My Applications (Feature 6) — saved programs and their status.
 */

/** Payload accepted when saving a program to My Applications. */
export const saveApplicationSchema = z.object({
  programId: z.string().uuid(),
  // Snapshots captured at save time (e.g. from the matcher card).
  confidenceBand: confidenceBandSchema.nullish(),
  whyRecommended: z.string().max(2000).nullish(),
});

export type SaveApplication = z.infer<typeof saveApplicationSchema>;

/** Payload accepted when updating a saved application's status. */
export const updateApplicationStatusSchema = z.object({
  status: applicationStatusSchema,
});

export type UpdateApplicationStatus = z.infer<
  typeof updateApplicationStatusSchema
>;

/** Sort options for the My Applications list. */
export const applicationSortSchema = z
  .enum(["EARLIEST_DEADLINE", "RECENTLY_ADDED"])
  .default("RECENTLY_ADDED");

export type ApplicationSort = z.infer<typeof applicationSortSchema>;
