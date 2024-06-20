'use client';

import {
	ThemeProvider as MaterialThemeProvider,
	createTheme,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { AUTH } from '@/constants/routes.constants';
import { IApiErrorResponse } from '@/types/api.types';

const QueryProvider = ({ children }: React.PropsWithChildren) => {
	const router = useRouter();

	const client = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				// @ts-ignore | Axios is used for queries
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

	async function retry(failureCount: number, error: IApiErrorResponse) {
		if (failureCount === 0 && error.response?.status === 401) {
			return true;
		}

		if (error.response?.status === 401) {
			await authService.logout();

			router.push(AUTH.LOGIN);
		}

		return false;
	}

	const [queryClient] = React.useState(client);

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

const ThemesProvider = ({ children }: React.PropsWithChildren) => {
	return (
		<NextThemesProvider
			attribute='class'
			defaultTheme={'system'}
			enableSystem={true}
		>
			{children}
		</NextThemesProvider>
	);
};

const MaterialProvider = ({ children }: React.PropsWithChildren) => {
	const { theme: themeState } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

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
				default: 'rgba(var(--primary))',
			},
			text: {
				primary: 'rgba(var(--text))',
				secondary: 'rgba(var(--muted))',
			},
			error: {
				main: 'rgba(var(--danger))',
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
