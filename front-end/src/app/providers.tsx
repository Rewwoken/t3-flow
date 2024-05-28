'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { type PropsWithChildren, useState } from 'react';
import { THEMES } from '@/constants/themes.constants';

export default function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(new QueryClient());

	return (
		<ThemeProvider attribute='class' defaultTheme={THEMES.SYSTEM} enableSystem={true}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
		</ThemeProvider>
	);
}
