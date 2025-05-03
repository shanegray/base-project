/// <reference types="node" />
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import test from "./routes/test";
import info from "./routes/info";

const app = new Hono().basePath("/api");

// unprotected
app.get("/ping", (c) => c.text("pong"));

// Only apply Clerk middleware if secret key is present
if (!process.env.CLERK_SECRET_KEY) {
  console.warn("⚠️ Clerk Secret Key not found. Authentication will not work.");
} else {
  app.use("*", clerkMiddleware());
}

// 401 if not authenticated below
app.use("*", async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return next();
});

const routes = app.route("/test", test).route("/info", info);

export default app;
export type AppType = typeof routes;
