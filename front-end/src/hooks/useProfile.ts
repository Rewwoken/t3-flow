'use client';

import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

export function useProfile() {
	const result = useQuery({
		queryKey: ['user', 'profile'],
		queryFn: () => userService.getProfile(),
	});

	return result;
}
