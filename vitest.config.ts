import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
  // Load standard .env files
  const env = loadEnv(mode || "test", process.cwd(), "");

  console.log("DB:", env.DATABASE_URL);

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    test: {
      environment: "node",
      env: {
        ...env,
      },
      globalSetup: "./test/1.setup.ts",
    },
  };
});
