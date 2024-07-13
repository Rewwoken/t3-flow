'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IGetProfileResponse } from '@/types/user.service.types';

export function useProfile() {
  const result = useQuery<IGetProfileResponse, IApiErrorResponse>({
    queryKey: KEYS.USER_GET_PROFILE,
    queryFn: () => userService.getProfile(),
  });

  return result;
}
