'use client';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { timerService } from '@/services/timer.service';
import { QUERY_KEYS } from '@/constants/queryKeys.constants';
import {
	IApiErrorResponse,
	IGetTimerSettingsResponse,
} from '@/types/services.types';

/**
 * Custom hook to fetch timer settings.
 *
 * This hook uses `useQuery` from `@tanstack/react-query` to fetch timer settings
 * from the `timerService`. It provides an interface to retrieve the timer settings
 * and handle loading, error, and success states.
 *
 * @returns - The result of the query.
 *
 * @example
 * const { data, error, isLoading } = useTimerSettings();
 *
 * if (isLoading) {
 *   console.log('Loading timer settings...');
 * }
 *
 * if (error) {
 *   console.error('Error fetching timer settings:', error);
 * }
 *
 * if (data) {
 *   console.log('Timer settings:', data);
 * }
 */
export function useTimerSettings() {
	const result = useQuery<
		IGetTimerSettingsResponse,
		AxiosError<IApiErrorResponse>
	>({
		queryKey: QUERY_KEYS.TIMER_SETTINGS,
		queryFn: () => timerService.getSettings(),
	});

	return result;
}
