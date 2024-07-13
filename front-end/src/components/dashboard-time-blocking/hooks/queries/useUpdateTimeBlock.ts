import { useMutation } from '@tanstack/react-query';
import { timeBlockService } from '@/services/time-block.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type {
  IUpdateTimeBlockData,
  IUpdateTimeBlockResponse,
} from '@/types/time-block.service.types';

export function useUpdateTimeBlock() {
  const result = useMutation<
    IUpdateTimeBlockResponse,
    IApiErrorResponse,
    IUpdateTimeBlockData
  >({
    mutationKey: KEYS.TIME_BLOCK_UPDATE,
    mutationFn: (data) => timeBlockService.updateOne(data),
  });

  return result;
}
