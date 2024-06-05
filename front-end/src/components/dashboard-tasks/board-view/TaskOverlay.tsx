import { DragOverlay } from '@dnd-kit/core';
import clsx from 'clsx';
import React from 'react';
import s from '@/components/dashboard-tasks/board-view/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

const dtf = new Intl.DateTimeFormat('en');

interface ITaskOverlayProps {
	active: IGetTaskResponse | null;
}
export const TaskOverlayComponent = ({ active }: ITaskOverlayProps) => {
	return (
		<DragOverlay
			wrapperElement='li'
			className={clsx(s.task, 'bg-background opacity-95')}
		>
			{active && (
				<>
					<div
						className={clsx(s.priority, {
							'bg-red-500': active.priority === 'high',
							'bg-orange-500': active.priority === 'medium',
							'bg-green-500': active.priority === 'low',
						})}
					>
						{/* priority colored line on the left */}
					</div>
					<h4 className={s.title}>{active.name}</h4>
					<p>Priority:&nbsp;{active.priority}</p>
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

export const TaskOverlay = React.memo(TaskOverlayComponent);
