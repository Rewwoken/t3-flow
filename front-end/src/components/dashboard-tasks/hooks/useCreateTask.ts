'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTaskGroups } from '@/components/dashboard-tasks/hooks/useTaskGroups';
import { getTaskGroupId } from '@/components/dashboard-tasks/utils/getTaskGroupId';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import { IApiErrorResponse } from '@/types/api.types';
import { ICreateTaskData } from '@/types/task.service';
import { ICreateTaskFields } from '@/types/tasks.types';
import { genRank } from '@/utils/genRank';

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
	const { taskGroups } = useTaskGroups();

	const result = useMutation<
		ICreateTaskData,
		IApiErrorResponse,
		ICreateTaskFields
	>({
		mutationKey: KEYS.CREATE_TASK,
		mutationFn: (data: ICreateTaskFields) => {
			const group = taskGroups[getTaskGroupId(data)];

			if (group.length === 0) {
				return taskService.create({
					...data,
					rank: genRank(undefined, undefined) as string,
				});
			}

			// Create new task as the last task in the group
			const prevRank = group[group.length - 1].rank;

			return taskService.create({
				...data,
				rank: genRank(prevRank, undefined) as string,
			});
		},
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
