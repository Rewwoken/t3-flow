import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import clsx from 'clsx';
import React from 'react';
import { TaskStatus } from '@/components/dashboard-tasks/board-view/task/TaskStatus';
import { TaskControls } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskControls';
import type { IGetTaskResponse } from '@/types/task.service';

interface ITaskProps {
	task: IGetTaskResponse;
	listeners?: SyntheticListenerMap; // draggable listeners from useSortable(...)
}
const TaskComponent = ({ task, listeners }: ITaskProps) => (
	<>
		<div
			{...listeners}
			className={clsx('w-2 rounded-l-sm hover:cursor-grab', {
				'bg-rose-500 dark:bg-rose-700': task.priority === 'high',
				'bg-amber-400 dark:bg-amber-600': task.priority === 'medium',
				'bg-emerald-500 dark:bg-emerald-600': task.priority === 'low',
			})}
		></div>
		<article
			{...listeners}
			className='flex w-full flex-col justify-between py-1.5 pl-2 hover:cursor-grab'
		>
			<h4 className='my-1 text-xl font-medium leading-5'>{task.name}</h4>
			<p>Priority:&nbsp;{task.priority}</p>
			<TaskStatus dueDate={task.dueDate} />
		</article>
		<TaskControls task={task} />
	</>
);

export const Task = React.memo(TaskComponent);
