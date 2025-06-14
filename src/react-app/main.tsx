import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
	RouterProvider,
	ErrorComponent,
	createRouter,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Spinner } from "@/components/spinner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/clerk-react";

import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Tanstack Query
export const queryClient = new QueryClient();

// Create a new router instance
const router = createRouter({
	routeTree,
	defaultPendingComponent: () => (
		<div className={"p-2 text-2xl"}>
			<Spinner />
		</div>
	),
	defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
	context: {
		queryClient,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Auth
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Auth Key - needed to run CLERK");
}

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
					<ReactQueryDevtools />
				</QueryClientProvider>
			</ClerkProvider>
		</StrictMode>,
	);
}
