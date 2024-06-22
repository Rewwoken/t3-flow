'use client';

import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { useDragTimeBlocks } from '@/components/dashboard-time-blocking/hooks/useDragTimeBlocks';
import { TimeBlockOverlay } from '@/components/dashboard-time-blocking/TimeBlockOverlay';
import { TimeBlockCreate } from '@/components/dashboard-time-blocking/time-block-create/TimeBlockCreate';
import { SortableTimeBlock } from '@/components/dashboard-time-blocking/time-block/SortableTimeBlock';
import { Skeleton } from '@/components/ui/Skeleton';
import { IGetTimeBlocksResponse } from '@/types/time-block.service.types';

interface ITimeBlocksContext {
	timeBlocks: IGetTimeBlocksResponse;
	setTimeBlocks: React.Dispatch<React.SetStateAction<IGetTimeBlocksResponse>>;
}
export const TimeBlocksContext = React.createContext<ITimeBlocksContext>({
	timeBlocks: [],
	setTimeBlocks: () => {},
});

export const TimeBlocking = () => {
	const {
		active,
		timeBlocks,
		setTimeBlocks,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		isPending,
	} = useDragTimeBlocks();

	const { setNodeRef } = useDroppable({
		id: 'blocks',
	});

	const items = React.useMemo(() => {
		return timeBlocks.map((block) => block.id);
	}, [timeBlocks]);

	if (isPending) return <Skeleton />;

	// TODO: add instructions
	// TODO: add stepper
	return (
		<main className='flex items-center justify-center'>
			<TimeBlocksContext.Provider value={{ timeBlocks, setTimeBlocks }}>
				<DndContext
					collisionDetection={closestCenter}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					<div className='flex gap-x-4'>
						<SortableContext
							items={items}
							strategy={verticalListSortingStrategy}
						>
							<ol
								className='flex w-96 flex-col gap-y-2 bg-secondary p-4'
								ref={setNodeRef}
							>
								{timeBlocks.map((block) => (
									<SortableTimeBlock
										key={block.id}
										block={block}
									/>
								))}
							</ol>
						</SortableContext>
						<TimeBlockCreate />
					</div>
					<TimeBlockOverlay active={active} />
				</DndContext>
			</TimeBlocksContext.Provider>
		</main>
	);
};
