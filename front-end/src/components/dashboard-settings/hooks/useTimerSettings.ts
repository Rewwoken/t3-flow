'use client';

import { useQuery } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IGetTimerSettingsResponse } from '@/types/timer.service.types';

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
	const result = useQuery<IGetTimerSettingsResponse, IApiErrorResponse>({
		queryKey: KEYS.GET_TIMER_SETTINGS,
		queryFn: () => timerService.getSettings(),
	});

	return result;
}
