'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { IUpdateTaskData, IUpdateTaskResponse } from '@/types/task.service';

interface IUseUpdateTaskParams {
	invalidate: boolean;
}
export function useUpdateTask(params?: IUseUpdateTaskParams) {
	const queryClient = useQueryClient();

	const result = useMutation<
		IUpdateTaskResponse,
		IApiErrorResponse,
		IUpdateTaskData
	>({
		mutationKey: KEYS.UPDATE_TASK,
		mutationFn: ({ id, data }) => taskService.update(id, data),
		onSuccess: () => {
			if (params?.invalidate) {
				queryClient.invalidateQueries({
					queryKey: KEYS.GET_TASKS,
				});
			}
		},
	});

	return result;
}
