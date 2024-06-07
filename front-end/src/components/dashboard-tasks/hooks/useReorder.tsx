'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { IReorderData } from '@/types/task.service';

export function useReorder() {
	const result = useMutation<void, IApiErrorResponse, IReorderData>({
		mutationKey: KEYS.REORDER,
		mutationFn: (data) => taskService.reorder(data),
	});

	return result;
}
