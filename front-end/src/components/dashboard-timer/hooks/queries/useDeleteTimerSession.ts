'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timerService } from '@/services/timer.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';

export function useDeleteTimerSession() {
  const queryClient = useQueryClient();

  const result = useMutation<void, IApiErrorResponse>({
    mutationKey: KEYS.TIMER_SETTINGS_DELETE,
    mutationFn: () => timerService.deleteSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: KEYS.TIMER_SESSION_GET,
      });
    },
  });

  return result;
}
