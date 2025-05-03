import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  const auth = getAuth(c);

  return c.json({ name: "shane", auth: auth?.userId });
});

export default app;
