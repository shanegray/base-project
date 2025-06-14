import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import type { Bindings } from "../worker/environment";

type Database =
  | NeonHttpDatabase<typeof schema>
  | PostgresJsDatabase<typeof schema>;

// Create reusable database connection function
export const createDbConnection = (databaseUrl: string): Database => {
  // Use postgres-js for local connections, neon for remote
  const isLocalPostgres =
    databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  if (isLocalPostgres) {
    const sql = postgres(databaseUrl);
    return drizzlePostgres(sql, { schema });
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
};

// Create connection that can be closed for tests
export const createDbConnectionWithClose = (databaseUrl: string) => {
  const isLocalPostgres =
    databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  if (isLocalPostgres) {
    const sql = postgres(databaseUrl);
    const db = drizzlePostgres(sql, { schema });
    return {
      db,
      close: async () => await sql.end(),
    };
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });
  return {
    db,
    close: async () => {}, // Neon doesn't need explicit closing
  };
};

// Helper function to get database instance from Hono context
export const getDb = (env: Bindings) => createDbConnection(env.DATABASE_URL);
