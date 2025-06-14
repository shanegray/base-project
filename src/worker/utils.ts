import { Hono } from "hono";
import type { Bindings } from "./environment";
import type { getDb } from "@/db";

type RouterType = {
  Bindings: Bindings;
  Variables: Variables;
};

type Variables = {
  teamId: number;
  db: ReturnType<typeof getDb>;
};

export function createAuthRouter() {
  return new Hono<RouterType>();
}
