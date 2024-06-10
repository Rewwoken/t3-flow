import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import React from 'react';
import { Task } from '@/components/dashboard-tasks/board-view/task/Task';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import type { IGetTaskResponse } from '@/types/task.service';
import type { TTaskGroupId } from '@/types/tasks.types';

interface ISortableItemProps {
	colId: TTaskGroupId;
	taskId: string;
	task: IGetTaskResponse;
}
const SortableTaskComponent = ({ colId, taskId, task }: ISortableItemProps) => {
	const sortArgs = useSortable({
		id: taskId,
		data: {
			type: 'task',
			colId,
			task,
		},
	});

	const style = {
		transform: CSS.Transform.toString(sortArgs.transform),
		transition: sortArgs.transition,
	};

	return (
		<li
			ref={sortArgs.setNodeRef}
			{...sortArgs.attributes}
			style={style}
			className={clsx(s.task, {
				[s.skeleton]: sortArgs.isDragging,
				'italic line-through': task.isCompleted,
			})}
		>
			<Task
				task={task}
				listeners={sortArgs.listeners}
			/>
		</li>
	);
};

export const SortableTask = React.memo(SortableTaskComponent);
