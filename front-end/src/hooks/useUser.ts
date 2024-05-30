'use client';

import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { userService } from '@/services/user.service';
import { QUERY_KEYS } from '@/constants/queryKeys.constants';
import { IApiErrorResponse, IGetUserResponse } from '@/types/services.types';

/**
 * Custom hook to fetch user information.
 *
 * This hook uses `useQuery` from `@tanstack/react-query` to fetch the user information
 * from the `userService`. It provides an interface to retrieve the user data and handle
 * loading, error, and success states.
 *
 * @returns - The result of the query.
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
	const result = useQuery<IGetUserResponse, AxiosError<IApiErrorResponse>>({
		queryKey: QUERY_KEYS.USER,
		queryFn: () => userService.getUser(),
	});

	return result;
}
