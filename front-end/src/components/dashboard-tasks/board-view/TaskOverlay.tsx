import { DragOverlay } from '@dnd-kit/core';
import clsx from 'clsx';
import s from '@/components/dashboard-tasks/board-view/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskOverlayProps {
	active: IGetTaskResponse | null;
}
export const TaskOverlay = ({ active }: ITaskOverlayProps) => {
	const dtf = new Intl.DateTimeFormat('en');

	return (
		<DragOverlay
			wrapperElement='li'
			className={clsx(s.task, 'bg-background opacity-95')}
		>
			{active && (
				<>
					<h4 className={s.title}>{active.name}</h4>
					<p>
						Priority:&nbsp;
						<span
							className={clsx(s.priority, {
								'bg-red-500': active.priority === 'high',
								'bg-orange-500': active.priority === 'medium',
								'bg-green-500': active.priority === 'low',
							})}
						>
							{active.priority}
						</span>
					</p>
					{active.dueDate ? (
						<p className={s.date}>Due {dtf.format(new Date(active.dueDate))}</p>
					) : (
						<p className={s.dateless}>No due date...</p>
					)}
				</>
			)}
		</DragOverlay>
	);
};
