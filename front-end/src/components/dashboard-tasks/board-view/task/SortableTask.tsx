'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import React from 'react';
import { Task } from '@/components/dashboard-tasks/board-view/task/Task';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { TTaskGroupId } from '@/components/dashboard-tasks/utils/groupTasks';
import { IGetTaskResponse } from '@/types/task.service';

interface ISortableItemProps {
	colId: TTaskGroupId;
	id: string;
	task: IGetTaskResponse;
}
const SortableTaskComponent = ({ colId, id, task }: ISortableItemProps) => {
	const sort = useSortable({
		id,
		data: {
			type: 'task',
			colId,
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
			<Task task={task} />
		</li>
	);
};

export const SortableTask = React.memo(SortableTaskComponent);
