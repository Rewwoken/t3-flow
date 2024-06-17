import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IUpdateTimerSettingsFields } from '@/types/settings.types';
import type { IGetTimerSettingsResponse } from '@/types/timer.service.types';

export function useUpdateTimerSettings() {
	const queryClient = useQueryClient();

	const result = useMutation<
		IGetTimerSettingsResponse,
		IApiErrorResponse,
		IUpdateTimerSettingsFields
	>({
		mutationKey: KEYS.UPDATE_SETTINGS,
		mutationFn: (data) => timerService.updateSettings(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.GET_TIMER_SETTINGS,
			});
		},
	});

	return result;
}
