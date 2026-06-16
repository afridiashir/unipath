import { PrismaClient } from "@prisma/client";

/**
 * A single PrismaClient instance shared across the app.
 *
 * In development the module can be re-evaluated on hot reload, which would
 * otherwise spawn a new client (and connection pool) every time. Caching the
 * instance on `globalThis` prevents exhausting database connections.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export * from "@prisma/client";
