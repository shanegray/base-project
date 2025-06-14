/// <reference types="node" />
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import sample from "./routes/sample";

import { createAuthRouter } from "./utils";

const app = createAuthRouter().basePath("/api");

// unprotected
app.get("/ping", (c) =>
  c.json({
    message: "pong",
    env: c.env.OPENAI_API_KEY,
    something: false,
  })
);

// Only apply Clerk middleware if secret key is present
app.use("*", async (c, next) => {
  if (!c.env.CLERK_SECRET_KEY) {
    console.warn(
      "⚠️ Clerk Secret Key not found. Authentication will not work."
    );
  } else {
    return clerkMiddleware()(c, next);
  }
  return next();
});

// 401 if not authenticated below for other routes
app.use("*", async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return next();
});

const routes = app.route("/sample", sample);

export default app;
export type RouteType = typeof routes;
export type AppType = typeof app;
