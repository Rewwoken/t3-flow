'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { ICreateTaskData } from '@/types/task.service';

interface IUseCreateTaskParams {
	invalidate: boolean;
}
/**
 * A custom hook to create a new task.
 *
 * @param params An object with an optional invalidate property.
 *   The invalidate property is a boolean that, if set to true,
 *   will invalidate the query cache for the GET_TASKS query after
 *   the task is created.
 *
 * @returns An object with the result of the mutation.
 */
export function useCreateTask(params?: IUseCreateTaskParams) {
	const queryClient = useQueryClient();

	const result = useMutation<
		ICreateTaskData,
		IApiErrorResponse,
		ICreateTaskData
	>({
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
