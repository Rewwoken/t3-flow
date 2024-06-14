'use client';

import clsx from 'clsx';
import { Pencil, PencilLine } from 'lucide-react';
import React from 'react';
import { TaskPopover } from '@/components/dashboard-tasks/board-view/task/task-popover/TaskPopover';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';
import { IPopover } from '@/types/task.types';

interface ITaskUpdateProps {
	task: IGetTaskResponse;
}
export const TaskUpdate = ({ task }: ITaskUpdateProps) => {
	const [popover, setPopover] = React.useState<IPopover>({
		x: 0,
		y: 0,
		isVisible: false,
	});

	const showPopover = (e: React.MouseEvent) => {
		const { pageX, pageY } = e;

		setPopover({ x: pageX, y: pageY, isVisible: true });
	};

	const closePopover = () => {
		setPopover({ x: 0, y: 0, isVisible: false });
	};

	return (
		<div className={clsx(s.control, 'relative inline-flex')}>
			<button
				type='button'
				title='Update this task'
				onClick={showPopover}
			>
				{popover.isVisible ? (
					<PencilLine
						strokeWidth={1.5}
						className='stroke-muted'
					/>
				) : (
					<Pencil
						strokeWidth={1.5}
						className='stroke-muted'
					/>
				)}
			</button>
			{popover.isVisible && (
				<TaskPopover
					task={task}
					popover={popover}
					closePopover={closePopover}
				/>
			)}
		</div>
	);
};
