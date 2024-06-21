import { useMutation } from '@tanstack/react-query';
import { timeBlockService } from '@/services/time-block.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
	ICreateTimeBlockData,
	ICreateTimeBlockResponse,
} from '@/types/time-block.service.types';

export function useCreateTimeBlock() {
	const result = useMutation<
		ICreateTimeBlockResponse,
		IApiErrorResponse,
		ICreateTimeBlockData
	>({
		mutationKey: KEYS.TIME_BLOCK_CREATE,
		mutationFn: (data) => timeBlockService.createOne(data),
	});

	return result;
}
