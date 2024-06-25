'use client';

import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import clsx from 'clsx';
import React from 'react';
import { TimeBlocksContext } from '@/components/dashboard-time-blocking/TimeBlocking';
import { SortableTimeBlock } from '@/components/dashboard-time-blocking/time-block/SortableTimeBlock';

export const Blocks = () => {
	const { timeBlocks } = React.useContext(TimeBlocksContext);
	const { setNodeRef, isOver } = useDroppable({
		id: 'blocks',
		data: { type: 'blocks', blocks: timeBlocks },
	});

	const ids = React.useMemo(() => {
		return timeBlocks.map((block) => block.id);
	}, [timeBlocks]);

	return (
		<div
			className={clsx('w-96 bg-secondary p-4', {
				'!border-red-500': isOver,
			})}
		>
			<SortableContext
				items={ids}
				strategy={verticalListSortingStrategy}
			>
				<ol
					className='flex h-full flex-col gap-y-1'
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
		</div>
	);
};
