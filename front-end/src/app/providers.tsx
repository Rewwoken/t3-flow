'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: always make a new query client
		return makeQueryClient();
	} else {
		// Browser: make a new query client if we don't already have one
		// This is very important so we don't re-make a new client if React
		// suspends during the initial render.
		if (!browserQueryClient) {
			browserQueryClient = makeQueryClient();
		}

		return browserQueryClient;
	}
}

export default function Providers({ children }: React.PropsWithChildren) {
	const queryClient = getQueryClient();

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
