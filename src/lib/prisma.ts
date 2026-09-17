import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// Ensure BigInt values (e.g. totalRamMb, availableRamMb) can be serialized to JSON safely
if (typeof BigInt !== "undefined" && !(BigInt.prototype as any).toJSON) {
  (BigInt.prototype as any).toJSON = function () {
    return Number(this);
  };
}

function createPrismaClient() {
  // Transaction pooler (port 6543) — required for Vercel serverless functions
  // Session pooler (port 5432) — only used by Prisma CLI (db push/migrate)
  const connectionString = process.env.DATABASE_URL;

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
