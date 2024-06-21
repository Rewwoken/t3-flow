'use client';

import { DndContext, rectIntersection, useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { useDragTimeBlocks } from '@/components/dashboard-time-blocking/hooks/useDragTimeBlocks';
import { TimeBlockOverlay } from '@/components/dashboard-time-blocking/TimeBlockOverlay';
import { TimeBlockCreate } from '@/components/dashboard-time-blocking/time-block-create/TimeBlockCreate';
import { SortableTimeBlock } from '@/components/dashboard-time-blocking/time-block/SortableTimeBlock';

export const TimeBlocking = () => {
	const { timeBlocks, handleDragStart, handleDragOver, handleDragEnd, active } =
		useDragTimeBlocks();

	const { setNodeRef } = useDroppable({
		id: 'blocks',
		data: { type: 'blocks', timeBlocks },
		disabled: false,
	});

	const items = React.useMemo(() => {
		return timeBlocks.map((block) => block.id);
	}, [timeBlocks]);

	// TODO: add instructions
	// TODO: add stepper
	return (
		<main className='flex gap-x-4 p-2'>
			<DndContext
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
				collisionDetection={rectIntersection}
			>
				<SortableContext
					items={items}
					strategy={verticalListSortingStrategy}
				>
					<ol
						ref={setNodeRef}
						className='flex w-96 flex-col gap-y-2 border border-red-500 bg-secondary p-4'
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
				<TimeBlockOverlay active={active} />
			</DndContext>
		</main>
	);
};
