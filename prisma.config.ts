import { loadEnvConfig } from "@next/env";
import { defineConfig, env } from "prisma/config";

// Load environment variables using Next.js conventions,
// including .env.local.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
