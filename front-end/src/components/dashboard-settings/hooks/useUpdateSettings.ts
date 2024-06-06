'use client';

import { useMutation } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { userService } from '@/services/user.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
	IUpdateSettingsFields,
	IUpdateSettingsResponse,
} from '@/types/settings.types';

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
		IApiErrorResponse,
		IUpdateSettingsFields
	>({
		mutationKey: KEYS.UPDATE_SETTINGS,
		mutationFn: async (data) => {
			const timer = await timerService.updateSettings(data.timer);
			const user = await userService.update(data.user);

			return { user, timer };
		},
		onSuccess,
	});

	return result;
}
