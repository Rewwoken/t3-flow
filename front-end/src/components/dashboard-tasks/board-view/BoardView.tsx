'use client';

import { DndContext, rectIntersection } from '@dnd-kit/core';
import { useDrag } from '@/components/dashboard-tasks/hooks/useDrag';
import { Column } from '@/components/dashboard-tasks/board-view/Column';
import { TaskOverlay } from '@/components/dashboard-tasks/board-view/task/TaskOverlay';
import { beautyDate } from '@/components/dashboard-tasks/utils/beautyDate';
import { TTaskGroupId } from '@/components/dashboard-tasks/utils/groupTasks';

const columns: Array<{ title: string; id: TTaskGroupId }> = [
	{ title: 'Overdue ⏰', id: 'overdue' },
	{ title: 'No date 🤔', id: 'noDate' },
	{ title: 'Today 😼', id: 'today' },
	{ title: 'Tomorrow 🕑', id: 'tomorrow' },
	{ title: 'This week ⏳', id: 'thisWeek' },
	{ title: 'Later 😇', id: 'later' },
	{ title: 'Completed ✅', id: 'completed' },
];

export const BoardView = () => {
	const { taskGroups, active, handleDragStart, handleDragOver, handleDragEnd } =
		useDrag();

	return (
		<>
			<p className='mb-4 text-xl'>Today is {beautyDate(new Date())}</p>
			<ul className='flex h-full'>
				<DndContext
					collisionDetection={rectIntersection}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					{columns.map((column) => (
						<Column
							key={column.id}
							title={column.title}
							id={column.id}
							tasks={taskGroups[column.id]}
						/>
					))}
					<TaskOverlay active={active} />
				</DndContext>
			</ul>
		</>
	);
};
