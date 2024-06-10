'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
	IUpdateTaskData,
	IUpdateTaskResponse,
} from '@/types/task.service';

interface IUseUpdateTaskParams {
	invalidate: boolean;
}
/**
 * A custom hook to update a task.
 *
 * @param params An object with an optional invalidate property.
 * The invalidate property is a boolean that, if set to true,
 * will invalidate the query cache for the GET_TASKS query after
 * the task is updated.
 *
 * @returns An object with the result of the mutation.
 */
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
			if (!params?.invalidate) {
				return null;
			}

			queryClient.invalidateQueries({
				queryKey: KEYS.GET_TASKS,
			});
		},
	});

	return result;
}
