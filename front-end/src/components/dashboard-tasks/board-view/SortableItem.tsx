'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import s from '@/components/dashboard-tasks/board-view/SortableItem.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ISortableItemProps {
	id: string;
	task: IGetTaskResponse;
}

export const SortableItem = ({ id, task }: ISortableItemProps) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id, data: task });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const dtf = Intl.DateTimeFormat('en');

	const dueDate = dtf.format(new Date(task.dueDate));

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={clsx(s.item, {
				[s.dragged]: isDragging,
			})}
		>
			<h4 className={s.title}>{task.name}</h4>
			<p>
				Priority:&nbsp;
				<span
					className={clsx(s.priority, {
						'bg-red-500': task.priority === 'high',
						'bg-orange-500': task.priority === 'medium',
						'bg-green-500': task.priority === 'low',
					})}
				>
					{task.priority}
				</span>
			</p>
			{task.dueDate ? (
				<p className={s.date}>Due {dueDate}</p>
			) : (
				<p className={s['no-date']}>No due date...</p>
			)}
		</li>
	);
};
