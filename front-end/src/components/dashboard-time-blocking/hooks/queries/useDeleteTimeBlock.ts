import { useMutation, useQueryClient } from '@tanstack/react-query';
import { timeBlockService } from '@/services/time-block.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';

export function useDeleteTimeBlock() {
	const queryClient = useQueryClient();

	const result = useMutation<void, IApiErrorResponse, string>({
		mutationKey: KEYS.TIME_BLOCK_DELETE,
		mutationFn: (id) => timeBlockService.deleteOne(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.TIME_BLOCK_GET,
			});
		},
	});

	return result;
}
