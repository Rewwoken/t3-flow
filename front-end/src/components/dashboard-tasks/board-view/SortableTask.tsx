'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import React from 'react';
import s from '@/components/dashboard-tasks/board-view/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

const dtf = Intl.DateTimeFormat('en');

interface ISortableItemProps {
	colId: string;
	setColumn: React.Dispatch<React.SetStateAction<IGetTaskResponse[]>>;
	id: string;
	task: IGetTaskResponse;
}
export const SortableTask = ({
	colId,
	setColumn,
	id,
	task,
}: ISortableItemProps) => {
	const sort = useSortable({
		id,
		data: {
			type: 'task',
			colId,
			setColumn,
			task,
		},
	});

	const style = React.useMemo(
		() => ({
			transform: CSS.Transform.toString(sort.transform),
			transition: sort.transition,
		}),
		[sort.transform, sort.transition],
	);

	const changeTask = React.useCallback(() => {}, []);

	return (
		<li
			ref={sort.setNodeRef}
			{...sort.attributes}
			{...sort.listeners}
			style={style}
			className={clsx(s.task, {
				[s.dragged]: sort.isDragging,
			})}
		>
			<div
				className={clsx(s.priority, {
					'bg-red-500': task.priority === 'high',
					'bg-orange-500': task.priority === 'medium',
					'bg-green-500': task.priority === 'low',
				})}
			>
				{/* priority colored line on the left */}
			</div>
			<h4 className={s.title}>{task.name}</h4>
			<p>Priority:&nbsp;{task.priority}</p>
			{task.dueDate ? (
				<p className={s.date}>Due {dtf.format(new Date(task.dueDate))}</p>
			) : (
				<p className={s.dateless}>No due date...</p>
			)}
		</li>
	);
};

// export const SortableTask = React.memo(SortableTaskComponent);
