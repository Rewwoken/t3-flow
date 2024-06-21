'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import { IGetTimerSessionResponse } from '@/types/timer.service.types';

export function useCreateTimerSession() {
	const queryClient = useQueryClient();

	const result = useMutation<IGetTimerSessionResponse, IApiErrorResponse>({
		mutationKey: KEYS.TIMER_SESSION_CREATE,
		mutationFn: () => timerService.createSession(),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.TIMER_SESSION_GET,
			});
		},
	});

	return result;
}
