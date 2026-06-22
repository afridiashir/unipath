import { z } from "zod";
import { chatRoleSchema } from "./common.js";

/**
 * AI Counselor Chat (Feature 5).
 */

export const chatMessageSchema = z.object({
  id: z.string().uuid(),
  role: chatRoleSchema,
  content: z.string(),
  createdAt: z.date(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

/**
 * Payload accepted when the user sends a message. `currentPage` lets the
 * counselor be aware of where the user is in the app when answering.
 */
export const chatRequestSchema = z.object({
  message: z.string().min(1).max(4000),
  currentPage: z.string().max(255).optional(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
