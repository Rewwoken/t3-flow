'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import React from 'react';
import { SortableTask } from '@/components/dashboard-tasks/board-view/SortableTask';
import { IGetTaskResponse } from '@/types/task.service';


interface IColumnProps {
	title: string;
	id: string;
	tasks: IGetTaskResponse[] | undefined;
}

export const Column = ({ title, id, tasks }: IColumnProps) => {
	const [column, setColumn] = React.useState<IGetTaskResponse[]>(tasks || []);

	const { setNodeRef } = useDroppable({
		id,
		data: { type: 'column', setColumn },
	});

	const items = React.useMemo(() => {
		return column.map((task) => task.id);
	}, [column]);

	const createTask = () => {
		// TODO...
	};

	return (
		<li className='w-72 border-x px-4'>
			<header className='mb-4 flex items-center justify-between border-b'></header>
			<h3 className='text-2xl'>{title}</h3>
			<SortableContext
				items={items}
				strategy={verticalListSortingStrategy}
			>
				<ul
					className='space-y-4'
					ref={setNodeRef}
				>
					{column.map((task) => (
						<SortableTask
							colId={id}
							setColumn={setColumn}
							id={task.id}
							task={task}
							key={task.id}
						/>
					))}
				</ul>
			</SortableContext>
			<div className='mt-4 flex cursor-pointer justify-center self-center rounded-xl border py-0.5'>
				<Plus
					strokeWidth={1}
					onClick={createTask}
				/>
			</div>
		</li>
	);
};