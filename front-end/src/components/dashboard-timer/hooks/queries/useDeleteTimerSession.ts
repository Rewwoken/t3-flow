'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';

export function useDeleteTimerSession() {
	const queryClient = useQueryClient();

	const result = useMutation<void, IApiErrorResponse>({
		mutationKey: KEYS.DELETE_TIMER_SESSION,
		mutationFn: () => timerService.deleteSession(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.GET_TIMER_SESSION,
			});
		},
	});

	return result;
}
