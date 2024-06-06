import clsx from 'clsx';
import { TaskStatus } from '@/components/dashboard-tasks/board-view/task/TaskStatus';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskProps {
	task: IGetTaskResponse;
}
export const Task = ({ task }: ITaskProps) => {
	return (
		<>
			<div
				className={clsx(s.priority, {
					'bg-red-500': task.priority === 'high',
					'bg-orange-500': task.priority === 'medium',
					'bg-green-500': task.priority === 'low',
					'bg-neutral-300': task.isCompleted,
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
