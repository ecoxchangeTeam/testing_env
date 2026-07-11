import "dotenv/config";
import { defineConfig } from "prisma/config";

const schema = process.env.PRISMA_SCHEMA ?? "prisma/schema.prisma";

export default defineConfig({
  schema,
  datasource: {
    url:
      schema === "prisma/qr-schema.prisma"
        ? process.env.QR_DIRECT_URL ?? process.env.QR_DATABASE_URL ?? ""
        : process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});