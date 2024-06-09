import { DragOverlay } from '@dnd-kit/core';
import clsx from 'clsx';
import React from 'react';
import { Task } from '@/components/dashboard-tasks/board-view/task/Task';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskOverlayProps {
	active: IGetTaskResponse | null;
}
const TaskOverlayComponent = ({ active }: ITaskOverlayProps) => {
	return (
		<DragOverlay
			wrapperElement='li'
			className={clsx(s.task, s.overlay)}
		>
			{active && <Task task={active} />}
		</DragOverlay>
	);
};

export const TaskOverlay = React.memo(TaskOverlayComponent);
