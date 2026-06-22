import { z } from "zod";
import { intakeSchema } from "./common.js";

/**
 * Catalog schemas (University + Program) — Features 2/3/4.
 *
 * The catalog is populated by the scraper and read by the API. `programInput`
 * is what the scraper validates a normalized record against before upserting;
 * records that fail land in the quarantine table.
 */

export const universitySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  country: z.string().min(1),
  city: z.string().nullable(),
  qsRanking: z.number().int().positive().nullable(),
  websiteUrl: z.string().url().nullable(),
  logoUrl: z.string().url().nullable(),
});

export type University = z.infer<typeof universitySchema>;

export const programSchema = z.object({
  id: z.string().uuid(),
  universityId: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  degreeType: z.string().nullable(),
  discipline: z.string().nullable(),

  durationMonths: z.number().int().positive().nullable(),
  intakes: z.array(intakeSchema).default([]),
  deadline: z.coerce.date().nullable(),

  tuitionAmount: z.number().int().nonnegative().nullable(),
  tuitionCurrency: z.string().nullable(),
  tuitionPeriod: z.string().nullable(),

  scholarshipsAvailable: z.boolean(),
  scholarshipsInfo: z.string().nullable(),

  overview: z.string().nullable(),
  admissionRequirements: z.string().nullable(),
  topEmployers: z.array(z.string()).default([]),

  minCgpa: z.number().min(0).max(10).nullable(),
  minIelts: z.number().min(0).max(9).nullable(),
  minToefl: z.number().int().min(0).max(120).nullable(),
  minGre: z.number().int().min(260).max(340).nullable(),
  minGmat: z.number().int().min(200).max(800).nullable(),
});

export type Program = z.infer<typeof programSchema>;

/**
 * Normalized record the scraper produces for a single program, validated
 * before upsert. Identifies its university by name (resolved/created on
 * upsert) rather than by id.
 */
export const programScrapeInputSchema = programSchema
  .omit({ id: true, universityId: true })
  .partial()
  .extend({
    universityName: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().min(1),
    sourceUrl: z.string().url().nullish(),
  });

export type ProgramScrapeInput = z.infer<typeof programScrapeInputSchema>;

/** Query params for the University Explorer (Feature 3). */
export const explorerQuerySchema = z.object({
  search: z.string().trim().optional(),
  country: z.string().optional(),
  discipline: z.string().optional(),
  tuitionMin: z.coerce.number().int().nonnegative().optional(),
  tuitionMax: z.coerce.number().int().nonnegative().optional(),
  scholarshipsOnly: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  pageSize: z.coerce.number().int().positive().max(100).default(20),
  sort: z.enum(["RANKING", "TUITION_LOW", "TUITION_HIGH", "DEADLINE"]).default("RANKING"),
});

export type ExplorerQuery = z.infer<typeof explorerQuerySchema>;
