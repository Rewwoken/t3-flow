'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { ICreateTaskData } from '@/types/task.service';

interface IUseCreateTaskParams {
	invalidate: boolean;
}
export function useCreateTask(params?: IUseCreateTaskParams) {
	const queryClient = useQueryClient();

	const result = useMutation({
		mutationKey: KEYS.CREATE_TASK,
		mutationFn: (data: ICreateTaskData) => taskService.create(data),
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
