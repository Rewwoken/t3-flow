'use client';

import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { taskService } from '@/services/task.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IDeleteTaskData } from '@/types/task.service';

interface IUseDeleteTaskParams
  extends UseMutationOptions<void, IApiErrorResponse, IDeleteTaskData> {}
export function useDeleteTask(params?: IUseDeleteTaskParams) {
  const result = useMutation<void, IApiErrorResponse, IDeleteTaskData>({
    mutationKey: KEYS.TASK_DELETE,
    mutationFn: ({ id }) => taskService.deleteOne(id),
    ...params,
  });

  return result;
}
