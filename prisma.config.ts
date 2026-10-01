import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Не env("DATABASE_URL"): тот падает без переменной, а `prisma generate` (postinstall)
    // базу не трогает — сборка должна проходить и без БД (например, на Vercel до её подключения).
    url: process.env.DATABASE_URL ?? "",
  },
});
