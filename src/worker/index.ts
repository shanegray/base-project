import { Hono } from "hono";
import test from "./routes/test";
import info from "./routes/info";

const app = new Hono().basePath("/api");

const routes = app.route("/test", test).route("/info", info);

export default app;
export type AppType = typeof routes;
