'use client';

import { CheckCheck, SquareMinus, Trash2 } from 'lucide-react';
import React from 'react';
import { useDeleteTask } from '@/components/dashboard-tasks/hooks/queries/useDeleteTask';
import { useRankedUpdate } from '@/components/dashboard-tasks/hooks/useRankedUpdate';
import { TaskControl } from '@/components/dashboard-tasks/board-view/task/task-controls/TaskControl';
import { TaskUpdate } from '@/components/dashboard-tasks/board-view/task/task-update/TaskUpdate';
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
		<div className='flex flex-col pr-1.5'>
			<TaskControl
				title='Delete'
				onClick={onDelete}
			>
				<Trash2
					strokeWidth={1.5}
					className='stroke-muted'
				/>
			</TaskControl>
			<TaskUpdate task={task} />
			{task.isCompleted ? (
				<TaskControl
					title='Uncomplete'
					onClick={toggleCompleted}
				>
					<SquareMinus
						strokeWidth={1.5}
						className='stroke-muted'
					/>
				</TaskControl>
			) : (
				<TaskControl
					title='Complete'
					onClick={toggleCompleted}
				>
					<CheckCheck
						strokeWidth={1.5}
						className='stroke-muted'
					/>
				</TaskControl>
			)}
		</div>
	);
};

export const TaskControls = React.memo(TaskControlsComponent);
