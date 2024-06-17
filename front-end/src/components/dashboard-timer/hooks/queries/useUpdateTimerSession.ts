'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import {
	IGetTimerSessionResponse,
	IUpdateTimerSession,
} from '@/types/timer.service.types';

export function useUpdateTimerSession() {
	const queryClient = useQueryClient();

	const result = useMutation<
		IGetTimerSessionResponse,
		IApiErrorResponse,
		IUpdateTimerSession
	>({
		mutationKey: KEYS.UPDATE_TIMER_SESSION,
		mutationFn: (data) => timerService.updateSession(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.GET_TIMER_SESSION,
			});
		},
	});

	return result;
}
