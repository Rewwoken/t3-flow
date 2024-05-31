'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useState } from 'react';
import { AUTH } from '@/constants/routes.constants';
import { THEMES } from '@/constants/themes.constants';
import type { IApiErrorResponse } from '@/types/services.types';

export default function Providers({ children }: PropsWithChildren) {
	const router = useRouter();
	const [queryClient] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
					// @ts-ignore | Axios is used for queries
					retry: (failureCount, error: IApiErrorResponse) => {
						if (failureCount === 1 && error.response?.status === 401) {
							router.push(AUTH.LOGIN);

							return false;
						}

						return true;
					},
				},
				mutations: {
					// @ts-ignore | Axios is used for mutations
					retry: (failureCount, error: IApiErrorResponse) => {
						if (failureCount === 1 && error.response?.status === 401) {
							router.push(AUTH.LOGIN);

							return false;
						}

						return true;
					},
				},
			},
		}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				attribute='class'
				defaultTheme={THEMES.SYSTEM}
				enableSystem={true}
			>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
