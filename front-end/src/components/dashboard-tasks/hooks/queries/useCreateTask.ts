'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { taskService } from '@/services/task.service';
import { genRank } from '@/utils/genRank';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
	ICreateTaskData,
	ICreateTaskDataResponse,
} from '@/types/task.service';

interface IUseCreateTaskParams {
	invalidate: boolean;
}
/**
 * @name useCreateTask
 * @description A custom hook to create a new task.
 *
 * @param {IUseCreateTaskParams} params - An object with an optional invalidate property.
 * The invalidate property is a boolean that, if set to true,
 * will invalidate the query cache for the GET_TASKS query after
 * the task is created.
 *
 * @returns {UseMutationResult} - An object with the result of the mutation.
 */
export function useCreateTask(params?: IUseCreateTaskParams) {
	const queryClient = useQueryClient();

	const result = useMutation<
		ICreateTaskDataResponse,
		IApiErrorResponse,
		Omit<ICreateTaskData, 'rank'>
	>({
		mutationKey: KEYS.TASK_CREATE,
		mutationFn: async (data: Omit<ICreateTaskData, 'rank'>) => {
			const taskGroups = await taskService.getAllGrouped();
			const toGroup = taskGroups[getTaskGroupId(data)]; // TODO: if possible, optimize queries amount

			// If the column is empty, create the
			// task as the first task in the column
			if (toGroup.length === 0) {
				return taskService.createOne({
					...data,
					rank: genRank(undefined, undefined) as string,
				});
			}

			// Create new task as the last task in the group
			const prevRank = toGroup[toGroup.length - 1].rank;

			return taskService.createOne({
				...data,
				rank: genRank(prevRank, undefined) as string,
			});
		},
		onSuccess: () => {
			if (params?.invalidate) {
				queryClient.invalidateQueries({
					queryKey: KEYS.TASK_GET_ALL,
				});
			}
		},
	});

	return result;
}
