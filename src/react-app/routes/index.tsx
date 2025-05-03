import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { infoQueryOptions, testDataQueryOptions } from "../utils/query-options";
import { useSuspenseQuery, useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
	component: Index,
	loader: (opts) =>
		opts.context.queryClient.ensureQueryData(testDataQueryOptions()),
});

function Index() {
	const testDataQuery = useSuspenseQuery(testDataQueryOptions());
	const testData = testDataQuery.data;
	const infoQuery = useQuery(infoQueryOptions());

	return (
		<div className="p-2">
			<div>Call from Test: {testData.name}</div>
			<div>Call from Info: {JSON.stringify(infoQuery.data)}</div>
			<Button onClick={() => infoQuery.refetch()}>Call for information</Button>
		</div>
	);
}
