'use client';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { timerService } from '@/services/timer.service';
import { userService } from '@/services/user.service';
import { QUERY_KEYS } from '@/constants/queryKeys.constants';
import type {
	IApiErrorResponse,
	IUpdateSettings,
	IUpdateSettingsResponse,
} from '@/types/services.types';

/**
 * Custom hook to update settings for both timer and user.
 *
 * This hook uses `useMutation` from `@tanstack/react-query` to handle the mutation
 * process for updating timer settings and user settings. It calls the respective
 * services and handles the success callback if provided.
 *
 * @param {Function} [onSuccess] - Optional callback function to be called on successful update.
 * @returns - The result of the mutation.
 *
 * @example
 * const { mutate, isLoading, error } = useUpdateSettings(() => {
 *   console.log('Settings updated successfully');
 * });
 *
 * // To trigger the mutation
 * mutate({ timer: { ... }, user: { ... } });
 */
export function useUpdateSettings(onSuccess?: () => void) {
	const result = useMutation<
		IUpdateSettingsResponse,
		AxiosError<IApiErrorResponse>,
		IUpdateSettings
	>({
		mutationKey: QUERY_KEYS.MUTATE_SETTINGS,
		mutationFn: async (data) => {
			const timer = await timerService.updateSettings(data.timer);
			const user = await userService.update(data.user);

			return { user, timer };
		},
		onSuccess,
	});

	return result;
}
