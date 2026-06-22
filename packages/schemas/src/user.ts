import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(255).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

/** Payload accepted when creating a user (server fills the rest). */
export const createUserSchema = userSchema.pick({
  email: true,
  name: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;

/** Partial update — every field is optional. */
export const updateUserSchema = createUserSchema.partial();

export type UpdateUser = z.infer<typeof updateUserSchema>;
