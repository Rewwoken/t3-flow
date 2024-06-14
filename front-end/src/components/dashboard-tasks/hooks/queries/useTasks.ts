'use client';

import { useQuery } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IGetTasksResponse } from '@/types/task.service';

/**
 * @name useTasks
 * @description A hook that fetches tasks from the server.
 *
 * @returns {UseQueryResult} - An object with the result of the query.
 */
export function useTasks() {
	const result = useQuery<IGetTasksResponse, IApiErrorResponse>({
		queryKey: KEYS.GET_TASKS,
		queryFn: () => taskService.getAll(),
	});

	return result;
}
