'use client';

import {
	DndContext,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	closestCorners,
	useDroppable,
} from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import React from 'react';
import { IGetTaskResponse } from '@/types/task.service';
import { Item } from './Item';
import { SortableItem } from './SortableItem';

interface IColumnProps {
	title: string;
	id: string;
	data: IGetTaskResponse[];
}

export const Column = ({ title, id, data }: IColumnProps) => {
	const [tasks, setTasks] = React.useState<IGetTaskResponse[]>(data);
	const [active, setActive] = React.useState<IGetTaskResponse | null>(null);

	const { setNodeRef } = useDroppable({ id });

	const createTask = () => {
		// TODO...
	};

	const items = React.useMemo(() => {
		return tasks.map((task) => task.id);
	}, [tasks]);

	const handleDragStart = (e: DragStartEvent) => {
		const { active } = e;

		setActive(active.data.current as IGetTaskResponse);
	};

	const handleDragEnd = (e: DragEndEvent) => {
		setActive(null);
	};

	return (
		<DndContext
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<li className='w-60 border-x px-4'>
				<header className='mb-4 flex items-center justify-between border-b'></header>
				<h3 className='text-2xl'>{title}</h3>
				<ul
					className='space-y-4'
					ref={setNodeRef}
				>
					<SortableContext
						items={items}
						strategy={verticalListSortingStrategy}
					>
						{tasks.map((task) => (
							<SortableItem
								task={task}
								id={task.id}
								key={task.id}
							/>
						))}
					</SortableContext>
					<DragOverlay>{active && <Item task={active} />}</DragOverlay>
				</ul>
				<div className='mt-4 flex cursor-pointer justify-center self-center rounded-xl border py-0.5'>
					<Plus
						strokeWidth={1}
						onClick={createTask}
					/>
				</div>
			</li>
		</DndContext>
	);
};
