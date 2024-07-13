'use client';

import { useQuery } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import { IGetTimerSettingsResponse } from '@/types/timer.service.types';

export function useTimerSettings() {
  const result = useQuery<IGetTimerSettingsResponse, IApiErrorResponse>({
    queryKey: KEYS.TIMER_SETTINGS_GET,
    queryFn: () => timerService.getSettings(),
  });

  return result;
}
