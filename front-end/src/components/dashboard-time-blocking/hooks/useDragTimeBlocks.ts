'use client';

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { useTimeBlocks } from '@/components/dashboard-time-blocking/hooks/queries/useTimeBlocks';
import { useUpdateTimeBlock } from '@/components/dashboard-time-blocking/hooks/queries/useUpdateTimeBlock';
import { genRank } from '@/utils/genRank';
import { ITimeBlock } from '@/types/time-block.service.types';

export function useDragTimeBlocks() {
	const { timeBlocks, setTimeBlocks, ...result } = useTimeBlocks();
	const { mutate: updateBlock } = useUpdateTimeBlock();
	const [active, setActive] = React.useState<ITimeBlock | null>(null);

	const handleDragStart = (e: DragStartEvent) => {
		const currentActive = e.active.data.current;

		setActive(currentActive?.block);
	};

	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		const currentActive = active.data.current;
		const currentOver = over?.data.current;

		if (
			!over ||
			!currentActive ||
			!currentOver ||
			over.id === 'new-block'
		)
			return null;

		// console.log({ active, over });
		// if (active.id === 'new-block') {
		// 	if (currentOver.type === 'block') {
		// 		setTimeBlocks((prev) => {
		// 			const toIndex = currentOver.sortable.index;

		// 			const newBlocks = prev.toSpliced(toIndex, 0, currentActive.block);
		// 			// const prevRank = prev[overIndex - 1]?.rank;
		// 			// const nextRank = prev[overIndex + 1]?.rank;
		// 			return newBlocks;
		// 		});
		// 	}
		// }
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null);

		const { active, over } = e;

		if (!over || over.id === 'new-block') return null;

		const currentActive = active.data.current;
		const currentOver = over?.data.current;

		const fromIndex = currentActive?.sortable.index;
		const toIndex = currentOver?.sortable.index;

		setTimeBlocks((prev) => {
			const newTimeBlocks = arrayMove(prev, fromIndex, toIndex);

			const prevRank = newTimeBlocks[toIndex - 1]?.rank;
			const nextRank = newTimeBlocks[toIndex + 1]?.rank;

			const rank = genRank(prevRank, nextRank) as string;
			// updateBlock({
			// 	id: active.id as string,
			// 	data: { rank },
			// });

			newTimeBlocks[toIndex] = { ...newTimeBlocks[toIndex], rank };

			return newTimeBlocks;
		});
	};

	return {
		timeBlocks,
		setTimeBlocks,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		active,
		...result,
	};
}
