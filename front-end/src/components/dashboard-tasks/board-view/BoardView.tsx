'use client';

import {
	DndContext,
	MouseSensor,
	TouchSensor,
	rectIntersection,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { format } from 'date-fns';
import { useDragTasks } from '@/components/dashboard-tasks/hooks/useDragTasks';
import { Column } from '@/components/dashboard-tasks/board-view/column/Column';
import { columns } from '@/components/dashboard-tasks/board-view/column/columns.data';
import { TaskOverlay } from '@/components/dashboard-tasks/board-view/task/TaskOverlay';

const now = new Date();

export const BoardView = () => {
	const {
		taskGroups,
		active,
		handleDragStart,
		handleDragOver,
		handleDragEnd,
		isPending,
	} = useDragTasks();

	const mouseSensor = useSensor(MouseSensor);

	const touchSensor = useSensor(TouchSensor, {
		// Press delay of 200ms, with tolerance of 5px of movement
		activationConstraint: {
			delay: 200,
			tolerance: 5,
		},
	});

	const sensors = useSensors(mouseSensor, touchSensor);

	return (
		<>
			<p className='mb-4 text-xl'>
				Today is {format(now, 'eeee, MMMM d, yyyy')}
			</p>
			<ul className='flex h-full overflow-y-hidden overflow-x-scroll'>
				<DndContext
					sensors={sensors}
					collisionDetection={rectIntersection}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					{columns.map((column) => (
						<Column
							key={column.id}
							id={column.id}
							title={column.title}
							dateSpan={column.dateSpan}
							tasks={taskGroups[column.id]}
						/>
					))}
					<TaskOverlay active={active} />
				</DndContext>
			</ul>
		</>
	);
};
