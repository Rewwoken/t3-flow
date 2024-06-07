'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { useDeleteTask } from '@/components/dashboard-tasks/hooks/useDeleteTask';
import { TaskStatus } from '@/components/dashboard-tasks/board-view/task/TaskStatus';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskProps {
	task: IGetTaskResponse;
}
export const Task = ({ task }: ITaskProps) => {
	const { mutate } = useDeleteTask();

	const deleteTask = () => {
		console.log('delete', task.id);

		// mutate({ id: task.id });
	};

	return (
		<>
			<button
				// onClick={deleteTask}
				type='button'
				className={s.delete}
				title='Delete this task'
				onClick={deleteTask}
			>
				<X className='stroke-muted' />
			</button>
			<div
				className={clsx(s.priority, {
					'bg-red-500': task.priority === 'high',
					'bg-orange-500': task.priority === 'medium',
					'bg-green-500': task.priority === 'low',
					'bg-transparent': task.isCompleted,
				})}
			></div>
			<h4 className={s.title}>{task.name}</h4>
			<span>Priority:&nbsp;{task.priority}</span>
			<TaskStatus
				isCompleted={task.isCompleted}
				dueDate={task.dueDate}
			/>
		</>
	);
};
