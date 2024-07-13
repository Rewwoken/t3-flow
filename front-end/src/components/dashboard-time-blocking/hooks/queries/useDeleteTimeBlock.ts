import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { timeBlockService } from '@/services/time-block.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';

export function useDeleteTimeBlock(
  params?: UseMutationOptions<void, IApiErrorResponse, string>,
) {
  const result = useMutation<void, IApiErrorResponse, string>({
    mutationKey: KEYS.TIME_BLOCK_DELETE,
    mutationFn: (id) => timeBlockService.deleteOne(id),
    ...params,
  });

  return result;
}
