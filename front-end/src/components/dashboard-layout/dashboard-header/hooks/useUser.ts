'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IGetUserResponse } from '@/types/user.service.types';

export function useUser() {
	const result = useQuery<IGetUserResponse, IApiErrorResponse>({
		queryKey: KEYS.USER_GET,
		queryFn: () => userService.getUser(),
	});

	return result;
}
