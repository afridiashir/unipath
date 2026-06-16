import { z } from "zod";

/**
 * Shared Zod schemas for the monorepo.
 *
 * Keep these as the single source of truth for runtime validation and
 * derive static types from them with `z.infer` so types and validators
 * never drift apart.
 */

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

/** Payload accepted when registering a new account. */
export const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export type Register = z.infer<typeof registerSchema>;

/** Payload accepted when logging in. */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type Login = z.infer<typeof loginSchema>;

/** Payload accepted when setting a password for the first time. */
export const addPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

/** Payload accepted when changing an existing password. */
export const newPasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export { z };
