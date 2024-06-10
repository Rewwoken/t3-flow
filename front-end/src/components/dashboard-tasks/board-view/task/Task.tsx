import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import clsx from 'clsx';
import React from 'react';
import { TaskControls } from '@/components/dashboard-tasks/board-view/task/TaskControls';
import { TaskStatus } from '@/components/dashboard-tasks/board-view/task/TaskStatus';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskProps {
	task: IGetTaskResponse;
	listeners?: SyntheticListenerMap; // draggable listeners from useSortable(...)
}
const TaskComponent = ({ task, listeners }: ITaskProps) => (
	<>
		<div
			{...listeners}
			className={clsx(s.priority, {
				'bg-red-500': task.priority === 'high',
				'bg-orange-500': task.priority === 'medium',
				'bg-green-500': task.priority === 'low',
				'bg-transparent': task.isCompleted,
			})}
		></div>
		<article
			{...listeners}
			className={s.text}
		>
			<h4
				className={s.title}
			>
				{task.name}
			</h4>
			<p>Priority:&nbsp;{task.priority}</p>
			<TaskStatus
				isCompleted={task.isCompleted}
				dueDate={task.dueDate}
			/>
		</article>
		<TaskControls taskId={task.id} />
	</>
);

export const Task = React.memo(TaskComponent);
