'use client';

import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import { useColumn } from '@/components/dashboard-tasks/hooks/useColumn';
import TaskCreate from '@/components/dashboard-tasks/board-view/column/task-create/TaskCreate';
import { SortableTask } from '@/components/dashboard-tasks/board-view/task/SortableTask';
import type { IGetTaskResponse } from '@/types/task.service';
import type { IColumnData } from '@/types/task.types';

interface IColumnProps extends IColumnData {
	tasks: IGetTaskResponse[];
}
const ColumnComponent = ({ id, title, dateSpan, tasks }: IColumnProps) => {
	const { listRef, ids } = useColumn({
		id,
		tasks,
	});

	return (
		<li className='min-w-[22rem] px-4'>
			<span className='mb-1 flex justify-center text-muted'>{dateSpan}</span>
			<h3 className='relative mb-3 bg-secondary py-1 text-center text-2xl'>
				<span className='absolute left-4'>{tasks.length}</span>
				<span>{title}</span>
			</h3>
			<SortableContext
				items={ids}
				strategy={verticalListSortingStrategy}
			>
				<ol
					className='flex h-full flex-col gap-y-4'
					ref={listRef}
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

export const Column = React.memo(ColumnComponent);
