import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

// Load environment-specific variables
const env = process.env.NODE_ENV || "development";
const envFile = env === "test" ? ".env.test" : ".env.local";

config({ path: envFile });

const DATABASE_URL = process.env.DATABASE_URL || "";

// Use postgres driver for local connections, neon-serverless for remote
const isLocalPostgres =
  DATABASE_URL.includes("localhost") || DATABASE_URL.includes("127.0.0.1");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
