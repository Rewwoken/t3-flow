'use client';

import { DefinedInitialDataOptions, useQuery } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import { IGetTimerSessionResponse } from '@/types/timer.service.types';

interface IUseTimerSessionParams
  extends DefinedInitialDataOptions<
    IGetTimerSessionResponse,
    IApiErrorResponse
  > {}
export function useTimerSession(params?: IUseTimerSessionParams) {
  const result = useQuery<IGetTimerSessionResponse, IApiErrorResponse>({
    queryKey: KEYS.TIMER_SESSION_GET,
    queryFn: () => timerService.getSession(),
    ...params,
  });

  return result;
}
