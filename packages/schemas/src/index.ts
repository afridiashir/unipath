/**
 * Shared Zod schemas for the monorepo.
 *
 * These are the single source of truth for runtime validation; static types
 * are derived with `z.infer` so types and validators never drift apart. Each
 * domain lives in its own file and is re-exported here as the public surface.
 */

export * from "./common.js";
export * from "./user.js";
export * from "./auth.js";
export * from "./profile.js";
export * from "./catalog.js";
export * from "./application.js";
export * from "./chat.js";
