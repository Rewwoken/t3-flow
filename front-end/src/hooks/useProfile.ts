'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

/**
 * Custom hook for fetching user profile.
 *
 * This hook uses `useQuery` from `@tanstack/react-query` to handle fetching.
 * It sends a request using the `userService.getProfile()`.
 *
 * @returns The result of the query.
 *
 * @example
 * const { data, isLoading } = useProfile();
 *
 * console.log('User email:', data?.profile.email);
 */
export function useProfile() {
	const result = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
	});

	return result;
}
