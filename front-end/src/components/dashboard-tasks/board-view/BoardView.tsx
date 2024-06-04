'use client';

import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragStartEvent,
	closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { useTasks } from '@/components/dashboard-tasks/hooks/useTasks';
import { Column } from '@/components/dashboard-tasks/board-view/Column';
import { groupTasks } from '@/components/dashboard-tasks/utils/group';
import { Skeleton } from '@/components/ui/Skeleton';
import { IGetTaskResponse } from '@/types/task.service';
import { TaskOverlay } from './TaskOverlay';

export const BoardView = () => {
	const { data } = useTasks();
	const [active, setActive] = React.useState<IGetTaskResponse | null>(null);

	const tasks = React.useMemo(() => {
		return groupTasks(data);
	}, [data]);

	// TODO: skeleton design
	if (!data) return <Skeleton />;

	const handleDragStart = (e: DragStartEvent) => {
		const { active } = e;

		if (!active.data.current) return null;

		setActive(active.data.current.task);
	};

	const handleDragOver = (e: DragOverEvent) => {
		const { active, over } = e;

		if (!over || !over.data.current || !active.data.current) return null;

		// handle the case where the over is an (empty) column
		if (over.data.current.type === 'column') {
			active.data.current.setColumn((prev: IGetTaskResponse[]) =>
				prev.filter((task: IGetTaskResponse) => task.id !== active.id),
			);

			over.data.current.setColumn((prev: IGetTaskResponse[]) => [
				...prev,
				active.data.current?.task,
			]);

			return null;
		}

		// do nothing if the same columns
		if (active.data.current.colId === over.data.current.colId) {
			return null;
		}

		// handle the case where task is over a different column
		if (active.data.current.colId !== over.data.current.colId) {
			// remove active task from it's previous column
			active.data.current.setColumn((prev: IGetTaskResponse[]) => {
				const from = active.data.current?.sortable.index;

				return prev.toSpliced(from, 1);
			});

			over.data.current.setColumn((prev: IGetTaskResponse[]) => {
				const to = over.data.current?.sortable.index;

				// insert an active task to the index it is overing
				return prev.toSpliced(to, 0, active.data.current?.task);
			});
		}

		return null;
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null);

		const { active, over } = e;

		if (!over || !over.data.current || !active.data.current) return null;

		// do nothing if dropping task to its own position
		if (
			active.data.current.type === 'task' &&
			over.data.current.type === 'task' &&
			active.id === over.id
		) {
			return null;
		}

		// handle the same columns case
		if (active.data.current.colId === over.data.current.colId) {
			const { setColumn } = active.data.current;

			setColumn((prev: IGetTaskResponse[]) => {
				const from = active.data.current?.sortable.index;
				const to = over.data.current?.sortable.index;

				return arrayMove(prev, from, to);
			});
		}
	};

	return (
		<>
			<p className='mb-4 text-xl'>
				Today is {new Intl.DateTimeFormat('en').format(Date.now())}
			</p>
			<ul className='flex'>
				<DndContext
					collisionDetection={closestCorners}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDragEnd={handleDragEnd}
				>
					<Column
						title='Overdue'
						id='overdue'
						tasks={tasks.overdue}
					/>
					<Column
						title='No date'
						id='no-date'
						tasks={tasks.noDate}
					/>
					<Column
						title='Today'
						id='today'
						tasks={tasks.today}
					/>
					<Column
						title='Tomorrow'
						id='tomorrow'
						tasks={tasks.tomorrow}
					/>
					<Column
						title='This week'
						id='this-week'
						tasks={tasks.thisWeek}
					/>
					<Column
						title='Later'
						id='later'
						tasks={tasks.later}
					/>
					<TaskOverlay active={active} />
				</DndContext>
			</ul>
		</>
	);
};
