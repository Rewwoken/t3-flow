'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
	IUpdateTaskData,
	IUpdateTaskResponse,
} from '@/types/task.service';

interface IUseUpdateTaskParams
	extends UseMutationOptions<
		IUpdateTaskResponse,
		IApiErrorResponse,
		IUpdateTaskData
	> {}
export function useUpdateTask(params?: IUseUpdateTaskParams) {
	const result = useMutation<
		IUpdateTaskResponse,
		IApiErrorResponse,
		IUpdateTaskData
	>({
		mutationKey: KEYS.TASK_UPDATE,
		mutationFn: (data) => taskService.updateOne(data),
		...params,
	});

	return result;
}
