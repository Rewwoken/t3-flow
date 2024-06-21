'use client';

import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import React from 'react';
import { useTimeBlocks } from '@/components/dashboard-time-blocking/hooks/queries/useTimeBlocks';
import { ITimeBlock } from '@/types/time-block.service.types';

export function useDragTimeBlocks() {
	const { timeBlocks, setTimeBlocks } = useTimeBlocks();
	const [active, setActive] = React.useState<ITimeBlock | null>(null);

	const handleDragStart = (e: DragStartEvent) => {
		const currentActive = e.active.data.current;

		setActive(currentActive?.block);
	};

	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		const currentActive = active.data.current;
		const currentOver = over?.data.current;

		console.log({ active, over });
		if (!over || !currentActive || !currentOver) return null;

		if (currentOver.id === 'blocks') {
			setTimeBlocks((prev) => [...prev, currentActive.data.block]);
		}
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null);

		const { active, over } = e;
	};

	return {
		timeBlocks,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		active,
	};
}
