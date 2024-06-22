'use client';

import React from 'react';
import { useCreateTimeBlock } from '@/components/dashboard-time-blocking/hooks/queries/useCreateTimeBlock';
import { TimeBlocksContext } from '@/components/dashboard-time-blocking/TimeBlocking';
import { genRank } from '@/utils/genRank';
import type { ICreateTimeBlockData } from '@/types/time-block.service.types';

export function useRankedCreate() {
	const { timeBlocks, setTimeBlocks } = React.useContext(TimeBlocksContext);
	const { mutate: createBlock, isPending } = useCreateTimeBlock({
		onSuccess: (data) => {
			setTimeBlocks((prev) => [...prev, data]);
		},
	});

	function rankedCreate(data: Omit<ICreateTimeBlockData, 'rank'>) {
		if (timeBlocks.length === 0) {
			const rank = genRank(undefined, undefined) as string;

			return createBlock({ rank, ...data });
		}

		const lastRank = timeBlocks[timeBlocks.length - 1].rank;
		const rank = genRank(lastRank, undefined) as string;

		createBlock({ rank, ...data });
	}

	return { rankedCreate, isPending };
}
