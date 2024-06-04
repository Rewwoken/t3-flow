'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { IUpdateTaskData, IUpdateTaskResponse } from '@/types/task.service';

export function useUpdateTask(invalidate: boolean = false) {
	const queryClient = useQueryClient();

	const result = useMutation<
		IUpdateTaskResponse,
		IApiErrorResponse,
		IUpdateTaskData
	>({
		mutationKey: KEYS.UPDATE_TASK,
		mutationFn: ({ id, data }) => taskService.update(id, data),
		onSuccess: () => {
			if (invalidate) {
				queryClient.invalidateQueries({
					queryKey: KEYS.GET_TASKS,
				});
			}
		},
	});

	return result;
}
