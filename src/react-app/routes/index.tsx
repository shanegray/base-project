import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { testDataQueryOptions } from "../utils/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
	component: Index,
	loader: (opts) =>
		opts.context.queryClient.ensureQueryData(testDataQueryOptions()),
});

function Index() {
	const testDataQuery = useSuspenseQuery(testDataQueryOptions());
	const testData = testDataQuery.data;

	return (
		<div className="p-2">
			<div>Call from Server: {testData.name}</div>
			<Button onClick={() => testDataQuery.refetch()}>
				Click here to call server
			</Button>
		</div>
	);
}
