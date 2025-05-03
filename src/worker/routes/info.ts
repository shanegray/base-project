import { Hono } from "hono";

const app = new Hono().get("/", (c) => c.json({ info: false }));

export default app;
