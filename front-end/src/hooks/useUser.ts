'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IGetUserResponse } from '@/types/user.service.types';

/**
 * @name useUser
 * @description Custom hook to fetch user information.
 *
 * @returns {UseQueryResult} - The result of the query.
 *
 * @example
 * const { data, error, isLoading } = useUser();
 *
 * if (isLoading) {
 *   console.log('Loading user information...');
 * }
 *
 * if (error) {
 *   console.error('Error fetching user information:', error);
 * }
 *
 * if (data) {
 *   console.log('User information:', data);
 * }
 */
export function useUser() {
	const result = useQuery<IGetUserResponse, IApiErrorResponse>({
		queryKey: KEYS.USER_GET,
		queryFn: () => userService.getUser(),
	});

	return result;
}
