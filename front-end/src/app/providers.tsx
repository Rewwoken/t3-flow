'use client';

import {
	Backdrop,
	CircularProgress,
	ThemeProvider as MaterialThemeProvider,
	createTheme,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React from 'react';
import { authService } from '@/services/auth.service';
import { AUTH } from '@/constants/routes.constants';
import { IApiErrorResponse } from '@/types/api.types';

export const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
}); // Potential improvement: add different fonts

const QueryProvider = ({ children }: React.PropsWithChildren) => {
	const router = useRouter();

	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				// @ts-ignore | Ignore error type not assignable, because Axios is used for queries
				retry: (failureCount: number, error: IApiErrorResponse) => {
					if (failureCount === 0 && error.response?.status === 401) {
						return true;
					}

					if (error.response?.status === 401) {
						authService.logout();

						router.push(AUTH.LOGIN);
					}

					return false;
				},
			},
			mutations: {
				retry: 0,
			},
		},
	});

	const [queryClient] = React.useState(client);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

const ThemesProvider = ({ children }: React.PropsWithChildren) => {
	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme='light'
			storageKey='theme'
			enableSystem={false}
		>
			{children}
		</NextThemesProvider>
	);
};

const MaterialProvider = ({ children }: React.PropsWithChildren) => {
	const { theme: themeState } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => setMounted(true), []);

	if (!mounted)
		return (
			<Backdrop open={true}>
				<CircularProgress color='inherit' />
			</Backdrop>
		);

	const theme = createTheme({
		palette: {
			mode: themeState as 'light' | 'dark',
			primary: {
				main: 'rgba(var(--primary))',
			},
			secondary: {
				main: 'rgba(var(--secondary))',
			},
			background: {
				default: 'rgba(var(--background))',
			},
			text: {
				primary: 'rgba(var(--foreground))',
				secondary: 'rgba(var(--muted))',
			},
			error: {
				main: 'rgba(var(--danger))',
			},
			warning: {
				main: 'rgba(var(--danger))',
			},
		},
		typography: {
			allVariants: {
				fontFamily: inter.style.fontFamily,
			},
		},
	});

	return (
		<MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
	);
};

const DateAdapterProvider = ({ children }: React.PropsWithChildren) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			{children}
		</LocalizationProvider>
	);
};

export function Providers({ children }: React.PropsWithChildren) {
	return (
		<QueryProvider>
			<ThemesProvider>
				<MaterialProvider>
					<DateAdapterProvider>{children}</DateAdapterProvider>
				</MaterialProvider>
			</ThemesProvider>
		</QueryProvider>
	);
}
