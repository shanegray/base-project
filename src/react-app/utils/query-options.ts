import { queryOptions } from "@tanstack/react-query";
import { hc } from "hono/client";
import type { AppType } from "../../worker";

const client = hc<AppType>("http://localhost:5173");

async function fetchTestData() {
  console.log("fetching test data");
  const res = await client.api.test.$get();
  return res.json();
}

async function fetchInfo() {
  const res = await client.api.info.$get();
  return res.json();
}

export const testDataQueryOptions = () =>
  queryOptions({
    queryKey: ["test-data"],
    queryFn: () => fetchTestData(),
  });

export const infoQueryOptions = () =>
  queryOptions({
    queryKey: ["info"],
    queryFn: () => fetchInfo(),
    enabled: false,
  });
