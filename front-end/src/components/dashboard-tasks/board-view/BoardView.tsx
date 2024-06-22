'use client';

import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	MouseSensor,
	TouchSensor,
	rectIntersection,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { Column } from '@/components/dashboard-tasks/board-view/column/Column';
import { columns } from '@/components/dashboard-tasks/board-view/column/columns.data';
import { TaskOverlay } from '@/components/dashboard-tasks/board-view/task/TaskOverlay';
import { IGetTaskResponse } from '@/types/task.service';
import { ITaskGroups } from '@/types/task.types';

interface IBoardViewProps {
	active: IGetTaskResponse | null;
	taskGroups: ITaskGroups;
	handleDragStart: (e: DragStartEvent) => void;
	handleDragOver: (e: DragOverEvent) => null;
	handleDragEnd: (e: DragEndEvent) => null;
}
export const BoardView = ({
	active,
	taskGroups,
	handleDragStart,
	handleDragOver,
	handleDragEnd,
}: IBoardViewProps) => {
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
		<main className='h-full overflow-scroll'>
			<ul className='flex h-full'>
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
		</main>
	);
};
