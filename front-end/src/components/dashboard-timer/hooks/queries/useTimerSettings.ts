'use client';

import { useQuery } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import { IGetTimerSettingsResponse } from '@/types/timer.service.types';

/**
 * @name useTimerSettings
 * @description Custom hook to fetch timer settings.
 *
 * @returns {UseQueryResult} - The result of the query.
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
