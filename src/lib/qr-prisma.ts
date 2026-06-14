import { PrismaClient } from "@/generated/qr-client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForQR =
  globalThis as unknown as {
    qrPrisma?: PrismaClient;
  };

const pool = new Pool({
  connectionString:
    process.env.QR_DATABASE_URL,
});

const adapter =
  new PrismaPg(pool);

export const qrPrisma =
  globalForQR.qrPrisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForQR.qrPrisma =
    qrPrisma;
}