import type { AppType } from "../../src/worker";
import { MOCK_ENV } from "../1.setup";
import { createDbConnectionWithClose } from "../../src/db";

// Create a global connection that gets reused and closed at the end
let globalDbConnection: ReturnType<typeof createDbConnectionWithClose> | null =
  null;

export function getDb() {
  if (!globalDbConnection) {
    globalDbConnection = createDbConnectionWithClose(
      process.env.DATABASE_URL as string
    );
  }
  return globalDbConnection.db;
}

export async function closeDbConnections() {
  if (globalDbConnection) {
    await globalDbConnection.close();
    globalDbConnection = null;
  }
}

export function getRequest(app: AppType, path: string) {
  return appRequest(app, path, "GET");
}

export function deleteRequest(app: AppType, path: string) {
  return appRequest(app, path, "DELETE");
}

export function appRequest(
  app: AppType,
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown
) {
  return app.request(
    path,
    {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: body ? { "Content-Type": "application/json" } : undefined,
    },
    MOCK_ENV
  );
}
