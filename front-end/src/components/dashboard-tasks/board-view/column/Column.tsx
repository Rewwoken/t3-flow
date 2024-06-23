'use client';

import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { SortableTask } from '@/components/dashboard-tasks/board-view/task/SortableTask';
import { TaskCreate } from '@/components/dashboard-tasks/board-view/task/task-create/TaskCreate';
import type { IGetTaskResponse } from '@/types/task.service';
import type { IColumnData } from '@/types/task.types';

interface IColumnProps extends IColumnData {
	tasks: IGetTaskResponse[];
}
export const Column = ({ id, title, dateSpan, tasks }: IColumnProps) => {
	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', colId: id, tasks },
	});

	const ids = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	return (
		<li className='min-w-[22rem] px-4'>
			<span className='mb-1 flex justify-center text-muted'>{dateSpan}</span>
			<h3 className='relative mb-3 bg-secondary py-1 text-center text-2xl shadow-md'>
				<span className='absolute left-4'>{tasks.length}</span>
				<span>{title}</span>
			</h3>
			<SortableContext
				items={ids}
				strategy={verticalListSortingStrategy}
			>
				<ol
					className='flex h-full flex-col gap-y-4'
					ref={setNodeRef}
				>
					{tasks.map((task) => (
						<SortableTask
							colId={id}
							taskId={task.id}
							task={task}
							key={task.id}
						/>
					))}
					<TaskCreate colId={id} />
				</ol>
			</SortableContext>
		</li>
	);
};

// SortableContext rerenders quite often
// function arePropsEqual(
// 	{ tasks: oldTasks }: Readonly<IColumnProps>,
// 	{ tasks: newTasks }: Readonly<IColumnProps>,
// ) {
// 	if (oldTasks.length !== newTasks.length) return false;

// 	return oldTasks.every((oldTask, index) => oldTask.id === newTasks[index].id);
// }
