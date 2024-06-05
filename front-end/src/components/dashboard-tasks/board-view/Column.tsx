'use client';

import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import React from 'react';
import { TTaskGroupId } from '@/components/dashboard-tasks//utils/groupTasks';
import { SortableTask } from '@/components/dashboard-tasks/board-view/SortableTask';
import { IGetTaskResponse } from '@/types/task.service';

interface IColumnProps {
	title: string;
	id: TTaskGroupId;
	tasks: IGetTaskResponse[];
}

const ColumnComponent = ({ title, id, tasks }: IColumnProps) => {
	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', colId: id },
	});

	const items = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const createTask = () => {
		// TODO...
	};

	return (
		<li className='h-full w-72 border-x px-4'>
			<h3 className='mb-4 border-b text-2xl'>
				{tasks.length}&nbsp;{title}
			</h3>
			<SortableContext
				items={items}
				strategy={verticalListSortingStrategy}
			>
				<ul
					className='h-full space-y-4'
					ref={setNodeRef}
				>
					{tasks.map((task) => (
						<SortableTask
							colId={id}
							id={task.id}
							task={task}
							key={task.id}
						/>
					))}
					<div className='flex cursor-pointer justify-center self-center rounded-xl border-2 py-0.5'>
						<Plus
							strokeWidth={1}
							onClick={createTask}
							className='stroke-muted'
						/>
					</div>
				</ul>
			</SortableContext>
		</li>
	);
};

export const Column = React.memo(ColumnComponent);
