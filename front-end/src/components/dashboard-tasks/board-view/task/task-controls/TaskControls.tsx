'use client';

import { CheckCheck, SquareMinus, Trash2 } from 'lucide-react';
import React from 'react';
import { useDeleteTask } from '@/components/dashboard-tasks/hooks/queries/useDeleteTask';
import { useRankedUpdate } from '@/components/dashboard-tasks/hooks/useRankedUpdate';
import { TaskUpdate } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskUpdate';
import s from '@/components/dashboard-tasks/board-view/task/task.module.css';
import { IGetTaskResponse } from '@/types/task.service';

interface ITaskControlsProps {
	task: IGetTaskResponse;
}
const TaskControlsComponent = ({ task }: ITaskControlsProps) => {
	const { mutate: deleteTask } = useDeleteTask();
	const { rankedUpdate } = useRankedUpdate();

	const onDelete = () => {
		// TODO: add confirm toggle
		if (!confirm('Are you sure you want to delete this task?')) {
			return null;
		}

		deleteTask({ id: task.id });
	};

	const toggleCompleted = () => {
		rankedUpdate({
			task,
			dataToUpdate: {
				isCompleted: !task.isCompleted,
				dueDate: task.dueDate,
			},
		});
	};

	return (
		<div className={s.controls}>
			<button
				type='button'
				title='Delete this task'
				onClick={onDelete}
				className={s.control}
			>
				<Trash2
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</button>
			<TaskUpdate task={task} />
			<button
				type='button'
				title='Toggle completed state'
				onClick={toggleCompleted}
				className={s.control}
			>
				{task.isCompleted ? (
					<SquareMinus
						strokeWidth={1.5}
						className='stroke-muted'
					/>
				) : (
					<CheckCheck
						strokeWidth={1.5}
						className='stroke-muted'
					/>
				)}
			</button>
		</div>
	);
};

export const TaskControls = React.memo(TaskControlsComponent);
