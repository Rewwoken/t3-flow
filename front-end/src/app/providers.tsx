'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AUTH } from '@/constants/routes.constants';
import { IApiErrorResponse } from '@/types/api.types';

export default function Providers({ children }: React.PropsWithChildren) {
	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				// @ts-ignore | Axios is used for queries
				retry,
			},
			mutations: {
				// @ts-ignore | Axios is used for queries
				retry,
			},
		},
	});

	const router = useRouter();

	function retry(failureCount: number, error: IApiErrorResponse) {
		if (failureCount === 0 && error.response?.status === 401) {
			return true;
		}

		if (error.response?.status === 401) {
			router.push(AUTH.LOGIN);
		}

		return false;
	}

	const [queryClient] = React.useState(client);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme={'system'}
				enableSystem={true}
			>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
