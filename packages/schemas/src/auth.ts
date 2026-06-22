import { z } from "zod";

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

/** Payload accepted when signing in with Google (implicit-flow access token). */
export const googleAuthSchema = z.object({
  token: z.string().min(1),
});

export type GoogleAuth = z.infer<typeof googleAuthSchema>;

/** Payload accepted when setting a password for the first time. */
export const addPasswordSchema = z.object({
  newPassword: z.string().min(8),
});

export type AddPassword = z.infer<typeof addPasswordSchema>;

/** Payload accepted when changing an existing password. */
export const newPasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export type NewPassword = z.infer<typeof newPasswordSchema>;
