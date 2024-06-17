'use client';

import { useQuery } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import { IGetTimerSessionResponse } from '@/types/timer.service.types';

export function useTimerSession() {
	const result = useQuery<IGetTimerSessionResponse, IApiErrorResponse>({
		queryKey: KEYS.GET_TIMER_SESSION,
		queryFn: () => timerService.getSession(),
	});

	return result;
}
