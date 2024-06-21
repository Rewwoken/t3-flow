import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IUpdateUserFields } from '@/types/settings.types';
import type { IGetUserResponse } from '@/types/user.service.types';

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const result = useMutation<
		IGetUserResponse,
		IApiErrorResponse,
		IUpdateUserFields
	>({
		mutationKey: KEYS.USER_UPDATE,
		mutationFn: (data) => userService.update(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.USER_GET,
			});
		},
	});

	return result;
}
