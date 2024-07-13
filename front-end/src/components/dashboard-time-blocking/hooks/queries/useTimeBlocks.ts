import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { timeBlockService } from '@/services/time-block.service';
import { KEYS } from '@/constants/keys.constants';
import type { IApiErrorResponse } from '@/types/api.types';
import type { IGetTimeBlocksResponse } from '@/types/time-block.service.types';

export function useTimeBlocks() {
  const { data, ...result } = useQuery<
    IGetTimeBlocksResponse,
    IApiErrorResponse
  >({
    queryKey: KEYS.TIME_BLOCK_GET_ALL,
    queryFn: () => timeBlockService.getAll(),
  });

  const [timeBlocks, setTimeBlocks] = React.useState<IGetTimeBlocksResponse>(
    data || [],
  );

  React.useEffect(() => {
    setTimeBlocks(data || []);
  }, [data]);

  return { timeBlocks, setTimeBlocks, ...result };
}
