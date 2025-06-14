/// <reference types="vitest" />
import { createDbConnectionWithClose } from "../src/db";

import { loadEnv } from "vite";
import type { TestProject } from "vitest/node";
import { closeDbConnections } from "./helpers/connect";

const env = loadEnv("test", process.cwd(), "");
const databaseUrl = env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}
export const testUserId = "test_123";

export const MOCK_ENV = {
  CLERK_SECRET_KEY: env.CLERK_SECRET_KEY,
  DATABASE_URL: env.DATABASE_URL,
  OPENAI_API_KEY: env.OPENAI_API_KEY,
  CLERK_PUBLISHABLE_KEY: env.CLERK_PUBLISHABLE_KEY,
  VITE_CLERK_PUBLISHABLE_KEY: env.VITE_CLERK_PUBLISHABLE_KEY,
};

declare module "vitest" {
  export interface ProvidedContext {
    teamId: number;
  }
}

export async function setup(project: TestProject) {
  const { db, close } = createDbConnectionWithClose(databaseUrl);

  try {
    // TODO : Setup
  } finally {
    await close();
  }
}

export async function teardown(project: TestProject) {
  const { db, close } = createDbConnectionWithClose(databaseUrl);

  try {
    // TODO : Teardown
  } finally {
    await close();
    // Close all remaining test connections
    await closeDbConnections();
  }
}
