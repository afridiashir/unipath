import type { Response } from "express";
import { prisma } from "@repo/db";
import { profileInputSchema } from "@repo/schemas";
import type { AuthenticatedRequest } from "../../types/request.types.js";

const listOrder = { orderBy: { sortOrder: "asc" } } as const;

const profileInclude = {
  educations: listOrder,
  workExperiences: listOrder,
  activities: listOrder,
} as const;

/** GET /profile — the current user's profile with its dynamic lists. */
export const getProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user!.id },
      include: profileInclude,
    });
    // `profile` is null when onboarding hasn't been completed yet.
    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /profile — upsert the profile and replace its dynamic lists.
 *
 * The onboarding flow always submits the complete set of education / work /
 * activity rows, so each list is fully replaced inside a transaction rather
 * than diffed. Client-supplied row ids are ignored on write (the DB owns them).
 */
export const upsertProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const parsed = profileInputSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ errors: parsed.error.flatten() });
    }

    const userId = req.user!.id;
    const { educations, workExperiences, activities, ...scalars } = parsed.data;

    const profile = await prisma.$transaction(async (tx) => {
      const saved = await tx.profile.upsert({
        where: { userId },
        create: { userId, ...scalars },
        update: scalars,
      });

      await Promise.all([
        tx.education.deleteMany({ where: { profileId: saved.id } }),
        tx.workExperience.deleteMany({ where: { profileId: saved.id } }),
        tx.activity.deleteMany({ where: { profileId: saved.id } }),
      ]);

      if (educations.length) {
        await tx.education.createMany({
          data: educations.map(({ id: _id, ...e }) => ({
            ...e,
            profileId: saved.id,
          })),
        });
      }
      if (workExperiences.length) {
        await tx.workExperience.createMany({
          data: workExperiences.map(({ id: _id, ...w }) => ({
            ...w,
            profileId: saved.id,
          })),
        });
      }
      if (activities.length) {
        await tx.activity.createMany({
          data: activities.map(({ id: _id, ...a }) => ({
            ...a,
            profileId: saved.id,
          })),
        });
      }

      return tx.profile.findUnique({
        where: { id: saved.id },
        include: profileInclude,
      });
    });

    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
