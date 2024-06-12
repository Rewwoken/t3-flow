'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IDeleteTaskData } from '@/types/task.service';

/**
 * A custom hook to delete a task.
 *
 * @returns An object with the result of the mutation.
 */
export function useDeleteTask() {
	const queryClient = useQueryClient();

	const result = useMutation<void, IApiErrorResponse, IDeleteTaskData>({
		mutationKey: KEYS.DELETE_TASK,
		mutationFn: ({ id }) => taskService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: KEYS.GET_TASKS,
			});
		},
	});

	return result;
}
