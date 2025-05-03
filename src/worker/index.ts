import { Hono } from "hono";
const app = new Hono<{ Bindings: Env }>();

app.get("/api/test-data", (c) => c.json({ name: "Cloudflare" }));

export default app;
