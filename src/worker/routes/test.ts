import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.json({ name: "shane" }));

export default app;
