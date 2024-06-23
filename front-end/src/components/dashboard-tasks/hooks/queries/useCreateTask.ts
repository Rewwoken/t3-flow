'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
	ICreateTaskData,
	ICreateTaskDataResponse,
} from '@/types/task.service';

interface IUseCreateTaskParams
	extends UseMutationOptions<
		ICreateTaskDataResponse,
		IApiErrorResponse,
		Omit<ICreateTaskData, 'rank'>
	> {}
export function useCreateTask(params?: IUseCreateTaskParams) {
	const result = useMutation<
		ICreateTaskDataResponse,
		IApiErrorResponse,
		ICreateTaskData
	>({
		mutationKey: KEYS.TASK_CREATE,
		mutationFn: (data) => taskService.createOne(data),
		...params,
	});

	return result;
}
