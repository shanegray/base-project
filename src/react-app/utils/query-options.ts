import { queryOptions } from "@tanstack/react-query";

async function fetchTestData() {
  console.log("fetching test data");
  const res = await fetch("/api/test-data");
  return res.json();
}

export const testDataQueryOptions = () =>
  queryOptions({
    queryKey: ["test-data"],
    queryFn: () => fetchTestData(),
  });
