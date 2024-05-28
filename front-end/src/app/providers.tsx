'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { type PropsWithChildren, useState } from 'react';
import { THEMES } from '@/constants/themes.constants';

export default function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute='class' defaultTheme={THEMES.SYSTEM} enableSystem={true}>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
