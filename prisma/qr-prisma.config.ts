import "dotenv/config";
import { defineConfig } from "prisma/config";

console.log("QR_DATABASE_URL =", process.env.QR_DATABASE_URL);

export default defineConfig({
  schema: "./qr-schema.prisma",
  datasource: {
    url: process.env.QR_DATABASE_URL,
  },
});