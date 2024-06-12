'use client';

import { PencilLine, X } from 'lucide-react';
import React from 'react';
import { useDeleteTask } from '@/components/dashboard-tasks/hooks/queries/useDeleteTask';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { TaskPopover } from '@/components/dashboard-tasks/task-popover/TaskPopover';
import { IGetTaskResponse } from '@/types/task.service';

interface IPopover {
	x: number | null;
	y: number | null;
	isVisible: boolean;
}
interface ITaskControlsProps {
	task: IGetTaskResponse;
}
export const TaskControls = ({ task }: ITaskControlsProps) => {
	const { mutate: deleteTask } = useDeleteTask();
	const [popover, setPopover] = React.useState<IPopover>({
		x: null,
		y: null,
		isVisible: false,
	});

	const onDelete = () => {
		// TODO: add confirm toggle
		if (!confirm('Are you sure you want to delete this task?')) {
			return null;
		}

		deleteTask({ id: task.id });
	};

	const showPopover = (e: React.MouseEvent) => {
		const { pageX, pageY } = e;

		setPopover({ x: pageX, y: pageY, isVisible: true });
	};

	const closePopover = () => {
		setPopover({ x: null, y: null, isVisible: false });
	};

	return (
		<div className={s.controls}>
			<button
				type='button'
				className={s.delete}
				title='Delete this task'
				onClick={onDelete}
			>
				<X
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
			<button
				type='button'
				className={s.update}
				title='Show update popover'
				onClick={showPopover}
			>
				<PencilLine
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
			{popover.isVisible && (
				<TaskPopover
					x={popover.x}
					y={popover.y}
					task={task}
					closePopover={closePopover}
				/>
			)}
		</div>
	);
};
